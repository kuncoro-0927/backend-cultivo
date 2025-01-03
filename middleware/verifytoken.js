const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "Token tidak ditemukan" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token tidak valid:", err);
      return res.status(403).json({ message: "Token tidak valid" });
    }
    console.log("Decoded user data:", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
