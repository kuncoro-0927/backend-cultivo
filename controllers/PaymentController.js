const midtransClient = require("midtrans-client");
const { query } = require("../config/db");
const crypto = require("crypto");

let snap = new midtransClient.Snap({
  isProduction: false, //sandbox
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

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
      callbacks: {
        finish: `${process.env.FRONTEND_URL}/account/bookings`,
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
    const transactionStatus = await snap.transaction.status(order_id);
    return res.json({
      message: "Payment verification successful",
      status: transactionStatus,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ error: "Failed to verify payment" });
  }
};

exports.handlePaymentCallback = async (req, res) => {
  const { order_id, transaction_status, fraud_status } = req.body;

  try {
    if (!order_id || !transaction_status) {
      return res
        .status(400)
        .json({ msg: "Order ID atau status transaksi tidak ditemukan" });
    }

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

    const updateTransactionQuery = `
      UPDATE transactions
      SET status = ?
      WHERE order_id = ?
    `;

    const result = await query(updateTransactionQuery, [newStatus, order_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Order ID tidak ditemukan" });
    }

    if (newStatus === "success") {
      const orderQuery = "SELECT * FROM orders WHERE order_id = ?";
      const order = await query(orderQuery, [order_id]);

      if (order.length === 0) {
        return res.status(404).json({ msg: "Order tidak ditemukan" });
      }

      const generateTicketCode = () => {
        const prefix = "CVO";
        const randomNumber = Math.floor(Math.random() * 100000000);
        return `${prefix}${randomNumber}`;
      };

      const ticketCode = generateTicketCode();

      const insertTicketQuery =
        "INSERT INTO tickets (order_id, ticket_code, status) VALUES (?, ?, ?)";
      const insertResult = await query(insertTicketQuery, [
        order_id,
        ticketCode,
        "Active",
      ]);

      if (insertResult.affectedRows > 0) {
      } else {
      }
    }

    res.status(200).json({ msg: "Payment callback processed successfully" });
  } catch (error) {
    console.error("Error processing payment callback:", error);
    return res
      .status(500)
      .json({ msg: "Gagal memproses payment callback", error: error.message });
  }
};
