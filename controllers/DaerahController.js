const { query } = require("../config/db.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|svg/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diizinkan"));
    }
  },
}).single("image");

const tambahDaerah = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const { name } = req.body;
    const image = req.file ? req.file.path : null;
    try {
      await query(
        "INSERT INTO city (name, image, created_at, updated_at) VALUES(?, ?, NOW(), NOW())",
        [name, image]
      );
      return res.status(200).json({
        msg: "Penambahan daerah berhasil",
        data: { name, image },
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
    let image = req.file ? req.file.path : null;

    try {
      if (!image) {
        const result = await query("SELECT image FROM city WHERE id = ?", [id]);
        image = result[0]?.image;
      }

      await query(
        "UPDATE city SET name = ?, image = ?, updated_at = NOW() WHERE id = ?",
        [name, image, id]
      );

      return res.status(200).json({
        msg: "Update data daerah berhasil",
        data: { name, image },
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
