import { Router } from "express";
import { login, logout, register, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Auth routes
router.post("/login", login);
router.post("/register", register);   // optional, disable in prod
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
