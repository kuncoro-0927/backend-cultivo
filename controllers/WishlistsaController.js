const { query } = require("../config/db.js");

async function addToWishlist(req, res) {
  const { agrotourism_id } = req.body;
  const id = req.user.id; // Ambil user_id dari token JWT yang sudah didecode

  try {
    // Cek apakah item sudah ada di wishlist
    const existingWishlist = await query(
      "SELECT * FROM wishlist WHERE user_id = ? AND agrotourism_id = ?",
      [id, agrotourism_id]
    );

    if (existingWishlist.length > 0) {
      return res.status(400).json({ message: "Item sudah ada di wishlist" });
    }

    // Tambahkan item ke wishlist
    await query(
      "INSERT INTO wishlist (user_id, agrotourism_id) VALUES (?, ?)",
      [id, agrotourism_id]
    );

    res.status(200).json({ message: "Item berhasil ditambahkan ke wishlist" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function removeFromWishlist(req, res) {
  const { wisataId } = req.params;
  const id = req.user.id; // Ambil user_id dari token JWT

  try {
    // Hapus item dari wishlist
    await query(
      "DELETE FROM wishlist WHERE user_id = ? AND agrotourism_id = ?",
      [id, wisataId]
    );

    res.status(200).json({ message: "Item berhasil dihapus dari wishlist" });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

// async function getWishlist(req, res) {
//   const id = req.params; // Ambil user_id dari token JWT

//   try {
//     // Ambil data wishlist berdasarkan user_id
//     const wishlist = await query("SELECT * FROM wishlist WHERE user_id = ?", [
//       id,
//     ]);

//     res.status(200).json(wishlist);
//   } catch (error) {
//     console.error("Error fetching wishlist:", error);
//     res.status(500).json({ message: "Terjadi kesalahan server" });
//   }
// }

async function getWishlist(req, res) {
  const { id: user_id } = req.user; // Ambil user_id dari token JWT
  try {
    // Ambil semua tiket berdasarkan user_id
    const wishlist = await query(
      `SELECT w.agrotourism_id, a.name, a.description, a.price, a.url_image FROM wishlist w JOIN agrotourism a ON w.agrotourism_id = a.id WHERE w.user_id = ?`,
      [user_id]
    );

    if (wishlist.length === 0) {
      return res.status(404).json({ error: "No wishlist found" });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
}

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
