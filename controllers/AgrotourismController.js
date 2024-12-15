const { query } = require("../config/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]);

const tambahAgrotourism = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const {
      name,
      city_id,
      activities_id,
      facility,
      description,
      price,
      address,
      url_gmaps,
    } = req.body;

    const image = req.files.image ? req.files.image[0].path : null;
    const gallery = req.files.gallery
      ? req.files.gallery.map((file) => file.path)
      : [];

    const imageUrl = image
      ? `${req.protocol}://${req.get("host")}/images/${path.basename(image)}`
      : null;

    const galleryUrls =
      gallery.length > 0
        ? gallery.map(
            (file) =>
              `${req.protocol}://${req.get("host")}/images/${path.basename(
                file
              )}`
          )
        : [];

    try {
      await query(
        "INSERT INTO agrotourism (name, city_id, activities_id, facility, image, gallery, description, price, address, url_gmaps, url_image, url_gallery, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
        [
          name,
          city_id,
          activities_id,
          facility,
          image,
          JSON.stringify(gallery),
          description,
          price,
          address,
          url_gmaps,
          imageUrl,
          JSON.stringify(galleryUrls),
        ]
      );

      return res.status(201).json({
        msg: "Agrotourism berhasil ditambahkan",
        data: {
          name,
          city_id,
          activities_id,
          image,
          gallery,
          description,
          price,
          address,
          url_gmaps,
          url_image: imageUrl,
          url_gallery: galleryUrls,
        },
      });
    } catch (error) {
      console.error("Gagal menambah data agrotourism:", error);
      return res.status(500).json({ msg: "Gagal menambah data" });
    }
  });
};

const ambilSemuaAgrotourism = async (req, res) => {
  try {
    const result = await query(
      `SELECT agrotourism.*, city.name AS city_name, activities.name AS activity_name 
       FROM agrotourism 
       JOIN city ON agrotourism.city_id = city.id
       JOIN activities ON agrotourism.activities_id = activities.id`
    );
    return res.status(200).json({ msg: "Data berhasil diambil", data: result });
  } catch (error) {
    console.error("Gagal mengambil data agrotourism:", error);
    return res.status(500).json({ msg: "Gagal mengambil data" });
  }
};

const ambilAgrotourismByCity = async (req, res) => {
  const { city_id } = req.params;
  try {
    const result = await query(
      `SELECT agrotourism.*, city.name AS city_name, activities.name AS activity_name 
       FROM agrotourism 
       JOIN city ON agrotourism.city_id = city.id
       JOIN activities ON agrotourism.activities_id = activities.id
       WHERE agrotourism.city_id = ?`,
      [city_id]
    );
    return res.status(200).json({ msg: "Data berhasil diambil", data: result });
  } catch (error) {
    console.error("Gagal mengambil data agrotourism:", error);
    return res.status(500).json({ msg: "Gagal mengambil data" });
  }
};

const ambilAgrotourismById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      `SELECT agrotourism.*, city.name AS city_name, activities.name AS activity_name 
       FROM agrotourism 
       JOIN city ON agrotourism.city_id = city.id
       JOIN activities ON agrotourism.activities_id = activities.id
       WHERE agrotourism.id = ?`,
      [id]
    );
    return res.status(200).json({ msg: "Data berhasil diambil", data: result });
  } catch (error) {
    console.error("Gagal mengambil data agrotourism:", error);
    return res.status(500).json({ msg: "Gagal mengambil data" });
  }
};

const updateAgrotourism = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const { id } = req.params;
    const {
      name,
      city_id,
      activities_id,
      facility,
      description,
      price,
      address,
      url_gmaps,
    } = req.body;
    const image = req.files.image ? req.files.image[0].path : null;
    const gallery = req.files.gallery
      ? req.files.gallery.map((file) => file.path)
      : [];

    try {
      const [existingAgrotourism] = await query(
        "SELECT image, gallery FROM agrotourism WHERE id = ?",
        [id]
      );

      const updatedImage = image || existingAgrotourism.image;
      const updatedGallery =
        gallery.length > 0
          ? JSON.stringify(gallery)
          : existingAgrotourism.gallery;

      await query(
        `UPDATE agrotourism 
           SET name = ?, city_id = ?, activities_id = ?, facility = ?, image = ?, gallery = ?, description = ?, price = ?, address = ?, url_gmaps = ?, updated_at = NOW() 
           WHERE id = ?`,
        [
          name,
          city_id,
          activities_id,
          facility,
          updatedImage,
          updatedGallery,
          description,
          price,
          address,
          url_gmaps,
          id,
        ]
      );

      return res.status(200).json({ msg: "Data berhasil diperbarui" });
    } catch (error) {
      console.error("Gagal memperbarui data agrotourism:", error);
      return res.status(500).json({ msg: "Gagal memperbarui data" });
    }
  });
};
const hapusAgrotourism = async (req, res) => {
  const { id } = req.params;
  try {
    // Hapus data terkait di tabel tickets
    await query(
      `DELETE FROM tickets WHERE order_id IN (
         SELECT order_id FROM orders WHERE agrotourism_id = ?
       )`,
      [id]
    );

    // Hapus data terkait di tabel orders
    await query("DELETE FROM orders WHERE agrotourism_id = ?", [id]);

    // Hapus data di tabel agrotourism
    await query("DELETE FROM agrotourism WHERE id = ?", [id]);

    return res.status(200).json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus data agrotourism:", error);
    return res.status(500).json({ msg: "Gagal menghapus data" });
  }
};

const getTopAgrotourism = async (req, res) => {
  try {
    const sql = `
      SELECT 
        agrotourism.id AS agrotourism_id,
        agrotourism.name AS agrotourism_name,
        city.name AS city_name,
         agrotourism.url_image AS agrotourism_image,
        COUNT(transactions.id) AS total_transactions,
        SUM(transactions.amount) AS total_amount
      FROM 
        agrotourism
      JOIN 
        orders ON agrotourism.id = orders.agrotourism_id
      JOIN 
        transactions ON orders.order_id = transactions.order_id
         JOIN 
          city ON agrotourism.city_id = city.id
      WHERE 
        transactions.status = 'success' 
      GROUP BY 
        agrotourism.id
      ORDER BY 
        total_transactions DESC
      LIMIT 3;
    `;
    const result = await query(sql);

    console.log("Query Result:", result); // Debug log
    res.json({
      success: true,
      data: result, // Kirim hasil query langsung
    });
  } catch (error) {
    console.error("Error fetching top agrotourism:", error);
    res.status(500).json({ success: false, message: "Failed to fetch data" });
  }
};

// const getAgrotourismByActivityId = async (req, res) => {
//   const { activityId } = req.params; // ambil activityId dari URL parameter
//   try {
//     const [rows] = await query(
//       "SELECT * FROM agrotourism WHERE activities_id = ?",
//       [activityId]
//     );
//     if (rows.length === 0) {
//       return res.status(404).json({ msg: "Data wisata tidak ditemukan" });
//     }
//     return res.status(200).json(rows); // Kirim data wisata yang ditemukan
//   } catch (error) {
//     console.error("Error mengambil data wisata:", error);
//     return res.status(500).json({ msg: "Gagal mengambil data wisata" });
//   }
// };

// controllers/AgrotourismController.js
const getAgrotourismByActivityId1 = async (req, res) => {
  try {
    const [rows] = await query(
      "SELECT * FROM agrotourism WHERE activities_id = ?",
      [1]
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Gagal mengambil data agrotourism:", error);
    return res.status(500).json({ msg: "Gagal mengambil data" });
  }
};

// controllers/AgrotourismController.js
const getAgrotourismByActivityId2 = async (req, res) => {
  try {
    const [rows] = await query(
      "SELECT * FROM agrotourism WHERE activities_id = ?",
      [2]
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Gagal mengambil data agrotourism:", error);
    return res.status(500).json({ msg: "Gagal mengambil data" });
  }
};

// controllers/AgrotourismController.js
const getAgrotourismByActivityId3 = async (req, res) => {
  try {
    const [rows] = await query(
      "SELECT * FROM agrotourism WHERE activities_id = ?",
      [3]
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Gagal mengambil data agrotourism:", error);
    return res.status(500).json({ msg: "Gagal mengambil data" });
  }
};

module.exports = {
  tambahAgrotourism,
  ambilAgrotourismByCity,
  ambilSemuaAgrotourism,
  ambilAgrotourismById,

  updateAgrotourism,
  hapusAgrotourism,
  getTopAgrotourism,
  getAgrotourismByActivityId1,
  getAgrotourismByActivityId2,
  getAgrotourismByActivityId3,
};
