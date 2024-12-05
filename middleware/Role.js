const { query } = require("../config/db.js");

exports.checkRole = (requiredRole) => {
  return async (req, res, next) => {
    const userId = req.user.id;

    try {
      const results = await query("SELECT role_id FROM users WHERE id = ?", [
        userId,
      ]);

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const userRoleId = results[0].role_id;

      if (userRoleId !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions" });
      }

      next();
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error checking user role", error: err.message });
    }
  };
};
