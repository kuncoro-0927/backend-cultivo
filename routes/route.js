const express = require("express");
const DaerahRoutes = require("./DaerahRoute.js");
const ActivitiesRoutes = require("./ActivitiesRoute.js");
const AgrotourismRoutes = require("./AgrotourismRoute.js");
const AuthRoute = require("./AuthRoute.js");
const router = express();

const api = "/cultivo/api";
router.use(api, AuthRoute);
router.use(api, DaerahRoutes);
router.use(api, ActivitiesRoutes);
router.use(api, AgrotourismRoutes);
module.exports = router;
