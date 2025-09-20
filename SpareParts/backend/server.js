// server.js
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";

import inquiryRoutes from "./routes/inquiry.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";

const app = express();

/* ---------- Security / Infra ---------- */
app.set("trust proxy", 1); // behind nginx
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

/* ---------- CORS ---------- */
const allowedOrigins = [
  "http://localhost:3000",          // frontend dev
  "http://127.0.0.1:3000",          // frontend dev alt
  "http://localhost:8080",          // backend dev
  "http://127.0.0.1:8080",          // backend dev alt
  "http://72.60.97.47"              // live site
];


const corsOptions = {
  origin: (origin, cb) => {
    // allow same-origin/non-browser (curl) with no Origin
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("CORS not allowed: " + origin), false);
  },
  credentials: true, // safe to leave on; works for JWT headers and for cookies if you switch later
};
app.use(cors(corsOptions));

/* ---------- Rate limiting ---------- */
app.use(
  rateLimit({
    windowMs: 60_000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* ---------- Health ---------- */
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || "development" });
});

/* ---------- Routes ---------- */
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

/* ---------- 404 & Error handling ---------- */
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ message: "Not found" });
  }
  next();
});

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || "Server error";
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }
  res.status(status).json({ message });
});

/* ---------- Boot ---------- */
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spareparts";

mongoose
  .connect(MONGO, { autoIndex: true, serverSelectionTimeoutMS: 15000 })
  .then(() => app.listen(PORT, () => console.log(`API listening on :${PORT}`)))
  .catch((e) => {
    console.error("Mongo connect error:", e);
    process.exit(1);
  });

export default app;
