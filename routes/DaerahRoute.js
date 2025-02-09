const express = require("express");
const {
  tambahDaerah,
  ambilDataDaerah,
  ambilDaerahId,
  rubahDaerah,
  hapusDaerah,
} = require("../controllers/DaerahController.js");

const DaerahRoute = express.Router();
const verifyToken = require("../middleware/verifytoken.js");
const { checkRole } = require("../middleware/Role.js");
DaerahRoute.get("/daerah", ambilDataDaerah);
DaerahRoute.get("/daerah/:id", ambilDaerahId);
DaerahRoute.post("/daerah", verifyToken, checkRole(1), tambahDaerah);
DaerahRoute.put("/daerah/:id", verifyToken, checkRole(1), rubahDaerah);
DaerahRoute.delete("/daerah/:id", verifyToken, checkRole(1), hapusDaerah);

module.exports = DaerahRoute;
