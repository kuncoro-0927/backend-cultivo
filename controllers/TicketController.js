const { query } = require("../config/db");
const path = require("path");
exports.verifyTicket = async (req, res) => {
  const { ticket_code } = req.body;

  if (!ticket_code) {
    return res.status(400).json({ error: "Ticket code is required" });
  }

  try {
    const queryStr = `
        SELECT 
          t.ticket_code, t.status AS ticket_status, 
          o.user_id, o.quantity, o.agrotourism_id,
          u.name AS user_name, 
          a.name AS agrotourism_name
        FROM tickets t
        JOIN orders o ON t.order_id = o.order_id
        LEFT JOIN users u ON o.user_id = u.id
        LEFT JOIN agrotourism a ON o.agrotourism_id = a.id
        WHERE t.ticket_code = ?
      `;

    const result = await query(queryStr, [ticket_code]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const ticket = result[0];

    if (ticket.ticket_status === "used") {
      return res.status(400).json({ error: "Ticket has already been used" });
    }

    res.status(200).json({
      message: "Ticket is valid",
      ticket_code: ticket.ticket_code,
      ticket_status: ticket.ticket_status,
      user_name: ticket.user_name || "No user found",
      quantity: ticket.quantity,
      agrotourism_name: ticket.agrotourism_name || "No agrotourism found",
    });
  } catch (error) {
    console.error("Error verifying ticket:", error);
    res.status(500).json({ error: "Failed to verify ticket" });
  }
};

exports.useTicket = async (req, res) => {
  const { ticketCode } = req.body;

  if (!ticketCode) {
    return res.status(400).json({ error: "Ticket code is required" });
  }

  try {
    const [ticket] = await query(
      "SELECT * FROM tickets WHERE ticket_code = ?",
      [ticketCode]
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (ticket.status !== "Active") {
      return res
        .status(400)
        .json({ error: "Ticket is not active or already used" });
    }

    const updateQuery = "UPDATE tickets SET status = ? WHERE ticket_code = ?";
    await query(updateQuery, ["Used", ticketCode]);

    res.status(200).json({ message: "Ticket status updated to 'Used'" });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    return res.status(500).json({ error: "Failed to update ticket status" });
  }
};

exports.getUserTickets = async (req, res) => {
  const { id: user_id } = req.user;

  try {
    const currentDate = new Date().toISOString().split("T")[0];

    const updateQuery = `
      UPDATE tickets t
      JOIN orders o ON t.order_id = o.order_id
      SET t.status = 'Expired'
      WHERE o.selected_date < ? AND t.status NOT IN ('Used', 'Expired')
    `;
    await query(updateQuery, [currentDate]);

    const tickets = await query(
      `
        SELECT 
          t.id,
          t.ticket_code, 
          t.status, 
          t.order_id, 
          o.agrotourism_id, 
          o.selected_date, 
          a.name AS agrotourism_name, 
          a.address AS agrotourism_address, 
          a.url_image AS agrotourism_url_image,
          o.quantity,
          u.name
        FROM tickets t
        JOIN orders o ON t.order_id = o.order_id
        JOIN agrotourism a ON o.agrotourism_id = a.id
        JOIN users u ON o.user_id = u.id
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC, t.id DESC
      `,
      [user_id]
    );

    if (tickets.length === 0) {
      return res.status(404).json({ error: "No tickets found" });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

exports.getDataTiket = async (req, res) => {
  try {
    const sql = `
   SELECT 
    t.id AS ticket_id,
    t.ticket_code,
     t.status,
    t.order_id,  -- order_id dari tabel tickets
    o.selected_date,
    o.quantity,
    o.total_price,
    a.id AS agrotourism_id,
    a.name AS agrotourism_name,  -- Nama agrotourism dari tabel agrotourism
    u.id AS user_id,
    u.name AS user_name  -- Nama user dari tabel users
FROM 
    tickets t
JOIN 
    orders o ON t.order_id = o.order_id  -- Menggunakan order_id untuk join
JOIN 
    agrotourism a ON o.agrotourism_id = a.id  -- Join dengan tabel agrotourism
JOIN 
    users u ON o.user_id = u.id;  -- Join dengan tabel users

  `;

    const tickets = await query(sql);

    return res.json(tickets);
  } catch (error) {
    console.error("Error getting order details:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getTicketStats = async (req, res) => {
  try {
    const totalTicketsQuery = `
      SELECT COUNT(*) AS total_tickets
      FROM tickets;
    `;

    const totalActiveTicketsQuery = `
      SELECT COUNT(*) AS total_active_tickets
      FROM tickets
      WHERE status = 'active';
    `;

    const [totalTicketsResult, totalActiveTicketsResult] = await Promise.all([
      query(totalTicketsQuery),
      query(totalActiveTicketsQuery),
    ]);

    const totalTickets = totalTicketsResult[0].total_tickets;
    const totalActiveTickets = totalActiveTicketsResult[0].total_active_tickets;

    return res.json({
      totalTickets,
      totalActiveTickets,
    });
  } catch (error) {
    console.error("Error getting ticket stats:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
