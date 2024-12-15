const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../config/db");
const { sendOTPEmail } = require("../services/emailService");

// Fungsi untuk menghasilkan OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Registrasi pengguna
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cek apakah email sudah digunakan
    const userExists = await query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (userExists.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    await query("INSERT INTO users (name, email, password) VALUES (?, ?,?)", [
      name,
      email,
      hashedPassword,
    ]);

    // Generate OTP
    const otp = generateOTP();

    // Token OTP dengan JWT
    const token = jwt.sign({ email, otp }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    // Kirim OTP via email
    await sendOTPEmail(email, otp);

    res
      .status(201)
      .json({ message: "User registered, OTP sent to email", token });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// Verifikasi OTP
exports.verifyOTP = async (req, res) => {
  const { otp, token } = req.body;

  try {
    // Verifikasi token OTP
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update user menjadi terverifikasi
    await query("UPDATE users SET isVerified = true WHERE email = ?", [
      decoded.email,
    ]);

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Verification error:", error);
    res
      .status(400)
      .json({ message: "OTP expired or invalid", error: error.message });
  }
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const otp = generateOTP(); // Buat fungsi untuk menghasilkan OTP
    // Simpan OTP ke database dengan email terkait
    const token = jwt.sign({ email, otp }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    await sendOTPEmail(email, otp); // Kirim email dengan fungsi Anda

    res.status(200).json({ message: "OTP resent successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
};
