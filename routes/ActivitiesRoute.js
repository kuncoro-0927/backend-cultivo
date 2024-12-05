const express = require("express");
const {
  tambahAktivitas,
  ambilDataAktivitas,
  ambilAktivitasId,
  rubahAktivitas,
  hapusAktivitas,
} = require("../controllers/ActivitiesController.js");

const ActivitiesRoute = express.Router();

ActivitiesRoute.get("/aktivitas", ambilDataAktivitas);
ActivitiesRoute.get("/aktivitas/:id", ambilAktivitasId);
ActivitiesRoute.post("/aktivitas", tambahAktivitas);
ActivitiesRoute.put("/aktivitas/:id", rubahAktivitas);
ActivitiesRoute.delete("/aktivitas/:id", hapusAktivitas);

module.exports = ActivitiesRoute;
