import React, { useState } from 'react';
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
        navigate(foundUser.role === 'admin' ? '/admin' : '/user');
        onClose();
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
<<<<<<< HEAD
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
=======
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0B1C1F] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-yellow-400">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-2xl text-yellow-400 transition top-3 right-4 hover:text-yellow-300"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="mb-1 text-3xl font-bold text-center text-yellow-400">🚪 Spare Parts Login</h2>
        <p className="mb-6 text-center text-gray-400">Enter your credentials to access your area</p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-yellow-400">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-yellow-400">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 bg-[#13272A] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-yellow-400 text-black hover:bg-yellow-300'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="mt-4 text-sm text-center text-gray-300">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-yellow-400 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-[#13272A] rounded-xl text-sm">
          <h4 className="mb-2 font-semibold text-yellow-400">Demo Accounts:</h4>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => fillDemoCredentials('admin')}
              className="px-3 py-2 text-xs text-white bg-red-600 rounded-md hover:bg-red-500"
>>>>>>> 4483b6b78bac643d7475944ea7312393866ac889
            >
              Admin Login
            </button>
            <button
              onClick={() => fillDemoCredentials('user')}
<<<<<<< HEAD
              className="px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-50 text-xs font-semibold transition bg-transparent"
=======
              className="px-3 py-2 text-xs text-white bg-green-600 rounded-md hover:bg-green-500"
>>>>>>> 4483b6b78bac643d7475944ea7312393866ac889
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
