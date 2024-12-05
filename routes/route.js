const express = require("express");
const DaerahRoute = require("./DaerahRoute.js");
const ActivitiesRoute = require("./ActivitiesRoute.js");
const AgrotourismRoute = require("./AgrotourismRoute.js");
const AuthRoute = require("./AuthRoute.js");
const UserRoute = require("./UserRoute.js");
const PaymentRoute = require("./PaymentRoutes.js");
const OrdersRoute = require("./OrdersRoutes.js");
const TesPaymentRoute = require("./TesPayment.js");
const router = express();
const authenticateUser = require("../middleware/Passport.js");

const api = "/cultivo/api";

router.use(api, AuthRoute);
router.use(api, DaerahRoute);
router.use(api, ActivitiesRoute);
router.use(api, AgrotourismRoute);
router.use(api, UserRoute);
router.use(api, PaymentRoute);
router.use(api, OrdersRoute);
router.use(api, TesPaymentRoute);
module.exports = router;
