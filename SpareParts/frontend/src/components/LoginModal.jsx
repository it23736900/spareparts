// src/components/LoginModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginModal({ onClose }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("customer");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        activeTab === "admin"
          ? "http://localhost:8080/api/auth/admin-login"
          : "http://localhost:8080/api/auth/customer-login";

      const res = await axios.post(url, formData);
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("userRole", res.data.role);

      onClose(); // close modal
      if (activeTab === "admin") navigate("/admin/dashboard");
      else navigate("/customer/home");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="mb-4 flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("customer")}
            className={`px-4 py-2 rounded ${
              activeTab === "customer"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Customer Login
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`px-4 py-2 rounded ${
              activeTab === "admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Admin Login
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login as {activeTab === "admin" ? "Admin" : "Customer"}
          </button>
        </form>
      </div>
    </div>
  );
}
