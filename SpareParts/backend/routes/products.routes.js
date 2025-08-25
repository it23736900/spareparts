import { Router } from "express";
import { z } from "zod";
import Product from "../models/Product.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();
const ProductZ = z.object({
  name: z.string().min(2),
  brand: z.string().optional(),
  category: z.string().optional(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional()
});

router.get("/", async (_req, res) => {
  const items = await Product.find().sort({ createdAt: -1 }).lean();
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await Product.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

router.post("/", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const parsed = ProductZ.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());
  const created = await Product.create(parsed.data);
  res.status(201).json(created);
});

router.patch("/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const parsed = ProductZ.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());
  const updated = await Product.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  res.json(updated);
});

router.delete("/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
