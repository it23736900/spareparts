import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('sparePartsUser'));
    if (!savedUser || savedUser.role !== 'user') {
      navigate('/');
    } else {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sparePartsUser');
    navigate('/');
  };

  const actions = [
    {
      title: 'Track My Orders',
      description: 'See the latest status of your spare parts inquiries.',
      icon: '📦',
    },
    {
      title: 'Request a Quotation',
      description: 'Need new parts? Submit a new request here.',
      icon: '📝',
    },
    {
      title: 'Contact Support',
      description: 'Talk to our service team via WhatsApp or Email.',
      icon: '📞',
    },
    {
      title: 'Profile Settings',
      description: 'Update your contact details or change password.',
      icon: '⚙️',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#0B1C1F] via-[#13272A] to-[#0B1C1F] text-white">
      <Sidebar onLogout={handleLogout} />

      <main className="flex-1 p-6 ml-0 md:ml-72 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 md:text-4xl">
            Hello, {user?.username}
          </h1>
          <p className="mt-1 text-gray-400">Welcome to your user dashboard</p>
        </div>

        {/* User Actions */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {actions.map((item, idx) => (
            <div
              key={idx}
              className="p-6 transition-all border shadow-md bg-white/5 backdrop-blur-md rounded-xl border-white/10 hover:shadow-yellow-500/20 hover:border-yellow-400"
            >
              <div className="mb-2 text-4xl">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-sm text-center text-gray-500">
          &copy; 2025 Luxury Auto Parts User Dashboard
        </footer>
      </main>
    </div>
  );
};

export default UserDashboard;
