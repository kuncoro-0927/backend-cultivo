const { query } = require("../config/db");

exports.checkTicket = async (req, res) => {
  const { id: user_id } = req.user;
  try {
    const tickets = await query(
      `SELECT t.id, t.ticket_code, t.status, r.review_text, r.rating 
         FROM tickets t 
         LEFT JOIN orders o ON t.order_id = o.id 
         LEFT JOIN reviews r ON t.id = r.ticket_id 
         WHERE o.user_id = ?`,
      [user_id]
    );

    if (tickets.length > 0) {
      res.json({ success: true, tickets });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Tidak ada tiket ditemukan." });
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan." });
  }
};
exports.CreateReview = async (req, res) => {
  const { id: user_id } = req.user; // Ambil user_id dari session atau token JWT
  const { ticket_id, review_text, rating } = req.body; // Ambil data review dari body request

  try {
    // Cek apakah tiket tersebut milik user
    const ticketQuery = `
        SELECT * 
        FROM tickets t
        JOIN orders o ON t.order_id = o.order_id
        WHERE t.id = ? AND o.user_id = ?;
      `;

    const ticketResult = await query(ticketQuery, [ticket_id, user_id]);

    if (ticketResult.length === 0) {
      return res
        .status(404)
        .json({ error: "Ticket not found or not owned by user" });
    }

    // Masukkan review ke database
    const reviewQuery = `
        INSERT INTO reviews (ticket_id, user_id, review_text, rating)
        VALUES (?, ?, ?, ?);
      `;

    await query(reviewQuery, [ticket_id, user_id, review_text, rating]);

    res.status(200).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit review" });
  }
};

exports.getReviewall = async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await query(
      `SELECT r.review_text, r.rating, u.name AS user_name, r.created_at 
         FROM reviews r 
         JOIN users u ON r.user_id = u.user_id 
         WHERE r.ticket_id = ? 
         ORDER BY r.created_at DESC`,
      [id]
    );

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
