const { query } = require("../config/db.js");

// Fungsi untuk update profil pengguna
const updateUserProfile = async (req, res) => {
  const { firstname, lastname, phonenumber } = req.body;
  const userId = req.user.id; // ID pengguna yang akan diupdate

  try {
    // Update data pengguna
    await query(
      "UPDATE users SET firstname = ?, lastname = ?, phonenumber = ?, updated_at = NOW() WHERE id = ?",
      [firstname, lastname, phonenumber, userId]
    );

    return res.status(200).json({
      msg: "Update profil berhasil",
      data: { firstname, lastname, phonenumber },
    });
  } catch (error) {
    console.log("Update profil gagal", error);
    return res.status(500).json({
      msg: "Update profil gagal",
      error: error.message,
    });
  }
};

const getUserData = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await query(
      "SELECT id, email, firstname, lastname, phonenumber FROM users WHERE id = ?",
      [userId]
    );

    if (result.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({
      msg: "Data pengguna berhasil diambil",
      data: result[0],
    });
  } catch (error) {
    console.log("Error fetching user data", error);
    return res
      .status(500)
      .json({ msg: "Error fetching user data", error: error.message });
  }
};

module.exports = {
  updateUserProfile,
  getUserData,
};
