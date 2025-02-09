const { query } = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
      include,
      exclude,
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
        "INSERT INTO agrotourism (name, city_id, activities_id, include, exclude, image, gallery, description, price, address, url_gmaps, url_image, url_gallery, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
        [
          name,
          city_id,
          activities_id,
          include,
          exclude,
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
      `SELECT
          agrotourism.*, 
          city.name AS city_name, 
          activities.name AS activity_name,
          COALESCE(SUM(r.rating) / NULLIF(COUNT(r.id), 0), 0) AS average_rating  -- Menghitung rata-rata rating
       FROM
          agrotourism
       JOIN city ON agrotourism.city_id = city.id
       JOIN activities ON agrotourism.activities_id = activities.id
       LEFT JOIN orders o ON o.agrotourism_id = agrotourism.id  -- Relasi dengan agrotourism di tabel orders
       LEFT JOIN tickets t ON t.order_id = o.order_id  -- Relasi dengan tiket berdasarkan order_id
       LEFT JOIN reviews r ON r.ticket_id = t.id  -- Relasi dengan reviews berdasarkan ticket_id
       GROUP BY
          agrotourism.id, city.name, activities.name;`
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
      include,
      exclude,
      description,
      price,
      address,
      url_gmaps,
    } = req.body;

    const newImage = req.files.image ? req.files.image[0].path : null;
    const newGallery = req.files.gallery
      ? req.files.gallery.map((file) => file.path)
      : [];

    try {
      const agrotourism = await query(
        "SELECT image, gallery FROM agrotourism WHERE id = ?",
        [id]
      );

      if (agrotourism.length === 0) {
        return res
          .status(404)
          .json({ msg: "Data agrotourism tidak ditemukan" });
      }

      const oldImage = agrotourism[0].image;
      const oldGallery = JSON.parse(agrotourism[0].gallery || "[]");

      if (newImage && oldImage && fs.existsSync(oldImage)) {
        try {
          fs.unlinkSync(oldImage);
        } catch (err) {
          console.warn(`Gagal menghapus gambar utama lama: ${oldImage}`, err);
        }
      }

      if (newGallery.length > 0) {
        oldGallery.forEach((file) => {
          if (file && fs.existsSync(file)) {
            try {
              fs.unlinkSync(file);
            } catch (err) {
              console.warn(`Gagal menghapus file galeri lama: ${file}`, err);
            }
          }
        });
      }

      const updatedImage = newImage || oldImage;
      const updatedGallery = newGallery.length > 0 ? newGallery : oldGallery;

      const imageUrl = updatedImage
        ? `${req.protocol}://${req.get("host")}/images/${path.basename(
            updatedImage
          )}`
        : null;

      const galleryUrls = updatedGallery.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/images/${path.basename(file)}`
      );

      await query(
        "UPDATE agrotourism SET name = ?, city_id = ?, activities_id = ?, include = ?, exclude = ?, image = ?, gallery = ?, description = ?, price = ?, address = ?, url_gmaps = ?, url_image = ?, url_gallery = ?, updated_at = NOW() WHERE id = ?",
        [
          name,
          city_id,
          activities_id,
          include,
          exclude,
          updatedImage,
          JSON.stringify(updatedGallery),
          description,
          price,
          address,
          url_gmaps,
          imageUrl,
          JSON.stringify(galleryUrls),
          id,
        ]
      );

      return res.status(200).json({
        msg: "Update agrotourism berhasil",
        data: {
          id,
          name,
          city_id,
          activities_id,
          include,
          exclude,
          image: updatedImage,
          gallery: updatedGallery,
          description,
          price,
          address,
          url_gmaps,
          url_image: imageUrl,
          url_gallery: galleryUrls,
        },
      });
    } catch (error) {
      console.error("Gagal mengupdate data agrotourism:", error);
      return res.status(500).json({ msg: "Gagal mengupdate data" });
    }
  });
};

const hapusAgrotourism = async (req, res) => {
  const { id } = req.params;
  try {
    await query(
      `DELETE FROM tickets WHERE order_id IN (
         SELECT order_id FROM orders WHERE agrotourism_id = ?
       )`,
      [id]
    );

    await query("DELETE FROM orders WHERE agrotourism_id = ?", [id]);

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

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching top agrotourism:", error);
    res.status(500).json({ success: false, message: "Failed to fetch data" });
  }
};

const getAgrotourismByActivityId1 = async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM agrotourism WHERE activities_id = ?",
      [1]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error("Gagal mengambil data agrotourism:", error);
    return res.status(500).json({ msg: "Gagal mengambil data" });
  }
};

const getAgrotourismByActivityId2 = async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM agrotourism WHERE activities_id = ?",
      [2]
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Gagal mengambil data agrotourism:", error);
    return res.status(500).json({ msg: "Gagal mengambil data" });
  }
};
const getAgrotourismByActivityId3 = async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM agrotourism WHERE activities_id = ?",
      [3]
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Gagal mengambil data agrotourism:", error);
    return res.status(500).json({ msg: "Gagal mengambil data" });
  }
};

async function getTotalAgrotourism(req, res) {
  try {
    const agrotourismResult = await query(
      "SELECT COUNT(*) AS total_agrotourism FROM agrotourism"
    );

    const activityResult = await query(
      "SELECT COUNT(*) AS total_activity FROM activities"
    );

    const cityResult = await query("SELECT COUNT(*) AS total_city FROM city");

    res.json({
      total_agrotourism: agrotourismResult[0].total_agrotourism,
      total_activity: activityResult[0].total_activity,
      total_city: cityResult[0].total_city,
    });
  } catch (error) {
    console.error("Error fetching total counts:", error);
    res.status(500).json({ message: "Error fetching total counts" });
  }
}

module.exports = {
  tambahAgrotourism,
  ambilAgrotourismByCity,
  ambilSemuaAgrotourism,
  ambilAgrotourismById,
  getTotalAgrotourism,
  updateAgrotourism,
  hapusAgrotourism,
  getTopAgrotourism,
  getAgrotourismByActivityId1,
  getAgrotourismByActivityId2,
  getAgrotourismByActivityId3,
};
