const express = require("express");

const {
  getUserData,
  updateUserProfile,
  getTopUsers,
  getAll,
  getUserStats,
} = require("../controllers/UserController");
const verifyToken = require("../middleware/verifytoken.js");
// const checkRole = require("../middleware/Role").checkRole;
const UserRoute = express.Router();
//const authenticateUser = require("../middleware/Passport.js");
UserRoute.get("/user", verifyToken, getUserData);
UserRoute.get("/all/user", verifyToken, getAll);
UserRoute.get("/top/user", getTopUsers);
UserRoute.get("/stats/user", getUserStats);
UserRoute.put("/user/profile", verifyToken, updateUserProfile);
// router.delete("/:id", authenticateUser, checkRole(1), userController.deleteUser);
module.exports = UserRoute;
