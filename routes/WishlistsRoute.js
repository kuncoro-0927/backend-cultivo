const express = require("express");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/WishlistsaController");
//const authenticateUser = require("../middleware/Passport.js");
const verifyToken = require("../middleware/verifytoken.js");
const WishlistRoute = express.Router();

WishlistRoute.post("/add/wishlist", verifyToken, addToWishlist);
WishlistRoute.delete(
  "/delete/wishlist/:wisataId",
  verifyToken,
  removeFromWishlist
);
WishlistRoute.get("/get/wishlist", verifyToken, getWishlist);

module.exports = WishlistRoute;
