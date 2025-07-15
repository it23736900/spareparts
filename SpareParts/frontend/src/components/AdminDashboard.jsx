import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('sparePartsUser'));
    if (!savedUser || savedUser.role !== 'admin') {
      navigate('/');
    } else {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sparePartsUser');
    navigate('/');
  };

  const metrics = [
    {
      title: 'Total Products',
      value: '1,320',
      icon: '📦',
    },
    {
      title: 'Registered Users',
      value: '875',
      icon: '👥',
    },
    {
      title: 'Monthly Revenue',
      value: '$42,300',
      icon: '💰',
    },
    {
      title: 'Open Orders',
      value: '56',
      icon: '🛒',
    },
    {
      title: 'Stock Alerts',
      value: '9',
      icon: '⚠️',
    },
    {
      title: 'Support Tickets',
      value: '24',
      icon: '📬',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#0B1C1F] via-[#13272A] to-[#0B1C1F] text-white">
      <Sidebar onLogout={handleLogout} />

      <main className="flex-1 p-6 ml-0 md:ml-72 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 md:text-4xl">
            Welcome, {user?.username}
          </h1>
          <p className="mt-1 text-gray-400">Admin control panel overview</p>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="p-6 transition-all border shadow-md bg-white/5 backdrop-blur-md rounded-xl border-white/10 hover:shadow-yellow-500/20 hover:border-yellow-400"
            >
              <div className="mb-2 text-4xl">{item.icon}</div>
              <p className="text-sm text-gray-400">{item.title}</p>
              <h3 className="text-2xl font-semibold text-white">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* Future chart placeholder */}
        <div className="mt-10 text-sm text-center text-gray-500">
          Charts & reports coming soon...
        </div>

        {/* Footer */}
        <footer className="mt-12 text-sm text-center text-gray-500">
          &copy; 2025 Luxury Auto Parts Admin Dashboard
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;
