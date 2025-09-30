import jwt from "jsonwebtoken";
import User from "../models/User.js";

// helper: create token
const sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

// cookie settings
const cookieOpts = {
  httpOnly: true,
  sameSite: "lax", // ✅ prevents CSRF, still works cross-subdomain
  secure: process.env.COOKIE_SECURE === "true", // true in HTTPS prod
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// --- REGISTER ---
export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Email already registered" });

    await User.create({ email, password, role: role || "admin" });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// --- LOGIN ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = sign({
      sub: String(user._id),
      role: user.role,
      email: user.email,
    });

    // ✅ set cookie
    res.cookie("token", token, cookieOpts);

    // send back basic user info
    res.json({
      user: { id: String(user._id), email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// --- CURRENT USER ---
export const me = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });

  res.json({
    user: {
      id: req.user.id, // ✅ fixed (_id → id)
      email: req.user.email,
      role: req.user.role,
    },
  });
};

// --- LOGOUT ---
export const logout = async (_req, res) => {
  res.clearCookie("token", { ...cookieOpts, maxAge: 0 });
  res.json({ message: "Logged out" });
};