const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db.js");
require("dotenv").config();

const router = express.Router();

// Register untuk User
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Enkripsi password
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
  db.query(sql, [username, hashedPassword, "user"], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "User registered successfully" });
  });
});

// Login untuk User dan Admin
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length)
      return res.status(401).json({ message: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.json({ token });
  });
});

module.exports = router;
