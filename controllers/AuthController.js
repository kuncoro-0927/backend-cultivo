const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../config/db.js");
const { sendOTPEmail } = require("../services/emailService");
const nodemailer = require("nodemailer");
const secretKey = process.env.JWT_SECRET;
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name.trim()) {
      return res
        .status(400)
        .json({ field: "name", message: "Nama tidak boleh kosong" });
    }
    if (!email.trim()) {
      return res
        .status(400)
        .json({ field: "email", message: "Email tidak boleh kosong" });
    }
    if (!password.trim()) {
      return res
        .status(400)
        .json({ field: "password", message: "Password tidak boleh kosong" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ field: "email", message: "Format email tidak valid" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ field: "password", message: "Password minimal 8 karakter" });
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({
        field: "name",
        message: "Nama hanya boleh mengandung huruf dan spasi",
      });
    }

    const emailExists = await query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (emailExists.length > 0) {
      return res
        .status(400)
        .json({ field: "email", message: "Email sudah terdaftar" });
    }

    const usernameExists = await query("SELECT id FROM users WHERE name = ?", [
      name,
    ]);
    if (usernameExists.length > 0) {
      return res
        .status(400)
        .json({ field: "name", message: "Nama sudah dipakai" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword,
    ]);

    const otp = generateOTP();

    const token = jwt.sign({ email, otp }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    await sendOTPEmail(email, otp);

    res
      .status(201)
      .json({ message: "User registered, OTP sent to email", token });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Daftar akun gagal", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      field: "email",
      message: "Email harus diisi",
    });
  }
  if (!password) {
    return res.status(400).json({
      field: "password",
      message: "Password harus diisi",
    });
  }

  try {
    const result = await query("SELECT * FROM users WHERE email = ?", [email]);

    if (result.length === 0) {
      return res.status(400).json({
        field: "email",
        message: "Email yang Anda masukkan salah",
      });
    }
    const user = result[0];

    if (!user.isverified) {
      const generateOTP = () =>
        Math.floor(100000 + Math.random() * 900000).toString();

      const otp = generateOTP();
      const otpToken = jwt.sign({ email, otp }, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });

      await sendOTPEmail(email, otp);

      return res.status(400).json({
        field: "email",
        message: "Mohon verifikasi Email Anda sebelum login",
        isverified: false,
        otpToken,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        field: "password",
        message: "Password salah",
      });
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
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 jam
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
  const user = req.user;

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.redirect(process.env.FRONTEND_URL);
};

const getUserData = (req, res) => {
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

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ field: "email", message: "Email wajib diisi" });
  }

  try {
    const user = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
      return res
        .status(404)
        .json({ field: "email", message: "Email tidak terdaftar" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const supportLink = `${process.env.FRONTEND_URL}/kontak`;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Dukungan Cultivo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Kata Sandi Anda - Cultivo",
      html: `
        <div style="max-width: 500px; margin: auto; font-family: Arial, sans-serif; background-color: #121212; color: white; padding: 20px; border-radius: 8px; text-align: center;">
          <h2 style="color: white;">Lupa kata sandi Anda?</h2>
          <p style="color: #B0B0B0;">Jangan khawatir, kami siap membantu! Klik tombol di bawah ini untuk mengatur ulang kata sandi Anda.</p>
          
          <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #198754; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; margin-top: 10px;">
            Atur Ulang Kata Sandi
          </a>
    
          <p style="color: #B0B0B0; margin-top: 15px;">
            Tautan ini hanya berlaku untuk sekali pakai.<br> Berlaku selama <strong>15 menit</strong>.
          </p>
    
          <p style="color: #B0B0B0;">
            Jika Anda tidak meminta reset kata sandi atau memiliki pertanyaan, silakan 
            <a href="${supportLink}" style="color: #4DA8DA;">hubungi kami</a>.
          </p>
    
          <hr style="border: none; border-top: 1px solid #444; margin: 20px 0;">
          <p style="font-size: 12px; color: gray;">© 2025 Cultivo. Semua hak dilindungi.</p>
        </div>
      `,
    });

    res
      .status(200)
      .json({ message: "Link reset password telah dikirim ke email" });
  } catch (error) {
    console.error("Error mengirim reset password:", error);
    res.status(500).json({ message: "Gagal mengirim reset password" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ field: "password", message: "Password minimal 8 karakter" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query("UPDATE users SET password = ? WHERE email = ?", [
      hashedPassword,
      email,
    ]);

    res.status(200).json({ message: "Password berhasil direset" });
  } catch (error) {
    console.error("Error reset password:", error);
    res
      .status(400)
      .json({ message: "Token tidak valid atau sudah kadaluarsa" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  loginWithGoogle,
  getUserData,
  logout,
  requestPasswordReset,
  resetPassword,
};
