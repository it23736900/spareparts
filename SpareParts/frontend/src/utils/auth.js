// src/utils/auth.js

/**
 * Save user info (but NOT the JWT token — that's stored in httpOnly cookie)
 * @param {Object} user - { id, email, role, name? }
 */
export function setUser(user) {
  if (user) {
    localStorage.setItem("sparePartsUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("sparePartsUser");
  }
  // Let other parts of app know user state changed
  window.dispatchEvent(new Event("userUpdated"));
}

/**
 * Get user info from localStorage
 * @returns {Object|null}
 */
export function getUser() {
  try {
    return JSON.parse(localStorage.getItem("sparePartsUser") || "null");
  } catch {
    return null;
  }
}

/**
 * Clear user info (on logout)
 */
export function logoutUser() {
  localStorage.removeItem("sparePartsUser");
  window.dispatchEvent(new Event("userUpdated"));
}

/* -----------------------------
   Aliases (for compatibility)
   ----------------------------- */

// Some components call `logout` directly
export const logout = logoutUser;

// Some components call `updateUser`
export function updateUser(partial) {
  const current = getUser() || {};
  const next = { ...current, ...(partial || {}) };
  localStorage.setItem("sparePartsUser", JSON.stringify(next));
  window.dispatchEvent(new Event("userUpdated"));
  return next;
}
