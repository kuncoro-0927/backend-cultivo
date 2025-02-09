const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 7,
  message: {
    success: false,
    message: "Terlalu banyak percobaan login. Coba lagi setelah 5 menit.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
