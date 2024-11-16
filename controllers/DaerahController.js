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
  limits: { fileSize: 10 * 1024 * 1024 }, // Batas file 10MB
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

// Fungsi untuk menambah data daerah
const tambahDaerah = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const { city } = req.body;
    const image = req.file ? req.file.path : null; // Ambil path gambar yang di-upload

    try {
      await query(
        "INSERT INTO daerah (city, image, createdAt, updatedAt) VALUES(?, ?, NOW(), NOW())",
        [city, image]
      );
      return res.status(200).json({
        msg: "Penambahan daerah berhasil",
        data: { city, image },
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

// Fungsi untuk mengambil semua data daerah
const ambilDataDaerah = async (req, res) => {
  try {
    const result = await query("SELECT * FROM daerah");
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

    const { city } = req.body;
    const { id } = req.params;
    let image = req.file ? req.file.path : null;

    try {
      // Jika tidak ada gambar yang di-upload, biarkan gambar lama
      if (!image) {
        const result = await query("SELECT image FROM daerah WHERE id = ?", [
          id,
        ]);
        image = result[0]?.image; // Ambil gambar lama dari database jika tidak ada gambar baru
      }

      // Update data daerah
      await query(
        "UPDATE daerah SET city = ?, image = ?, updatedAt = NOW() WHERE id = ?",
        [city, image, id]
      );

      return res.status(200).json({
        msg: "Update data daerah berhasil",
        data: { city, image },
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

// Fungsi untuk menghapus data daerah
const hapusDaerah = async (req, res) => {
  const { id } = req.params;

  try {
    await query("DELETE FROM daerah WHERE id = ?", [id]);
    return res.status(200).json({ msg: "Hapus daerah berhasil" });
  } catch (error) {
    console.log("Hapus daerah gagal", error);
    return res
      .status(500)
      .json({ msg: "Hapus daerah gagal", error: error.message });
  }
};

// Fungsi untuk mengambil data daerah berdasarkan ID
const ambilDaerahId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("SELECT * FROM daerah WHERE id = ?", [id]);
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
