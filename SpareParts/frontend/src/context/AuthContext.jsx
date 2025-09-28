// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [checking, setChecking] = useState(true);

  // Run once on mount: check cookie/session
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/auth/me", { withCredentials: true });
        setUser(data.user);
        localStorage.setItem("auth_user", JSON.stringify(data.user));
      } catch {
        setUser(null);
        localStorage.removeItem("auth_user");
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  // Login → cookie comes from server
  const login = async (email, password) => {
    const { data } = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(data.user);
    localStorage.setItem("auth_user", JSON.stringify(data.user));
    return data.user;
  };

  // Logout → clears cookie server-side
  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch {
      // ignore server errors here
    }
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthCtx.Provider value={{ user, checking, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
