// const jwt = require("jsonwebtoken");

// // Middleware untuk verifikasi JWT
// const verifyToken = (req, res, next) => {
//   const token = req.cookies.jwt; // Ambil token dari cookie

//   if (!token) {
//     return res.status(403).json({ message: "Token tidak ditemukan" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token
//     req.user = decoded; // Simpan data pengguna di req.user
//     next(); // Lanjutkan ke handler berikutnya
//   } catch (error) {
//     return res.status(401).json({ message: "Token tidak valid" });
//   }
// };

// module.exports = verifyToken;
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Ambil token dari cookie

  // Log token yang diterima

  if (!token) {
    return res.status(403).json({ message: "Token tidak ditemukan" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token tidak valid:", err);
      return res.status(403).json({ message: "Token tidak valid" });
    }

    console.log("Decoded user data:", decoded); // Log decoded user data

    req.user = decoded; // Set decoded user data
    next(); // Panggil fungsi berikutnya
  });
};

module.exports = verifyToken;
