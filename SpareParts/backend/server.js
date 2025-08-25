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

/* ---------- Middleware ---------- */
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

/* CORS (dev-friendly) */
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return cb(null, true);
    if (origin === process.env.CLIENT_ORIGIN) return cb(null, true);
    return cb(new Error("CORS not allowed"), false);
  },
};
app.use(cors(corsOptions));

/* rate limit */
app.use(rateLimit({ windowMs: 60_000, max: 300 }));

/* ---------- Routes ---------- */
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

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
