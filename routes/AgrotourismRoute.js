const express = require("express");
const {
  tambahAgrotourism,
  ambilSemuaAgrotourism,
  ambilAgrotourismById,
  updateAgrotourism,
  hapusAgrotourism,
  ambilAgrotourismByCity,
  getTopAgrotourism,
  getTotalAgrotourism,
  getAgrotourismByActivityId1,
  getAgrotourismByActivityId2,
  getAgrotourismByActivityId3,
} = require("../controllers/AgrotourismController.js");
const verifyToken = require("../middleware/verifytoken.js");
const { checkRole } = require("../middleware/Role.js");
const AgrotourismRoute = express.Router();

AgrotourismRoute.get("/agrotourism", ambilSemuaAgrotourism);
AgrotourismRoute.get("/agrotourism/:id", ambilAgrotourismById);
AgrotourismRoute.get("/agrotourism/city/:id", ambilAgrotourismByCity);
AgrotourismRoute.post(
  "/agrotourism",
  verifyToken,
  checkRole(1),
  tambahAgrotourism
);
AgrotourismRoute.put(
  "/agrotourism/:id",
  verifyToken,
  checkRole(1),
  updateAgrotourism
);
AgrotourismRoute.delete(
  "/agrotourism/:id",
  verifyToken,
  checkRole(1),
  hapusAgrotourism
);
AgrotourismRoute.get("/top/agrotourism", getTopAgrotourism);
AgrotourismRoute.get(
  "/agrotourism/activity/pertanian",
  getAgrotourismByActivityId1
);
AgrotourismRoute.get(
  "/agrotourism/activity/perkebunan",
  getAgrotourismByActivityId2
);
AgrotourismRoute.get("/agrotourism/activity/alam", getAgrotourismByActivityId3);
AgrotourismRoute.get("/total/agrotourism", verifyToken, getTotalAgrotourism);
module.exports = AgrotourismRoute;
