import jwt from "jsonwebtoken";
import User from "../models/User.js";

// helper: create token
const sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

// cookie settings
const cookieOpts = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.COOKIE_SECURE === "true", // only true on HTTPS
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// register (optional – disable in prod if you don’t want open signups)
export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    await User.create({ email, password, role: role || "admin" });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = sign({ sub: user._id, role: user.role, email: user.email });
    res.cookie("token", token, cookieOpts);
    res.json({ user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// current logged-in user
export const me = async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  res.json({
    user: { id: req.user._id, email: req.user.email, role: req.user.role },
  });
};

// logout
export const logout = async (_req, res) => {
  res.clearCookie("token", { ...cookieOpts, maxAge: 0 });
  res.json({ message: "Logged out" });
};
