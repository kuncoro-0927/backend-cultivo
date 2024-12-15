const express = require("express");
const {
  verifyTicket,
  useTicket,
  getUserTickets,
} = require("../controllers/TicketController");
//const authenticateUser = require("../middleware/Passport.js");
const verifyToken = require("../middleware/verifytoken.js");
const TicketRoute = express.Router();

TicketRoute.post("/verify-ticket", verifyTicket);
TicketRoute.post("/ticket-use", useTicket);
TicketRoute.get("/ticket/user", verifyToken, getUserTickets);

module.exports = TicketRoute;
