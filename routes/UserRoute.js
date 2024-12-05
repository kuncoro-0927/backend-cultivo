const express = require("express");

const {
  getUserData,
  updateUserProfile,
} = require("../controllers/UserController");
// const checkRole = require("../middleware/Role").checkRole;
const UserRoute = express.Router();
const authenticateUser = require("../middleware/Passport.js");
UserRoute.get("/user", authenticateUser, getUserData);
UserRoute.put("/user/profile", authenticateUser, updateUserProfile);
// router.delete("/:id", authenticateUser, checkRole(1), userController.deleteUser);
module.exports = UserRoute;
