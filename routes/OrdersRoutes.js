const express = require("express");
const OrdersController = require("../controllers/OrdersController");
const {
  createOrder,
  handlePaymentCallback,
  getOrderDetails,
  getAllOrders,
  getTransactions,
  getAll,
  getTotalAmountSuccess,
} = require("../controllers/OrdersController");

const OrdersRoute = express.Router();

const verifyToken = require("../middleware/verifytoken.js");
OrdersRoute.post("/create-order", verifyToken, createOrder);
OrdersRoute.post("/paymentcallback", verifyToken, handlePaymentCallback);
OrdersRoute.get("/order/detail/:hashedToken", getOrderDetails);
OrdersRoute.get("/last/orders", getAllOrders);
OrdersRoute.get("/all/orders", getAll);
OrdersRoute.get("/all/transactions", getTransactions);
OrdersRoute.get("/total/amount", getTotalAmountSuccess);
module.exports = OrdersRoute;
