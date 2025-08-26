// backend/routes/auth.routes.js
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

function sign(u) {
  return jwt.sign(
    { sub: u._id.toString(), role: u.role, email: u.email, username: u.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/**
 * Register
 * accepts: { username?, email?, password, name? }
 * At least one of {username, email} is required.
 */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, name } = req.body || {};
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    if (!username && !email) {
      return res.status(400).json({ message: "Provide a username or an email" });
    }

    // ensure not taken
    if (username) {
      const existsU = await User.findOne({ username });
      if (existsU) return res.status(409).json({ message: "Username already taken" });
    }
    if (email) {
      const existsE = await User.findOne({ email });
      if (existsE) return res.status(409).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, name, passwordHash });

    // auto-login on signup if you like; or just return 201
    const token = sign(user);
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e) {
    console.error("register error", e);
    res.status(500).json({ message: "Failed to register" });
  }
});

/**
 * Login
 * accepts: { identifier, password }
 * where `identifier` can be an email OR a username.
 * (If your frontend currently sends { email, password }, we’ll treat `email` as the identifier.)
 */
router.post("/login", async (req, res) => {
  try {
    const identifier = (req.body.identifier || req.body.email || "").trim();
    const { password } = req.body || {};

    if (!identifier || !password) {
      return res.status(400).json({ message: "Identifier and password are required" });
    }

    const isEmail = /\S+@\S+\.\S+/.test(identifier);
    const user = await User.findOne(
      isEmail ? { email: identifier.toLowerCase() } : { username: identifier }
    );

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = sign(user);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e) {
    console.error("login error", e);
    res.status(500).json({ message: "Failed to login" });
  }
});

export default router;
