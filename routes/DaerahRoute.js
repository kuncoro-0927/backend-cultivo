const express = require("express");
const {
  tambahDaerah,
  ambilDataDaerah,
  ambilDaerahId,
  rubahDaerah,
  hapusDaerah,
} = require("../controllers/DaerahController.js");

const DaerahRoutes = express.Router();

DaerahRoutes.get("/daerah", ambilDataDaerah);
DaerahRoutes.get("/daerah/:id", ambilDaerahId);
DaerahRoutes.post("/daerah", tambahDaerah);
DaerahRoutes.put("/daerah/:id", rubahDaerah);
DaerahRoutes.delete("/daerah/:id", hapusDaerah);

module.exports = DaerahRoutes;
