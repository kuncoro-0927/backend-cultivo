const express = require("express");
const {
  getTotalSales,
  getTodaySalesData,
} = require("../controllers/SalesController");

const SalesRoute = express.Router();

SalesRoute.get("/total/sales", getTotalSales);
SalesRoute.get("/total/today/sales", getTodaySalesData);

module.exports = SalesRoute;
