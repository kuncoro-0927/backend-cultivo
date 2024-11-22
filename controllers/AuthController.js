const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../config/db.js");

const secretKey =
  process.env.JWT_SECRET ||
  "db071ab9603b826cda4d897660ff3ff601fa671682a78dc7a9e24e894f42f5af"; // Gunakan .env untuk keamanan

// Controller Register
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
      [name, email, hashedPassword, 2] // Role 2 untuk user biasa
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password salah" });
    }

    const role = user.role_id === 1 ? "admin" : "user";

    const token = jwt.sign(
      { id: user.id, name: user.name, role: role },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Login berhasil",
      token,
      name: user.name,
      role,
    });
  } catch (err) {
    console.error("Error saat login:", err);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

module.exports = { registerUser, loginUser };
