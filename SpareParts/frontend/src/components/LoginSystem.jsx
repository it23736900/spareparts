import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../utils/auth";
import api from "../utils/api";

const LoginSystem = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");          // ← email (backend expects email)
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      // data = { token, user: { id, email, name, role: "ADMIN" | "STAFF" } }
      setUser(data);

      // redirect rule:
      if (data.user.role === "ADMIN") {
        navigate("/admin");      // admin → dashboard
      } else {
        // STAFF → stay on page (just close)
        onClose?.();
      }
    } catch (e) {
      setError(e?.response?.data?.message || "Login failed. Check your email/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0B1C1F] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-yellow-400">
        <button
          onClick={onClose}
          className="absolute text-2xl text-yellow-400 transition top-3 right-4 hover:text-yellow-300"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="mb-1 text-3xl font-bold text-center text-yellow-400">🚪 Sign in</h2>
        <p className="mb-6 text-center text-gray-400">Use your account credentials</p>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-yellow-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-yellow-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              required
            />
          </div>

          {error && (
            <div className="px-4 py-2 text-sm text-center text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-xl transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-4 text-sm text-center text-gray-300">
            Don’t have an account?{" "}
            <button type="button" onClick={onSwitchToSignup} className="text-yellow-400 hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSystem;
