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
            >
              Admin Login
            </button>
            <button
              onClick={() => fillDemoCredentials('user')}
              className="px-3 py-2 text-xs text-white bg-green-600 rounded-md hover:bg-green-500"
            >
              User Login
            </button>
          </div>
          <p><strong>Admin:</strong> admin_john / admin123</p>
          <p><strong>User:</strong> customer_mike / user123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSystem;
