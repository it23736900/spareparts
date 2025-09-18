// src/components/SignupModal.jsx
import React, { useState } from "react";
import api from "../utils/api"; // axios instance (baseURL '/api')

const SignupModal = ({ onClose, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");            // ★ NEW
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const emailOK = (v = "") => /\S+@\S+\.\S+/.test(v.trim());

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!emailOK(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      setSuccess("Signup successful! You can now log in.");
      // optional: immediately switch to sign in
      onSwitchToLogin?.();
      // If you prefer to keep them on the same modal, comment the line above.
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (e) {
      const msg = e?.response?.data?.message || "Signup failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0B1C1F] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-yellow-400">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-2xl text-yellow-400 transition top-3 right-4 hover:text-yellow-300"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="mb-1 text-3xl font-bold text-center text-yellow-400"> Sign Up</h2>
        <p className="mb-6 text-center text-gray-400">Create your account to access features</p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-yellow-400">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a username"
              className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-yellow-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-yellow-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
              className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-yellow-400">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {error && (
            <div className="px-4 py-2 text-sm text-center text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="px-4 py-2 text-sm text-center text-green-700 bg-green-100 rounded-md">
              {success}
            </div>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className={`w-full py-3 font-semibold text-black transition rounded-xl ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-300"
            }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="mt-4 text-sm text-center text-gray-300">
            Already have an account?{" "}
            <button type="button" onClick={onSwitchToLogin} className="text-yellow-400 hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
