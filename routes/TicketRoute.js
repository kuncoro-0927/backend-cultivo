const express = require("express");
const {
  verifyTicket,
  useTicket,
  getUserTickets,
  getDataTiket,
  getTicketStats,
} = require("../controllers/TicketController");
//const authenticateUser = require("../middleware/Passport.js");
const verifyToken = require("../middleware/verifytoken.js");
const TicketRoute = express.Router();

TicketRoute.post("/verify-ticket", verifyTicket);
TicketRoute.post("/ticket-use", useTicket);
TicketRoute.get("/ticket/user", verifyToken, getUserTickets);
TicketRoute.get("/get/all/ticket", verifyToken, getDataTiket);
TicketRoute.get("/stats/ticket", verifyToken, getTicketStats);

module.exports = TicketRoute;
