import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSystem = ({ onClose, onSwitchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const users = [
    { username: 'admin_john', password: 'admin123', role: 'admin' },
    { username: 'admin_sarah', password: 'admin456', role: 'admin' },
    { username: 'customer_mike', password: 'user123', role: 'user' },
    { username: 'customer_lisa', password: 'user456', role: 'user' }
  ];

  const handleLogin = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        localStorage.setItem('sparePartsUser', JSON.stringify(foundUser));
        // Redirect to dashboard route
        navigate(foundUser.role === 'admin' ? '/admin' : '/user');
        onClose(); // Close modal
      } else {
        setError('Wrong username or password! Try again.');
      }

      setLoading(false);
    }, 1000);
  };

  const fillDemoCredentials = (type) => {
    if (type === 'admin') {
      setUsername('admin_john');
      setPassword('admin123');
    } else {
      setUsername('customer_mike');
      setPassword('user123');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white text-black p-8 rounded-xl shadow-2xl w-full max-w-md relative transition-transform duration-300 animate-slide-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-700">Spare Parts Login</h2>
        <p className="text-center text-gray-500 mb-6">Enter your credentials to access your area</p>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition text-gray-900 placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-gray-50 transition text-gray-900 placeholder-gray-400"
          />
        </div>
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-center mb-4">{error}</div>
        )}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-lg font-bold text-lg shadow-md transition bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-500 hover:underline font-semibold"
          >
            Sign Up
          </button>
        </p>
        <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm">
          <h4 className="mb-2 text-gray-700 font-semibold">Demo Accounts:</h4>
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => fillDemoCredentials('admin')}
              className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50 text-xs font-semibold transition bg-transparent"
            >
              Admin Login
            </button>
            <button
              onClick={() => fillDemoCredentials('user')}
              className="px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-50 text-xs font-semibold transition bg-transparent"
            >
              User Login
            </button>
          </div>
          <div className="text-gray-600">
            <div><span className="font-semibold">Admin:</span> admin_john / admin123</div>
            <div><span className="font-semibold">User:</span> customer_mike / user123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSystem;
