const express = require("express");
const {
  register,
  verifyOTP,
  resendOtp,
} = require("../controllers/EmailVerifyController");

const EmailRoute = express.Router();

EmailRoute.post("/register", register);
EmailRoute.post("/verify-otp", verifyOTP);
EmailRoute.post("/resend-otp", resendOtp);
module.exports = EmailRoute;
