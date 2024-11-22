const { query } = require("../config/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
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

    try {
      await query(
        "INSERT INTO agrotourism (name, city_id, activities_id, facility, image, gallery, description, price, address, url_gmaps, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
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
    await query("DELETE FROM agrotourism WHERE id = ?", [id]);
    return res.status(200).json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus data agrotourism:", error);
    return res.status(500).json({ msg: "Gagal menghapus data" });
  }
};

module.exports = {
  tambahAgrotourism,
  ambilSemuaAgrotourism,
  ambilAgrotourismById,
  updateAgrotourism,
  hapusAgrotourism,
};
