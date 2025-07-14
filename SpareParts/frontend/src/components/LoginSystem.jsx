import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSystem = ({ onClose }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#999'
          }}
        >
          &times;
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#333' }}>
          🚪 Spare Parts Login
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
          Enter your credentials to access your area
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '5px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '5px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {error && (
          <div style={{
            color: '#e53e3e',
            textAlign: 'center',
            margin: '1rem 0',
            padding: '0.5rem',
            background: '#fed7d7',
            borderRadius: '5px'
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: loading ? '#ccc' : '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f7fafc',
          borderRadius: '5px',
          fontSize: '0.9rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#4a5568' }}>
            Demo Accounts:
          </h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button
              onClick={() => fillDemoCredentials('admin')}
              style={{
                padding: '0.5rem 1rem',
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Admin Login
            </button>
            <button
              onClick={() => fillDemoCredentials('user')}
              style={{
                padding: '0.5rem 1rem',
                background: '#38a169',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
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
