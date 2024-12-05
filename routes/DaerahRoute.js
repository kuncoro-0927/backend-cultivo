const express = require("express");
const {
  tambahDaerah,
  ambilDataDaerah,
  ambilDaerahId,
  rubahDaerah,
  hapusDaerah,
} = require("../controllers/DaerahController.js");

const DaerahRoute = express.Router();

DaerahRoute.get("/daerah", ambilDataDaerah);
DaerahRoute.get("/daerah/:id", ambilDaerahId);
DaerahRoute.post("/daerah", tambahDaerah);
DaerahRoute.put("/daerah/:id", rubahDaerah);
DaerahRoute.delete("/daerah/:id", hapusDaerah);

module.exports = DaerahRoute;
