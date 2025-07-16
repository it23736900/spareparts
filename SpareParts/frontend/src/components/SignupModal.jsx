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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white text-black p-8 rounded-xl shadow-2xl w-full max-w-md relative transition-transform duration-300 animate-slide-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition text-gray-900 placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition text-gray-900 placeholder-gray-400"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition text-gray-900 placeholder-gray-400"
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition text-gray-900 placeholder-gray-400"
          />
          {error && <p className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-center mb-2">{error}</p>}
          {success && <p className="text-green-600 bg-green-50 border border-green-200 rounded p-2 text-center mb-2">{success}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-lg shadow-md transition bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105"
          >
            Sign Up
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-500 hover:underline font-semibold"
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
