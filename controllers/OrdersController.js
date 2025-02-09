const { query } = require("../config/db");
const midtransClient = require("midtrans-client");
const crypto = require("crypto");
const { parseISO } = require("date-fns");
const { zonedTimeToUtc } = require("date-fns-tz");
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const createOrder = async (req, res) => {
  const { id } = req.user;

  if (!id) {
    return res.status(400).json({ error: "User not authenticated" });
  }

  const { agrotourism_id, selected_date, quantity } = req.body;

  if (!agrotourism_id || !selected_date || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedToken = crypto.randomUUID();
    const [agroData] = await query(
      "SELECT price FROM agrotourism WHERE id = ?",
      [agrotourism_id]
    );

    if (!agroData || agroData.length === 0) {
      return res.status(404).json({ error: "Agrotourism not found" });
    }

    const ticketPrice = agroData.price;
    const total_price = ticketPrice * quantity;
    const { parseISO, format } = require("date-fns");

    const selectedDate = parseISO(req.body.selected_date);
    const jakartaTime = format(selectedDate, "yyyy-MM-dd HH:mm:ssXXX", {
      timeZone: "Asia/Jakarta",
    });
    const utcTime = format(parseISO(jakartaTime), "yyyy-MM-dd HH:mm:ssXXX", {
      timeZone: "UTC",
    });

    const order_id = `${Date.now()}`;

    await query(
      `INSERT INTO orders (order_id, user_id, agrotourism_id, selected_date, quantity, total_price, token)
         VALUES (?, ?, ?, ?, ?, ?,?)`,
      [
        order_id,
        id,
        agrotourism_id,
        jakartaTime,
        quantity,
        total_price,
        hashedToken,
      ]
    );

    await query(
      `INSERT INTO transactions (order_id, amount, status) VALUES (?, ?, ?)`,
      [order_id, total_price, "pending"]
    );

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: total_price,
      },
      customer_details: {
        first_name: "Customer Name",
        email: "customer@example.com",
        phone: "08123456789",
      },
    };

    const transaction = await snap.createTransaction(parameter);

    res.status(201).json({
      message: "Order created successfully",
      hashedToken: hashedToken,
      token: transaction.token,
      order_id: order_id,
      price: ticketPrice,
      total_price: total_price,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

const handlePaymentCallback = async (req, res) => {
  const { transaction_status, order_id, status_code, signature_key } = req.body;

  if (!order_id || !transaction_status || !status_code || !signature_key) {
    return res.status(400).json({ error: "Invalid data received" });
  }

  const expectedKey = crypto
    .createHash("sha512")
    .update(`${order_id}${status_code}${process.env.MIDTRANS_SERVER_KEY}`)
    .digest("hex");

  if (signature_key !== expectedKey) {
    return res.status(403).json({ error: "Invalid signature key" });
  }

  let status;
  if (transaction_status === "capture" || transaction_status === "settlement") {
    status = "success";
  } else if (transaction_status === "pending") {
    status = "pending";
  } else {
    status = "failed";
  }

  try {
    const queryStr = "UPDATE transactions SET status = ? WHERE order_id = ?";
    const result = await query(queryStr, [status, order_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res
      .status(200)
      .json({ message: "Transaction status updated successfully" });
  } catch (err) {
    console.error("Error updating transaction status: ", err);
    res.status(500).json({ error: "Failed to update transaction status" });
  }
};

const getOrderDetails = async (req, res) => {
  const { hashedToken } = req.params;

  try {
    const orderQuery = `
      SELECT orders.order_id, orders.quantity, orders.total_price, orders.selected_date, agrotourism.name AS wisata_name, agrotourism.price AS wisata_price,transactions.status AS payment_status

      FROM orders
      JOIN agrotourism ON orders.agrotourism_id = agrotourism.id
      JOIN transactions ON orders.order_id = transactions.order_id
      WHERE orders.token = ?
    `;

    const order = await query(orderQuery, [hashedToken]);

    if (order.length === 0) {
      return res.status(404).json({ msg: "Order tidak ditemukan" });
    }

    return res
      .status(200)
      .json({ msg: "Detail order berhasil ditemukan", data: order[0] });
  } catch (error) {
    console.error("Gagal mendapatkan detail order:", error);
    return res
      .status(500)
      .json({ msg: "Gagal mendapatkan detail order", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const sql = `
      SELECT 
        o.order_id, 
        u.name AS user_name, 
        o.selected_date, 
        a.name AS agrotourism_name, 
        o.quantity, 
        o.total_price
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN agrotourism a ON o.agrotourism_id = a.id
      ORDER BY o.created_at DESC
      LIMIT 3
    `;

    const orders = await query(sql);

    return res.json(orders);
  } catch (error) {
    console.error("Error getting order details:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const sql = `
      SELECT 
        o.order_id, 
        u.name AS user_name, 
         u.email, 
        o.selected_date, 
        a.name AS agrotourism_name, 
        o.quantity, 
        o.total_price, 
        t.status
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN agrotourism a ON o.agrotourism_id = a.id
      LEFT JOIN transactions t ON o.order_id = t.order_id
      ORDER BY o.created_at DESC
    `;

    const orders = await query(sql);

    return res.json(orders);
  } catch (error) {
    console.error("Error getting order details:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const sql = `
      SELECT order_id, amount, status
      FROM transactions
      ORDER BY created_at DESC
      LIMIT 3;
    `;
    const transactions = await query(sql);
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch transactions" });
  }
};

const getTotalAmountSuccess = async (req, res) => {
  try {
    const totalAmountQuery = `
      SELECT SUM(amount) AS total_amount
      FROM transactions
      WHERE status = 'success';
    `;

    const [result] = await query(totalAmountQuery);

    const totalAmount = result.total_amount
      ? parseFloat(result.total_amount)
      : 0;

    return res.json({ totalAmount });
  } catch (error) {
    console.error("Error getting total amount:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createOrder,
  handlePaymentCallback,
  getOrderDetails,
  getAllOrders,
  getTransactions,
  getAll,
  getTotalAmountSuccess,
};
