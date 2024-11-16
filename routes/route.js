const express = require("express");
const DaerahRoutes = require("./DaerahRoute.js");

const router = express();

// Rute utama untuk setiap modul
const api = "/cultivo/api";

// Tambahkan rute lain di sini
// router.use('/modulLain', modulLainRoutes);
router.use(api, DaerahRoutes);
module.exports = router;
