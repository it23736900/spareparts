import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // restore from localStorage if available
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/auth/me");
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

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data.user);
    localStorage.setItem("auth_user", JSON.stringify(data.user));
    return data.user;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore if server has no logout
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
