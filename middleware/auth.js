// const passport = require("passport");

// const isAdmin = (req, res, next) => {
//   // Passport.authenticate("jwt") memverifikasi token JWT
//   passport.authenticate("jwt", { session: false }, (err, user) => {
//     if (err || !user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Cek apakah role adalah "admin"
//     if (user.role !== "admin") {
//       return res.status(403).json({ message: "Forbidden: Admin only" });
//     }

//     req.user = user; // Menambahkan informasi pengguna ke request
//     next(); // Lanjutkan ke route handler
//   })(req, res, next); // Eksekusi middleware
// };

// module.exports = { isAdmin };
