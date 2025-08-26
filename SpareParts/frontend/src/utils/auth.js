// src/utils/auth.js

export function setUser(payload) {
  // payload: { token, user: { id, email, name, role } }
  if (payload?.token) localStorage.setItem("sp_token", payload.token);
  if (payload?.user) {
    localStorage.setItem("sparePartsUser", JSON.stringify(payload.user));
  }
  window.dispatchEvent(new Event("userUpdated"));
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem("sparePartsUser") || "null");
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem("sp_token");
  localStorage.removeItem("sparePartsUser");
  window.dispatchEvent(new Event("userUpdated"));
}

/* -----------------------------
   Aliases so imports work
   ----------------------------- */

// Navbar expects `logout`
export const logout = logoutUser;

// Profile expects `updateUser`
export function updateUser(partial) {
  const current = getUser() || {};
  const next = { ...current, ...(partial || {}) };
  localStorage.setItem("sparePartsUser", JSON.stringify(next));
  window.dispatchEvent(new Event("userUpdated"));
  return next;
}
