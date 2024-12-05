// const midtransClient = require("@midtrans-client");
const midtransClient = require("midtrans-client");

const snap = new midtransClient.Snap({
  isProduction: false, // Sandbox Mode
  serverKey: "SB-Mid-server-oSjd6OXacriMzU7cz7OIPTtx", // Ganti dengan Server Key Anda
  //   clientKey: "SB-Mid-client-i4g8CEGcHaD7NljG", // Ganti dengan Client Key Anda
});

module.exports = snap;
