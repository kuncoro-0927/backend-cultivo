const { query } = require("../config/db"); // Pastikan untuk mengimpor fungsi query
const getTotalSales = async (req, res) => {
  const { startDate, endDate } = req.query; // Mengambil parameter startDate dan endDate dari query

  if (!startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: "Please provide both start and end dates.",
    });
  }

  try {
    // Query untuk menghitung total order, total penjualan, dan status transaksi
    const sql = `
        SELECT 
          COUNT(DISTINCT orders.order_id) AS total_orders,
          SUM(CASE WHEN transactions.status = 'success' THEN transactions.amount ELSE 0 END) AS total_sales,
           SUM(CASE WHEN transactions.status = 'success' THEN 1 ELSE 0 END) AS total_success,
          SUM(CASE WHEN transactions.status = 'pending' THEN 1 ELSE 0 END) AS total_pending,
          SUM(CASE WHEN transactions.status = 'failed' THEN 1 ELSE 0 END) AS total_failed
        FROM orders
        JOIN transactions ON orders.order_id = transactions.order_id
      WHERE DATE(CONVERT_TZ(orders.created_at, '+00:00', '+07:00')) BETWEEN ? AND ?

      `;

    // Jalankan query dengan parameter startDate dan endDate
    const [result] = await query(sql, [startDate, endDate]);

    if (result) {
      res.json({
        success: true,
        total_orders: result.total_orders || 0,
        total_sales: result.total_sales || 0,
        total_success: result.total_success || 0,
        total_pending: result.total_pending || 0,
        total_failed: result.total_failed || 0,
      });
    } else {
      res.json({
        success: true,
        total_orders: 0,
        total_sales: 0,
        total_success: 0,
        total_pending: 0,
        total_failed: 0,
      });
    }
  } catch (error) {
    console.error("Error fetching sales and order data:", error);
    res.status(500).json({ success: false, message: "Failed to fetch data." });
  }
};
const getTodaySalesData = async (req, res) => {
  try {
    // Menentukan tanggal hari ini
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // SQL Query untuk menghitung total pemasukan dan total order hari ini
    const sql = `
       SELECT COUNT(DISTINCT orders.order_id) AS total_orders,
       SUM(CASE WHEN transactions.status = 'success' THEN transactions.amount ELSE 0 END) AS total_sales,
        SUM(CASE WHEN transactions.status = 'success' THEN 1 ELSE 0 END) AS total_success
FROM orders
JOIN transactions ON orders.order_id = transactions.order_id
WHERE transactions.status = 'success'
AND DATE(orders.created_at) = CURDATE();
      `;

    // Jalankan query dengan tanggal hari ini
    const [result] = await query(sql, [today]);

    if (result) {
      res.json({
        success: true,
        total_orders: result.total_orders,
        total_sales: result.total_sales,
        total_success: result.total_success,
      });
    } else {
      res.json({
        success: true,
        total_orders: 0,
        total_sales: 0,
        total_success: 0,
      });
    }
  } catch (error) {
    console.error("Error fetching today's sales and orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch data." });
  }
};
module.exports = { getTotalSales, getTodaySalesData };
