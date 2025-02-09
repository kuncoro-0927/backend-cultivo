const express = require("express");
const passport = require("../middleware/PassportOauth");
const loginLimiter = require("../middleware/LoginLimit.js");
const {
  registerUser,
  loginUser,
  loginWithGoogle,
  getUserData,
  logout,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/AuthController");
const AuthRoute = express.Router();
const verifyToken = require("../middleware/verifytoken.js");
AuthRoute.post("/register", registerUser);
AuthRoute.post("/login", loginLimiter, loginUser);
AuthRoute.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
  })
);

// Callback setelah login berhasil dengan Google OAuth
AuthRoute.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  loginWithGoogle
);

AuthRoute.post("/auth/logout", (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0), path: "/" });
  res.status(200).json({ message: "Logout successful" });
});

AuthRoute.get("/userr", verifyToken, getUserData);

AuthRoute.post("/logout", logout);

AuthRoute.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

AuthRoute.post("/forgot-password", requestPasswordReset);
AuthRoute.post("/reset-password", resetPassword);
module.exports = AuthRoute;
