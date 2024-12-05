const midtransClient = require("midtrans-client");
const { query } = require("../config/db");

// Inisialisasi Midtrans client
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

exports.createTransaction = async (req, res) => {
  const { orderId, amount, customerName, email, phone } = req.body;

  // Validasi input
  if (!orderId || !amount || !customerName || !email || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Insert transaction to database
    const queryInsert =
      "INSERT INTO transactions (order_id, amount, customer_name, customer_email, customer_phone, status) VALUES (?, ?, ?, ?, ?, ?)";
    await query(queryInsert, [
      orderId,
      amount,
      customerName,
      email,
      phone,
      "pending",
    ]);

    // Prepare Midtrans transaction parameter
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: customerName,
        email,
        phone,
      },
    };

    // Create transaction token
    const transaction = await snap.createTransaction(parameter);
    return res.json({ token: transaction.token });
  } catch (error) {
    console.error("Error in creating transaction:", error);
    return res.status(500).json({ error: "Failed to create transaction" });
  }
};
exports.handlePaymentCallback = async (req, res) => {
  const { transaction_status, order_id, status_code } = req.body;

  if (!order_id || !transaction_status || !status_code) {
    return res.status(400).json({ error: "Invalid data received" });
  }

  let status;
  if (transaction_status === "capture" || transaction_status === "settlement") {
    status = "success";
  } else if (transaction_status === "pending") {
    status = "pending";
  } else if (
    transaction_status === "deny" ||
    transaction_status === "expire" ||
    transaction_status === "cancel"
  ) {
    status = "failed";
  }

  try {
    const queryStr = "UPDATE transactions SET status = ? WHERE order_id = ?";
    const result = await query(queryStr, [status, order_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Respond with success if update is successful
    res
      .status(200)
      .json({ message: "Transaction status updated successfully" });
  } catch (err) {
    console.error("Error updating transaction status: ", err);
    res.status(500).json({ error: "Failed to update transaction status" });
  }
};
