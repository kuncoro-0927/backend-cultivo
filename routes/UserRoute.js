const express = require("express");

const {
  getUserData,
  updateUserProfile,
  getTopUsers,
  getAll,
  getUserStats,
} = require("../controllers/UserController");
const verifyToken = require("../middleware/verifytoken.js");

const UserRoute = express.Router();

UserRoute.get("/user", verifyToken, getUserData);
UserRoute.get("/all/user", verifyToken, getAll);
UserRoute.get("/top/user", getTopUsers);
UserRoute.get("/stats/user", getUserStats);
UserRoute.put("/user/profile", verifyToken, updateUserProfile);

module.exports = UserRoute;
