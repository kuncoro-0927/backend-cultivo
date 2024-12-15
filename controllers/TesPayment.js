const midtransClient = require("midtrans-client");
const { query } = require("../config/db");
const crypto = require("crypto");
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
    // Jika status transaksi berhasil (success), buat tiket
    if (newStatus === "success") {
      // Ambil data order berdasarkan order_id
      const orderQuery = "SELECT * FROM orders WHERE order_id = ?";
      const order = await query(orderQuery, [order_id]);

      if (order.length === 0) {
        return res.status(404).json({ msg: "Order tidak ditemukan" });
      }

      const generateTicketCode = () => {
        const prefix = "CVO";
        const randomNumber = Math.floor(Math.random() * 100000000); // 8 digit angka acak
        return `${prefix}${randomNumber}`;
      };
      // Generate tiket unik menggunakan crypto
      const ticketCode = generateTicketCode();

      // Masukkan tiket ke dalam tabel tickets
      const insertTicketQuery =
        "INSERT INTO tickets (order_id, ticket_code, status) VALUES (?, ?, ?)";
      const insertResult = await query(insertTicketQuery, [
        order_id,
        ticketCode,
        "Active", // Status tiket aktif
      ]);

      if (insertResult.affectedRows > 0) {
        console.log("Ticket created successfully for order_id:", order_id);
      } else {
        console.log("Failed to create ticket for order_id:", order_id);
      }
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
