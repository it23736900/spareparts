import React, { useState, useEffect } from 'react';

const LoginSystem = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const users = [
    { username: 'admin_john', password: 'admin123', role: 'admin' },
    { username: 'admin_sarah', password: 'admin456', role: 'admin' },
    { username: 'customer_mike', password: 'user123', role: 'user' },
    { username: 'customer_lisa', password: 'user456', role: 'user' }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('sparePartsUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setCurrentPage(parsedUser.role === 'admin' ? 'admin' : 'user');
      } catch (e) {
        localStorage.removeItem('sparePartsUser');
      }
    }
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setError('');

    setTimeout(() => {
      const foundUser = users.find(u => u.username === username && u.password === password);

      if (foundUser) {
        localStorage.setItem('sparePartsUser', JSON.stringify(foundUser));
        setUser(foundUser);
        setCurrentPage(foundUser.role === 'admin' ? 'admin' : 'user');
      } else {
        setError('Wrong username or password! Try again.');
      }

      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('sparePartsUser');
    setUser(null);
    setCurrentPage('login');
    setUsername('');
    setPassword('');
    setError('');
    onClose(); // close modal
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

  // LOGIN MODAL
  if (currentPage === 'login') {
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
  }

  // ADMIN DASHBOARD
  if (currentPage === 'admin') {
    return (
      <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
        <header style={{
          background: 'white',
          padding: '1rem 2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1>🔧 Admin Control Panel</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Welcome, {user?.username}!</span>
            <button onClick={handleLogout} style={{
              padding: '0.5rem 1rem',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </div>
        </header>
        {/* Admin content goes here */}
      </div>
    );
  }

  // USER DASHBOARD
  if (currentPage === 'user') {
    return (
      <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
        <header style={{
          background: 'white',
          padding: '1rem 2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1>🛒 Customer Portal</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Welcome, {user?.username}!</span>
            <button onClick={handleLogout} style={{
              padding: '0.5rem 1rem',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </div>
        </header>
        {/* User content goes here */}
      </div>
    );
  }

  return null;
};

export default LoginSystem;
