const express = require("express");

const {
  getUserData,
  updateUserProfile,
  getTopUsers,
} = require("../controllers/UserController");
const verifyToken = require("../middleware/verifytoken.js");
// const checkRole = require("../middleware/Role").checkRole;
const UserRoute = express.Router();
//const authenticateUser = require("../middleware/Passport.js");
UserRoute.get("/user", verifyToken, getUserData);
UserRoute.get("/top/user", getTopUsers);
UserRoute.put("/user/profile", verifyToken, updateUserProfile);
// router.delete("/:id", authenticateUser, checkRole(1), userController.deleteUser);
module.exports = UserRoute;
