const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../config/db.js");
const { sendOTPEmail } = require("../services/emailService");
const secretKey =
  process.env.JWT_SECRET ||
  "db071ab9603b826cda4d897660ff3ff601fa671682a78dc7a9e24e894f42f5af";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password minimal 8 karakter" });
  }

  try {
    const userExists = await query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (userExists.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, 2]
    );

    const token = jwt.sign(
      { id: result.insertId, name, role: "user" },
      secretKey,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ message: "Registrasi berhasil", token });
  } catch (err) {
    console.error("Error saat registrasi:", err);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
// Controller Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi" });
  }

  try {
    const result = await query("SELECT * FROM users WHERE email = ?", [email]);

    if (result.length === 0) {
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    const user = result[0];

    const generateOTP = () =>
      Math.floor(100000 + Math.random() * 900000).toString();
    if (!user.isverified) {
      // Generate OTP
      const otp = generateOTP();

      // Token OTP dengan JWT
      const otpToken = jwt.sign(
        { email, otp }, // Payload: email dan OTP
        process.env.JWT_SECRET,
        { expiresIn: "5m" } // Token berlaku selama 5 menit
      );

      // Kirim OTP ke email pengguna
      await sendOTPEmail(email, otp);

      return res.status(200).json({
        message: "Mohon verifikasi Email Anda sebelum login",
        isverified: false,
        otpToken, // Kirim token OTP untuk proses verifikasi
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password salah" });
    }

    const role =
      user.role_id === 1 ? "admin" : user.role_id === 3 ? "attendant" : "user";

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phonenumber: user.phonenumber,
        role: role,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    // Set cookie dengan token
    res.cookie("token", token, {
      httpOnly: true, // Cookie tidak bisa diakses oleh JavaScript
      secure: process.env.NODE_ENV === "production", // Hanya dikirim lewat HTTPS di production
      sameSite: "strict", // Mencegah pengiriman lintas domain
      maxAge: 3600000, // Durasi cookie (1 jam)
    });

    return res.status(200).json({
      message: "Login berhasil",
      name: user.name,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phonenumber: user.phonenumber,
      role,
      isverified: true,
    });
  } catch (err) {
    console.error("Error saat login:", err);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const loginWithGoogle = (req, res) => {
  // Setelah login berhasil melalui Google, user sudah ada di req.user
  const user = req.user; // User dari passport

  // Membuat token JWT
  const token = jwt.sign(
    {
      id: user.id, // Mengambil id dari user
      email: user.email, // Mengambil email dari user
      role: user.role, // Mengambil role dari user
      name: user.name, // Mengambil nama dari user
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Menyimpan token JWT ke dalam cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    // secure: process.env.NODE_ENV === "production", // Menggunakan secure di production
    sameSite: "Strict",
  });
  res.redirect("http://localhost:5173/");
  // res.status(200).json({
  //   message: "Login berhasil",
  //   token, // Kirim token di response body
  // });
  // Redirect ke halaman frontend setelah login berhasil
  // Ganti dengan URL frontend Anda
};

// const getUserData = (req, res) => {
//   const user = req.user;

//   console.log("User data in getUserData:", user);

//   if (!user) {
//     return res.status(404).json({ message: "User tidak ditemukan" });
//   }

//   query(
//     "SELECT id, name, email FROM users WHERE id = ?",
//     [user.id],
//     (error, result) => {
//       if (error) {
//         console.error("Database error:", error);
//         return res
//           .status(500)
//           .json({ message: "Terjadi kesalahan pada server" });
//       }

//       if (result.length > 0) {
//         return res.status(200).json({
//           id: result[0].id,
//           name: result[0].name,
//           email: result[0].email,
//         });
//       } else {
//         return res.status(404).json({ message: "User tidak ditemukan" });
//       }
//     }
//   );
// };

const getUserData = (req, res) => {
  // Data pengguna sudah ada di req.user setelah verifikasi token
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
};

const logout = (req, res) => {
  try {
    console.log("Menghapus cookie token");
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout berhasil" });
  } catch (error) {
    console.error("Error saat logout:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat logout" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  loginWithGoogle,
  getUserData,
  logout,
};
