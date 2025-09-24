import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth() {
  const { user, checking } = useAuth();
  const loc = useLocation();

  if (checking) {
    return <div className="p-6 text-center">Checking session…</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: loc }} replace />;
  }

  return <Outlet />;
}
