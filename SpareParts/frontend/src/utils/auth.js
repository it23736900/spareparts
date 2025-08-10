// src/utils/auth.js
const KEY = "sparePartsUser";

export function getUser() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
  // notify app (Navbar listens to this)
  window.dispatchEvent(new Event("userUpdated"));
}

export function updateUser(patch) {
  const u = getUser();
  if (!u) return;
  setUser({ ...u, ...patch });
}

export function logout() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("userUpdated"));
}
