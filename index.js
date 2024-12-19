const express = require("express");
const passport = require("./middleware/PassportOauth.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { testConnection } = require("./config/db.js");
const router = require("./routes/route.js");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const session = require("express-session");

app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 jam
    },
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(router);
app.use(bodyParser.json());
app.use(passport.initialize());

require("dotenv").config();
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.listen(process.env.APP_PORT, async () => {
  await testConnection();
  console.log(`Running at http://localhost:${process.env.APP_PORT}`);
});
