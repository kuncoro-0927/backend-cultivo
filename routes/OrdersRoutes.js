const express = require("express");
const OrdersController = require("../controllers/OrdersController");
const {
  createOrder,
  handlePaymentCallback,
  getOrderDetails,
} = require("../controllers/OrdersController");
const OrdersRoute = express.Router();
const authenticateUser = require("../middleware/Passport.js");
OrdersRoute.post("/create-order", authenticateUser, createOrder);
OrdersRoute.post("/paymentcallback", handlePaymentCallback);
OrdersRoute.get("/order/detail/:hashedToken", getOrderDetails);
module.exports = OrdersRoute;
