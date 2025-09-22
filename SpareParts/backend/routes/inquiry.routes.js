import { Router } from "express";
import Inquiry from "../models/Inquiry.js";
import { sendInquiryEmail } from "../utils/mailer.js";

const router = Router();

/* -------------------------------------------
   Brand → code map (defaults to first 2 letters)
-------------------------------------------- */
const brandPrefixes = {
  Renault: "RE",
  Volkswagen: "VW",
  Porsche: "PO",
  BMW: "BM",
  "Mercedes-Benz": "MB",
  Mercedes: "MB",
  Audi: "AU",
  Volvo: "VO",
  Jaguar: "JA",
  Ford: "FO",
  Peugeot: "PE",
  "Mini Cooper": "MC",
  MG: "MG",
};

function makeRef(brandRaw) {
  const brand = (brandRaw || "").toString().trim();
  const prefix =
    brandPrefixes[brand] || (brand ? brand.slice(0, 2).toUpperCase() : "XX");

  const d = new Date();
  const y = String(d.getFullYear()).slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);

  return `${prefix}-${y}${m}${day}-${rand}`;
}

function makeShort() {
  return `REF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* -------------------------------------------
   Create inquiry
-------------------------------------------- */
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
      refCode: makeRef(vehicleBrand),
      shortCode: makeShort(),
    };

    let doc;
    for (let i = 0; i < 5; i++) {
      try {
        doc = await Inquiry.create(payload);
        break;
      } catch (e) {
        if (e?.code === 11000) {
          if (e?.keyPattern?.refCode)
            payload.refCode = makeRef(payload.vehicleBrand);
          if (e?.keyPattern?.shortCode) payload.shortCode = makeShort();
          continue;
        }
        throw e;
      }
    }

    if (!doc) {
      return res.status(500).json({ message: "Failed to create inquiry" });
    }

    let emailSent = false;
    try {
      await sendInquiryEmail(doc.email, doc.fullName, doc.refCode);
      emailSent = true;
      await Inquiry.findByIdAndUpdate(doc._id, { $set: { emailSent } });
    } catch (err) {
      console.error("Failed to send confirmation email:", err.message);
    }

    return res.status(201).json({ ...doc.toObject(), emailSent });
  } catch (e) {
    console.warn("Create inquiry error:", e);
    return res.status(500).json({ message: "Failed to create inquiry" });
  }
});

/* -------------------------------------------
   Track by ref
-------------------------------------------- */
router.get("/track/:ref", async (req, res) => {
  try {
    const ref = String(req.params.ref || "").trim();
    if (!ref) return res.status(400).json({ message: "Missing reference" });

    const rx = new RegExp(`^${escapeRegExp(ref)}$`, "i");
    const doc = await Inquiry.findOne({
      $or: [
        { refCode: ref },
        { shortCode: ref },
        { refCode: rx },
        { shortCode: rx },
      ],
    }).lean();

    if (!doc) return res.status(404).json({ message: "Not found" });
    return res.json(doc);
  } catch (e) {
    console.error("Track inquiry error:", e);
    return res.status(500).json({ message: "Failed to fetch inquiry" });
  }
});

/* -------------------------------------------
   List inquiries
-------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const { ref } = req.query || {};
    if (ref) {
      const rx = new RegExp(`^${escapeRegExp(String(ref))}$`, "i");
      const doc = await Inquiry.findOne({
        $or: [
          { refCode: ref },
          { shortCode: ref },
          { refCode: rx },
          { shortCode: rx },
        ],
      }).lean();
      return res.json(doc || null);
    }

    const list = await Inquiry.find().sort({ createdAt: -1 }).lean();
    return res.json(list);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to fetch inquiries" });
  }
});

/* -------------------------------------------
   Update status
-------------------------------------------- */
const ALLOWED_STAGES = [
  "Submitted",
  "In Review",
  "Quoted",
  "Paid",
  "Dispatched",
  "Delivered",
];

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};
    if (!ALLOWED_STAGES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const updated = await Inquiry.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    ).lean();

    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.json(updated);
  } catch (e) {
    console.error("Update status error:", e);
    return res.status(500).json({ message: "Failed to update status" });
  }
});

export default router;
