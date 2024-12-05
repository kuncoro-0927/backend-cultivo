const express = require("express");
const {
  processPayment,
  handlePaymentCallback,
} = require("../controllers/TesPayment");
const TesPaymentRoute = express.Router();

TesPaymentRoute.post("/payment", processPayment);
TesPaymentRoute.post("/payment/callback", handlePaymentCallback);

module.exports = TesPaymentRoute;
