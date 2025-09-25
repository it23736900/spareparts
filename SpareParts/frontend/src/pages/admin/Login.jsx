import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);

      // ✅ Always send admins to dashboard after login
      // If user came from a protected admin page, send them back there
      const dest =
        location.state?.from?.pathname?.startsWith("/admin") &&
        location.state.from.pathname !== "/admin/login"
          ? location.state.from.pathname
          : "/admin/dashboard";

      navigate(dest, { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Check your email/password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-emerald-950 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-[#0B1C1F] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-yellow-400"
      >
        <h2 className="mb-1 text-3xl font-bold text-center text-yellow-400">
          Admin Sign In
        </h2>
        <p className="mb-6 text-center text-gray-400">
          Use your admin credentials
        </p>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-yellow-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-yellow-400">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {error && (
            <div className="px-4 py-2 text-sm text-center text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-xl transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}
