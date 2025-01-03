const express = require("express");
const {
  checkTicket,
  CreateReview,
  getReviewall,
} = require("../controllers/ReviewsController.js");

const verifyToken = require("../middleware/verifytoken.js");
const ReviewRoute = express.Router();

ReviewRoute.get("/tickets/:userreview", verifyToken, checkTicket);
ReviewRoute.post("/create/reviews", verifyToken, CreateReview);
ReviewRoute.get("/review/:id", verifyToken, getReviewall);
module.exports = ReviewRoute;
