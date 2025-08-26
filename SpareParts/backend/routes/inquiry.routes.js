// routes/inquiry.routes.js
import { Router } from "express";
import Inquiry from "../models/Inquiry.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

/** helper: generate next ET-XXXX ref */
async function nextRef() {
  const last = await Inquiry.findOne().sort({ createdAt: -1 }).lean();
  const n = last?.ref ? parseInt((last.ref.match(/\d+/) || [0])[0], 10) + 1 : 1001;
  return `ET-${n}`;
}

/**
 * PUBLIC: create an inquiry (no auth)
 * Frontend should POST /api/inquiries with:
 *  { name, email, phone, brand, item, description }
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, brand, item, description } = req.body || {};
    if (!name || !email || !brand || !item) {
      return res.status(400).json({ message: "name, email, brand, item are required" });
    }

    const doc = await Inquiry.create({
      ref: await nextRef(),
      customerName: name,
      customerEmail: email,
      phone,
      brand,
      item,
      description,
      status: "Submitted",
      createdAt: new Date(),
    });

    res.status(201).json(doc);
  } catch (e) {
    console.error("Create inquiry error:", e);
    res.status(500).json({ message: "Failed to create inquiry" });
  }
});

/** ADMIN: list all inquiries */
router.get("/", requireAuth, requireRole("ADMIN"), async (_req, res) => {
  const list = await Inquiry.find().sort({ createdAt: -1 }).lean();
  res.json(list);
});

/** ADMIN: update status */
router.patch("/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true }).lean();
  res.json(updated);
});

export default router;
