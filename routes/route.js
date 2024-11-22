const express = require("express");
const DaerahRoutes = require("./DaerahRoute.js");
const ActivitiesRoutes = require("./ActivitiesRoute.js");
const AgrotourismRoutes = require("./AgrotourismRoute.js");
const AuthRoute = require("./AuthRoute.js");
const router = express();
const authenticateUser = require("../middleware/Passport.js");
const api = "/cultivo/api";

router.use(api, AuthRoute);
router.use(api, authenticateUser, DaerahRoutes);
router.use(api, authenticateUser, ActivitiesRoutes);
router.use(api, authenticateUser, AgrotourismRoutes);
module.exports = router;
