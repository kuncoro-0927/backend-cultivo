const express = require("express");
const {
  tambahAgrotourism,
  ambilSemuaAgrotourism,
  ambilAgrotourismById,
  updateAgrotourism,
  hapusAgrotourism,
  ambilAgrotourismByCity,
} = require("../controllers/AgrotourismController.js");
const authenticateUser = require("../middleware/Passport.js");
const AgrotourismRoute = express.Router();

AgrotourismRoute.get("/agrotourism", ambilSemuaAgrotourism);
AgrotourismRoute.get("/agrotourism/:id", ambilAgrotourismById);
AgrotourismRoute.get("/agrotourism/city/:id", ambilAgrotourismByCity);
AgrotourismRoute.post("/agrotourism", authenticateUser, tambahAgrotourism);
AgrotourismRoute.put("/agrotourism/:id", authenticateUser, updateAgrotourism);
AgrotourismRoute.delete("/agrotourism/:id", authenticateUser, hapusAgrotourism);

module.exports = AgrotourismRoute;
