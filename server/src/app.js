require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "15mb" })); 
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => res.send("Candle API running"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);

module.exports = app;