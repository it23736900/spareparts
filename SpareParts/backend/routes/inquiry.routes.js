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

// NEW: 6-char base36 short code
function makeShort() {
  // random 6 uppercase letters/numbers
  return `REF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

router.post("/", async (req, res) => {
  try {
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

    if (!fullName || !email || !phone || !vehicleBrand || !description) {
      return res.status(400).json({
        message:
          "Missing required fields: fullName, email, phone, vehicleBrand, description",
      });
    }

    const payload = {
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      vehicleBrand: String(vehicleBrand).trim(),
      description: String(description).trim(),
      refCode: makeRef(),
      shortCode: makeShort(),               // ← save a short code too
    };

    // handle rare collisions on either key
    for (let i = 0; i < 5; i++) {
      try {
        const doc = await Inquiry.create(payload);
        return res.status(201).json(doc);
      } catch (e) {
        if (e?.code === 11000) {
          if (e?.keyPattern?.refCode) payload.refCode = makeRef();
          if (e?.keyPattern?.shortCode) payload.shortCode = makeShort();
          continue;
        }
        throw e;
      }
    }
    return res.status(500).json({ message: "Failed to create inquiry" });
  } catch (e) {
    console.warn("Create inquiry error:", e);
    return res.status(500).json({ message: "Failed to create inquiry" });
  }
});

// NEW: track by either code (case-insensitive, trims spaces)
router.get("/track/:ref", async (req, res) => {
  try {
    const ref = String(req.params.ref || "").trim();
    if (!ref) return res.status(400).json({ message: "Missing reference" });

    const doc = await Inquiry.findOne({
      $or: [
        { refCode: ref },
        { shortCode: ref },
      ],
    }).lean();

    if (!doc) return res.status(404).json({ message: "Not found" });
    return res.json(doc);
  } catch (e) {
    console.error("Track inquiry error:", e);
    return res.status(500).json({ message: "Failed to fetch inquiry" });
  }
});

// (optional) also allow /api/inquiries?ref=... as a fallback
router.get("/", async (req, res) => {
  try {
    const { ref } = req.query || {};
    if (ref) {
      const doc = await Inquiry.findOne({
        $or: [{ refCode: ref }, { shortCode: ref }],
      }).lean();
      if (!doc) return res.json(null);
      return res.json(doc);
    }
    // existing list logic if you had one…
    const list = await Inquiry.find().sort({ createdAt: -1 }).lean();
    return res.json(list);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to fetch inquiries" });
  }
});

export default router;
