const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../config/db.js");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (result.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertResult = await query(
      "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, 2]
    );

    const token = jwt.sign(
      { id: insertResult.insertId, role: "user" },
      process.env.JWT_SECRET || "khitan271",
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await query("SELECT * FROM users WHERE email = ?", [email]);

    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const role = user.role_id === 1 ? "admin" : "user";

    const token = jwt.sign(
      { id: user.id, name: user.name, role: role },
      process.env.JWT_SECRET || "khitan271",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
      name: user.name,
      role: role,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };
