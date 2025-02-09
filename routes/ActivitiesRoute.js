const express = require("express");
const {
  tambahAktivitas,
  ambilDataAktivitas,
  ambilAktivitasId,
  rubahAktivitas,
  hapusAktivitas,
} = require("../controllers/ActivitiesController.js");
const { checkRole } = require("../middleware/Role.js");
const verifyToken = require("../middleware/verifytoken.js");
const ActivitiesRoute = express.Router();

ActivitiesRoute.get("/aktivitas", ambilDataAktivitas);
ActivitiesRoute.get("/aktivitas/:id", ambilAktivitasId);
ActivitiesRoute.post("/aktivitas", verifyToken, checkRole(1), tambahAktivitas);
ActivitiesRoute.put(
  "/aktivitas/:id",
  verifyToken,
  checkRole(1),
  rubahAktivitas
);
ActivitiesRoute.delete(
  "/aktivitas/:id",
  verifyToken,
  checkRole(1),
  hapusAktivitas
);

module.exports = ActivitiesRoute;
