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
  const { id: user_id } = req.user;
  const { ticket_id, review_text, rating } = req.body;

  try {
    const ticketQuery = `
      SELECT t.id, o.agrotourism_id
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

    const agrotourism_id = ticketResult[0].agrotourism_id;

    const reviewQuery = `
      INSERT INTO reviews (ticket_id, user_id, review_text, rating)
      VALUES (?, ?, ?, ?);
    `;

    await query(reviewQuery, [ticket_id, user_id, review_text, rating]);

    const updateAgrotourismRating = `
      UPDATE agrotourism
SET rating = (
  SELECT COALESCE(ROUND(AVG(r.rating), 1), 0)
  FROM reviews r
  JOIN tickets t ON r.ticket_id = t.id
  JOIN orders o ON t.order_id = o.order_id
  WHERE o.agrotourism_id = ?
)
WHERE id = ?;

    `;

    await query(updateAgrotourismRating, [agrotourism_id, agrotourism_id]);

    res.status(200).json({
      message: "Review submitted and agrotourism rating updated successfully",
    });
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

exports.getReviewsByTourId = async (req, res) => {
  const { agrotourismId } = req.params;

  try {
    const reviewQuery = `
     SELECT 
    r.id AS review_id, 
    r.review_text, 
    r.rating, 
    t.ticket_code, 
    o.order_id, 
    a.name AS agrotourism_name,
    u.name AS user_name,   -- Menambahkan nama user dari tabel users
    COUNT(r.id) OVER () AS total_reviews,  -- Menghitung jumlah total review
    AVG(r.rating) OVER () AS average_rating  -- Menghitung average rating
FROM reviews r
JOIN tickets t ON r.ticket_id = t.id            -- Join dengan tabel tickets berdasarkan ticket_id
JOIN orders o ON t.order_id = o.order_id        -- Join dengan tabel orders berdasarkan order_id
JOIN agrotourism a ON o.agrotourism_id = a.id   -- Join dengan tabel agrotourism berdasarkan agrotourism_id
JOIN users u ON r.user_id = u.id                 -- Join dengan tabel users berdasarkan user_id
WHERE a.id = ?;  -- Filter berdasarkan agrotourism_id yang diinginkan

      `;

    const reviews = await query(reviewQuery, [agrotourismId]);

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this agrotourism." });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews: ", error);
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
};

exports.getReviewsByUser = async (req, res) => {
  const { id: user_id } = req.user;

  try {
    const reviewQuery = `
      SELECT 
        r.id AS review_id, 
        r.review_text, 
        r.rating, 
        t.ticket_code, 
        a.name AS agrotourism_name,
         a.url_image AS image,
         o.selected_date,
        r.created_at
      FROM reviews r
      JOIN tickets t ON r.ticket_id = t.id             -- Join dengan tabel tickets berdasarkan ticket_id
      JOIN orders o ON t.order_id = o.order_id         -- Join dengan tabel orders berdasarkan order_id
      JOIN agrotourism a ON o.agrotourism_id = a.id    -- Join dengan tabel agrotourism berdasarkan agrotourism_id
      WHERE r.user_id = ?                               -- Filter berdasarkan user_id
      ORDER BY r.created_at DESC;                      -- Urutkan review berdasarkan tanggal pembuatan
    `;

    const reviews = await query(reviewQuery, [user_id]);

    if (reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching user reviews: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews.",
      error: error.message,
    });
  }
};
