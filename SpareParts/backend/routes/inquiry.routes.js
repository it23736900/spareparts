// backend/routes/inquiry.routes.js
import { Router } from "express";
import Inquiry from "../models/Inquiry.js";

const router = Router();

function makeRef() {
  const d = new Date();
  const y = String(d.getFullYear()).slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `ET-${y}${m}${day}-${rand}`;
}

router.post("/", async (req, res) => {
  try {
    console.log("POST /api/inquiries content-type:", req.headers["content-type"]);
    console.log("POST /api/inquiries body:", req.body);

    // Accept your current names + some common aliases
    const body = req.body || {};
    const fullName =
      body.fullName ?? body.name ?? body.customerName ?? body.full_name;
    const email = body.email ?? body.mail;
    const phone = body.phone ?? body.tel ?? body.phoneNumber;
    const vehicleBrand =
      body.vehicleBrand ??
      body.brand ??
      body.vehicle ??
      body.selectedBrand ??
      body.customBrand;
    const description = body.description ?? body.note ?? body.details;

    // Basic validation (clear 400 message to the client)
    if (!fullName || !email || !phone || !vehicleBrand || !description) {
      return res.status(400).json({
        message:
          "Missing required fields: fullName, email, phone, vehicleBrand, description",
      });
    }

    // Build payload. refCode is generated server-side.
    const payload = {
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      vehicleBrand: String(vehicleBrand).trim(),
      description: String(description).trim(),
      refCode: makeRef(),
    };

    // Try create; on rare 11000 (ref collision) regenerate and retry
    let lastErr = null;
    for (let i = 0; i < 3; i++) {
      try {
        const doc = await Inquiry.create(payload);
        return res.status(201).json(doc);
      } catch (e) {
        if (e?.code === 11000 && e?.keyPattern?.refCode) {
          payload.refCode = makeRef();
          continue;
        }
        lastErr = e;
        break;
      }
    }
    if (lastErr) throw lastErr;
  } catch (e) {
    console.warn("Create inquiry error:", e);
    return res.status(500).json({ message: "Failed to create inquiry" });
  }
});

export default router;
