const express = require("express");
const {
  checkTicket,
  CreateReview,
  getReviewall,
  getReviewsByTourId,
  getReviewsByUser,
} = require("../controllers/ReviewsController.js");

const verifyToken = require("../middleware/verifytoken.js");
const ReviewRoute = express.Router();

ReviewRoute.get("/tickets/:userreview", verifyToken, checkTicket);
ReviewRoute.post("/create/reviews", verifyToken, CreateReview);
ReviewRoute.get("/review/:id", getReviewall);
ReviewRoute.get("/reviews/user", verifyToken, getReviewsByUser);
ReviewRoute.get(
  "/review/agrotourism/:agrotourismId",

  getReviewsByTourId
);
module.exports = ReviewRoute;
