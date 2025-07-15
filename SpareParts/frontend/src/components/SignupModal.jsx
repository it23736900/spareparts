import React, { useState } from 'react';

const SignupModal = ({ onClose, onSwitchToLogin }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Simulate success
    setSuccess('Signup successful! (Mock only)');
    setForm({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0B1C1F] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-yellow-400">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-2xl text-yellow-400 transition top-3 right-4 hover:text-yellow-300"
        >
          &times;
        </button>

        <h2 className="mb-6 text-3xl font-bold text-center text-yellow-400">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}

          <button
            type="submit"
            className="w-full py-2 font-semibold text-black transition bg-yellow-400 rounded-xl hover:bg-yellow-300"
          >
            Sign Up
          </button>

          <p className="mt-4 text-sm text-center text-gray-300">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-yellow-400 hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
