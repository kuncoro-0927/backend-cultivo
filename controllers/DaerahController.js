const { query } = require("../config/db.js");
const path = require("path");
const upload = require("../middleware/Multer.js");

const tambahDaerah = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const { name } = req.body;
    const imageName = req.file ? req.file.filename : null;
    const image = imageName ? path.join("public/images", imageName) : null;
    const url = imageName
      ? `${req.protocol}://${req.get("host")}/images/${imageName}`
      : null;

    try {
      await query(
        "INSERT INTO city (name, image, url, created_at, updated_at) VALUES(?, ?, ?, NOW(), NOW())",
        [name, image, url]
      );
      return res.status(200).json({
        msg: "Penambahan daerah berhasil",
        data: { name, image, url },
      });
    } catch (error) {
      console.log("Penambahan daerah gagal", error);
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
    console.log("Ambil data gagal", error);
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

    const { name } = req.body;
    const { id } = req.params;
    let imageName = req.file ? req.file.filename : null;
    let image = imageName ? path.join("public/images", imageName) : null;
    let url = imageName
      ? `${req.protocol}://${req.get("host")}/images/${imageName}`
      : null;

    try {
      if (!imageName) {
        const result = await query("SELECT image FROM city WHERE id = ?", [id]);
        image = result[0]?.image;
        url = result[0]?.image
          ? `${req.protocol}://${req.get("host")}/${result[0].image}`
          : null;
      }

      await query(
        "UPDATE city SET name = ?, image = ?, url = ?, updated_at = NOW() WHERE id = ?",
        [name, image, url, id]
      );

      return res.status(200).json({
        msg: "Update data daerah berhasil",
        data: { name, image, url },
      });
    } catch (error) {
      console.log("Update data daerah gagal", error);
      return res.status(500).json({
        msg: "Update data daerah gagal",
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
    console.log("Hapus daerah gagal", error);
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
    console.log("Ambil data gagal", error);
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
