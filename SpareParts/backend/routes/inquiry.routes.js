import { Router } from "express";
import { z } from "zod";
import Inquiry from "../models/Inquiry.js";

const router = Router();

const InquiryZ = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Valid phone is required"),
  vehicleBrand: z.string().min(2, "Vehicle brand is required"),
  description: z.string().min(5, "Description is required"),
});

router.post("/", async (req, res) => {
  try {
    const parsed = InquiryZ.parse(req.body);
    const inquiry = await Inquiry.create(parsed);
    res.status(201).json({
      message: "Inquiry created",
      refCode: inquiry.refCode,
      inquiryId: inquiry._id,
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: err.errors });
    }
    console.error("Create inquiry error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (_req, res) => {
  const items = await Inquiry.find().sort({ createdAt: -1 }).lean();
  res.json(items);
});

export default router;
