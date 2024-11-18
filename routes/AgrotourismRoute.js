const express = require("express");
const {
  tambahAgrotourism,
  ambilSemuaAgrotourism,
  ambilAgrotourismById,
  updateAgrotourism,
  hapusAgrotourism,
} = require("../controllers/AgrotourismController.js");

const AgrotourismRoutes = express.Router();

AgrotourismRoutes.get("/agrotourism", ambilSemuaAgrotourism);
AgrotourismRoutes.get("/agrotourism/:id", ambilAgrotourismById);
AgrotourismRoutes.post("/agrotourism", tambahAgrotourism);
AgrotourismRoutes.put("/agrotourism/:id", updateAgrotourism);
AgrotourismRoutes.delete("/agrotourism/:id", hapusAgrotourism);

module.exports = AgrotourismRoutes;
