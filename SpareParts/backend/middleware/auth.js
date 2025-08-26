// middleware/auth.js
import jwt from "jsonwebtoken";

/**
 * Require a valid JWT in Authorization: Bearer <token>.
 * Attaches req.user = { id, role, email }.
 */
export function requireAuth(req, res, next) {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // normalize fields
    req.user = {
      id: payload.sub || payload.id,
      role: payload.role,
      email: payload.email,
    };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/**
 * Require that req.user.role is one of the provided roles.
 * Use after requireAuth.
 *   router.get("/admin", requireAuth, requireRole("ADMIN"), handler)
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user?.role) return res.status(401).json({ message: "Not authenticated" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
}

/**
 * Optional auth (if token present, attach req.user; otherwise continue).
 * Useful for public endpoints that behave differently for logged-in users.
 */
export function optionalAuth(req, _res, next) {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return next();
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.sub || payload.id,
      role: payload.role,
      email: payload.email,
    };
  } catch {
    // ignore bad token for optional auth
  }
  next();
}
