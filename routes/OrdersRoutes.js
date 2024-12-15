const express = require("express");
const OrdersController = require("../controllers/OrdersController");
const {
  createOrder,
  handlePaymentCallback,
  getOrderDetails,
  getAllOrders,
  getTransactions,
  getAll,
} = require("../controllers/OrdersController");
const OrdersRoute = express.Router();
//const authenticateUser = require("../middleware/Passport.js");
const verifyToken = require("../middleware/verifytoken.js");
OrdersRoute.post("/create-order", verifyToken, createOrder);
OrdersRoute.post("/paymentcallback", handlePaymentCallback);
OrdersRoute.get("/order/detail/:hashedToken", getOrderDetails);
OrdersRoute.get("/last/orders", getAllOrders);
OrdersRoute.get("/all/orders", getAll);
OrdersRoute.get("/all/transactions", getTransactions);
module.exports = OrdersRoute;
