const { query } = require("../config/db.js");
const path = require("path");
const upload = require("../middleware/Multer.js");

const tambahDaerah = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const { name, provinces } = req.body;
    const imageName = req.file ? req.file.filename : null;
    const image = imageName ? path.join("public/images", imageName) : null;
    const url = imageName
      ? `${req.protocol}://${req.get("host")}/images/${imageName}`
      : null;

    try {
      await query(
        "INSERT INTO city (name, provinces, image, url, created_at, updated_at) VALUES(?, ?, ?, ?, NOW(), NOW())",
        [name, provinces, image, url]
      );
      return res.status(200).json({
        msg: "Penambahan daerah berhasil",
        data: { name, provinces, image, url },
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Penambahan daerah gagal",
        error: error.message,
      });
    }
  });
};

const ambilDataDaerah = async (req, res) => {
  try {
    const result = await query("SELECT * FROM city");
    return res.status(200).json({ msg: "Ambil data berhasil", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Ambil data gagal", error: error.message });
  }
};

const rubahDaerah = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const { id } = req.params;
    const { name, provinces } = req.body;
    const imageName = req.file ? req.file.filename : null;
    const image = imageName ? path.join("public/images", imageName) : null;
    const url = imageName
      ? `${req.protocol}://${req.get("host")}/images/${imageName}`
      : null;

    try {
      const daerah = await query("SELECT image FROM city WHERE id = ?", [id]);
      if (daerah.length === 0) {
        return res.status(404).json({ msg: "Data daerah tidak ditemukan" });
      }

      let newImage = daerah[0].image;
      let newUrl = url;

      if (imageName) {
        newImage = image;
        newUrl = url;
      }

      await query(
        "UPDATE city SET name = ?, provinces = ?, image = ?, url = ?, updated_at = NOW() WHERE id = ?",
        [name, provinces, newImage, newUrl, id]
      );

      return res.status(200).json({
        msg: "Update daerah berhasil",
        data: { id, name, provinces, image: newImage, url: newUrl },
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Update daerah gagal",
        error: error.message,
      });
    }
  });
};

const hapusDaerah = async (req, res) => {
  const { id } = req.params;

  try {
    await query("DELETE FROM city WHERE id = ?", [id]);
    return res.status(200).json({ msg: "Hapus daerah berhasil" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Hapus daerah gagal", error: error.message });
  }
};

const ambilDaerahId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("SELECT * FROM city WHERE id = ?", [id]);
    return res
      .status(200)
      .json({ msg: "Ambil data ID berhasil", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Ambil data gagal", error: error.message });
  }
};

module.exports = {
  tambahDaerah,
  ambilDataDaerah,
  rubahDaerah,
  hapusDaerah,
  ambilDaerahId,
};
