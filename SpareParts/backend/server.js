import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

import inquiryRoutes from "./routes/inquiry.routes.js";

const app = express();

/* ---------- Middleware ---------- */
app.use(express.json());
app.use(helmet());

// Pretty request logger (helps you see traffic during debug)
app.use((req, _res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} origin=${req.headers.origin || "-"}`
  );
  next();
});

/* CORS (dev-friendly): allow localhost/127.0.0.1 and optional CLIENT_ORIGIN */
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // curl, mobile apps, SSR, etc.
    if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return cb(null, true);
    if (origin === process.env.CLIENT_ORIGIN) return cb(null, true);
    return cb(new Error("CORS not allowed"), false);
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};
app.use(cors(corsOptions));

/* Preflight responder WITHOUT using "*" path (Express 5-safe) */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

/* ---------- Health ---------- */
app.get("/api/health", (_req, res) => res.json({ ok: true }));

/* ---------- Rate limit (skip localhost) ---------- */
const inquiriesLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => ["127.0.0.1", "::1"].includes((req.ip || "").replace("::ffff:", "")),
});
app.use("/api/inquiries", inquiriesLimiter);

/* ---------- Routes ---------- */
app.use("/api/inquiries", inquiryRoutes);

/* ---------- Boot ---------- */
const PORT = process.env.PORT || 5000;
const MONGO =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vehicle_parts";

mongoose
  .connect(MONGO, { autoIndex: true, serverSelectionTimeoutMS: 15000 })
  .then(() => app.listen(PORT, () => console.log(`API listening on :${PORT}`)))
  .catch((e) => {
    console.error("Mongo connect error:", e);
    process.exit(1);
  });