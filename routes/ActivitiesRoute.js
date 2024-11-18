const express = require("express");
const {
  tambahAktivitas,
  ambilDataAktivitas,
  ambilAktivitasId,
  rubahAktivitas,
  hapusAktivitas,
} = require("../controllers/ActivitiesController.js");

const ActivitiesRoutes = express.Router();

ActivitiesRoutes.get("/aktivitas", ambilDataAktivitas);
ActivitiesRoutes.get("/aktivitas/:id", ambilAktivitasId);
ActivitiesRoutes.post("/aktivitas", tambahAktivitas);
ActivitiesRoutes.put("/aktivitas/:id", rubahAktivitas);
ActivitiesRoutes.delete("/aktivitas/:id", hapusAktivitas);

module.exports = ActivitiesRoutes;
