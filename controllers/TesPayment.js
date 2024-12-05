const midtransClient = require("midtrans-client");
const { query } = require("../config/db");
// Inisialisasi Midtrans Snap
let snap = new midtransClient.Snap({
  isProduction: false, // Gunakan `true` di environment produksi
  serverKey: process.env.MIDTRANS_SERVER_KEY, // Kunci server Midtrans
  clientKey: process.env.MIDTRANS_CLIENT_KEY, // Kunci klien Midtrans
});

// Fungsi untuk melanjutkan pembayaran
exports.processPayment = async (req, res) => {
  const { order_id, total_price, email } = req.body;

  try {
    const paymentParams = {
      transaction_details: {
        order_id,
        gross_amount: total_price,
      },
      customer_details: {
        email: email,
      },
    };

    const transaction = await snap.createTransaction(paymentParams);
    res.status(200).json({ snapToken: transaction.token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal memproses pembayaran." });
  }
};

exports.verifyPayment = async (req, res) => {
  const { order_id } = req.params;

  try {
    const transactionStatus = await snap.transaction.status(order_id); // Meminta status transaksi
    return res.json({
      message: "Payment verification successful",
      status: transactionStatus, // Menampilkan status transaksi
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ error: "Failed to verify payment" });
  }
};

exports.handlePaymentCallback = async (req, res) => {
  const { order_id, transaction_status, fraud_status } = req.body;

  try {
    // Cek apakah order_id ada di request body
    if (!order_id || !transaction_status) {
      return res
        .status(400)
        .json({ msg: "Order ID atau status transaksi tidak ditemukan" });
    }

    // Cek status transaksi dan update statusnya di database
    const status = transaction_status.toLowerCase();
    let newStatus = "";

    if (status === "capture" && fraud_status === "accept") {
      newStatus = "success";
    } else if (status === "settlement") {
      newStatus = "success";
    } else if (status === "pending") {
      newStatus = "pending";
    } else if (
      status === "deny" ||
      status === "expire" ||
      status === "cancel"
    ) {
      newStatus = "failed";
    }

    // Update status transaksi di database
    const updateTransactionQuery = `
      UPDATE transactions
      SET status = ?
      WHERE order_id = ?
    `;

    const result = await query(updateTransactionQuery, [newStatus, order_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Order ID tidak ditemukan" });
    }

    // Kirimkan response success ke Midtrans
    res.status(200).json({ msg: "Payment callback processed successfully" });
  } catch (error) {
    console.error("Error processing payment callback:", error);
    return res
      .status(500)
      .json({ msg: "Gagal memproses payment callback", error: error.message });
  }
};
