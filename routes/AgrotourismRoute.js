const express = require("express");
const {
  tambahAgrotourism,
  ambilSemuaAgrotourism,
  ambilAgrotourismById,
  updateAgrotourism,
  hapusAgrotourism,
  ambilAgrotourismByCity,
  getTopAgrotourism,

  getAgrotourismByActivityId1,
  getAgrotourismByActivityId2,
  getAgrotourismByActivityId3,
} = require("../controllers/AgrotourismController.js");
const authenticateUser = require("../middleware/Passport.js");
const AgrotourismRoute = express.Router();

AgrotourismRoute.get("/agrotourism", ambilSemuaAgrotourism);
AgrotourismRoute.get("/agrotourism/:id", ambilAgrotourismById);
AgrotourismRoute.get("/agrotourism/city/:id", ambilAgrotourismByCity);
AgrotourismRoute.post("/agrotourism", tambahAgrotourism);
AgrotourismRoute.put("/agrotourism/:id", updateAgrotourism);
AgrotourismRoute.delete("/agrotourism/:id", hapusAgrotourism);
AgrotourismRoute.get("/top/agrotourism", getTopAgrotourism);
// AgrotourismRoute.get("/agrotourism/activity/:id", getAgrotourismByActivityId);
AgrotourismRoute.get(
  "/agrotourism/activity/pertanian",
  getAgrotourismByActivityId1
);
AgrotourismRoute.get(
  "/agrotourism/activity/perkebunan",
  getAgrotourismByActivityId2
);
AgrotourismRoute.get(
  "/agrotourism/activity/perikanan",
  getAgrotourismByActivityId3
);
module.exports = AgrotourismRoute;
