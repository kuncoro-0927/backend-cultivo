const { query } = require("../config/db");
const path = require("path");
exports.verifyTicket = async (req, res) => {
  const { ticket_code } = req.body;

  if (!ticket_code) {
    return res.status(400).json({ error: "Ticket code is required" });
  }

  try {
    // Query untuk mencari tiket dan join dengan tabel orders, users, dan agrotourism
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

    // Memeriksa status tiket
    if (ticket.ticket_status === "used") {
      return res.status(400).json({ error: "Ticket has already been used" });
    }

    // Jika tiket valid dan belum digunakan, kirimkan detail tiket beserta data terkait
    res.status(200).json({
      message: "Ticket is valid",
      ticket_code: ticket.ticket_code,
      ticket_status: ticket.ticket_status,
      user_name: ticket.user_name || "No user found", // Memastikan jika data user tidak ada
      quantity: ticket.quantity,
      agrotourism_name: ticket.agrotourism_name || "No agrotourism found", // Memastikan jika data agrotourism tidak ada
    });
  } catch (error) {
    console.error("Error verifying ticket:", error);
    res.status(500).json({ error: "Failed to verify ticket" });
  }
};

// exports.useTicket = async (req, res) => {
//   const { ticket_code } = req.body;

//   if (!ticket_code) {
//     return res.status(400).json({ error: "Ticket code is required" });
//   }

//   try {
//     // Periksa apakah tiket valid
//     const [ticket] = await query(
//       "SELECT * FROM tickets WHERE ticket_code = ?",
//       [ticket_code]
//     );

//     if (!ticket) {
//       return res.status(404).json({ error: "Ticket not found" });
//     }

//     if (ticket.status === "used") {
//       return res.status(400).json({ error: "Ticket has already been used" });
//     }

//     // Perbarui status tiket menjadi 'used'
//     const updateQuery =
//       "UPDATE tickets SET status = 'used' WHERE ticket_code = ?";
//     await query(updateQuery, [ticket_code]);

//     res.status(200).json({ message: "Ticket successfully used" });
//   } catch (error) {
//     console.error("Error updating ticket status:", error);
//     res.status(500).json({ error: "Failed to update ticket status" });
//   }
// };

// Fungsi untuk memperbarui status tiket menjadi 'used'
// Controller untuk mengubah status tiket menjadi "used"
exports.useTicket = async (req, res) => {
  const { ticketCode } = req.body;

  if (!ticketCode) {
    return res.status(400).json({ error: "Ticket code is required" });
  }

  try {
    // Periksa apakah tiket dengan ticket_code ada dan dalam status 'active'
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

    // Update status tiket menjadi 'used'
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

    // Update tiket yang sudah expired
    const updateQuery = `
      UPDATE tickets t
      JOIN orders o ON t.order_id = o.order_id
      SET t.status = 'Expired'
      WHERE o.selected_date < ? AND t.status NOT IN ('Used', 'Expired')
    `;
    await query(updateQuery, [currentDate]);

    // Ambil semua tiket pengguna
    const tickets = await query(
      `
        SELECT 
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
        WHERE o.user_id = ?`,
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

    const tickets = await query(sql); // Menggunakan fungsi query yang dibuat

    // Mengirimkan data dalam response
    return res.json(tickets);
  } catch (error) {
    console.error("Error getting order details:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Fungsi untuk menghitung total tiket dan tiket dengan status 'active'
exports.getTicketStats = async (req, res) => {
  try {
    // Query untuk menghitung total tiket
    const totalTicketsQuery = `
      SELECT COUNT(*) AS total_tickets
      FROM tickets;
    `;

    // Query untuk menghitung total tiket dengan status 'active'
    const totalActiveTicketsQuery = `
      SELECT COUNT(*) AS total_active_tickets
      FROM tickets
      WHERE status = 'active';
    `;

    // Menjalankan kedua query secara bersamaan menggunakan Promise.all
    const [totalTicketsResult, totalActiveTicketsResult] = await Promise.all([
      query(totalTicketsQuery),
      query(totalActiveTicketsQuery),
    ]);

    // Mendapatkan hasil dari query pertama dan kedua
    const totalTickets = totalTicketsResult[0].total_tickets;
    const totalActiveTickets = totalActiveTicketsResult[0].total_active_tickets;

    // Mengirimkan hasil statistik dalam response
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
