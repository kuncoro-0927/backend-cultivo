const express = require("express");
const PaymentController = require("../controllers/PaymentController");

const PaymentRoute = express.Router();

PaymentRoute.post("/create-transaction", PaymentController.createTransaction);
PaymentRoute.post("/paymentcallback", PaymentController.handlePaymentCallback);

module.exports = PaymentRoute;
