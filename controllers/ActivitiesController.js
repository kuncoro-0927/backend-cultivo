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

const tambahAktivitas = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const { city } = req.body;
    const image = req.file ? req.file.path : null;
    try {
      await query(
        "INSERT INTO activites (name, image, created_at, updated_at) VALUES(?, ?, NOW(), NOW())",
        [city, image]
      );
      return res.status(200).json({
        msg: "Penambahan aktivitas berhasil",
        data: { city, image },
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Penambahan aktivitas gagal",
        error: error.message,
      });
    }
  });
};

const ambilDataAktivitas = async (req, res) => {
  try {
    const result = await query("SELECT * FROM activities");
    return res.status(200).json({ msg: "Ambil data berhasil", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Ambil data gagal", error: error.message });
  }
};

const rubahAktivitas = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const { city } = req.body;
    const { id } = req.params;
    let image = req.file ? req.file.path : null;

    try {
      if (!image) {
        const result = await query(
          "SELECT image FROM activities WHERE id = ?",
          [id]
        );
        image = result[0]?.image;
      }

      await query(
        "UPDATE activities SET name = ?, image = ?, updated_at = NOW() WHERE id = ?",
        [city, image, id]
      );

      return res.status(200).json({
        msg: "Update data aktivitas berhasil",
        data: { city, image },
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Update data aktivitas gagal",
        error: error.message,
      });
    }
  });
};

const hapusAktivitas = async (req, res) => {
  const { id } = req.params;

  try {
    await query("DELETE FROM activities WHERE id = ?", [id]);
    return res.status(200).json({ msg: "Hapus aktivitas berhasil" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Hapus aktivitas gagal", error: error.message });
  }
};

const ambilAktivitasId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("SELECT * FROM activities WHERE id = ?", [id]);
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
  tambahAktivitas,
  ambilDataAktivitas,
  rubahAktivitas,
  hapusAktivitas,
  ambilAktivitasId,
};
