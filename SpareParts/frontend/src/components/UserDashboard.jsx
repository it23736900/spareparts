import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen bg-[#1B2A2F] text-white p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <i className="fas fa-shopping-cart"></i> Customer Portal
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">Welcome, {user?.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <i className="fas fa-search text-blue-500"></i> Browse Parts
          </h2>
          <p className="text-sm text-gray-600">Search and view available spare parts</p>
        </div>

        <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <i className="fas fa-shopping-basket text-green-500"></i> My Cart
          </h2>
          <p className="text-sm text-gray-600">View and manage your cart</p>
        </div>

        <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <i className="fas fa-box text-yellow-500"></i> My Orders
          </h2>
          <p className="text-sm text-gray-600">Track order status & history</p>
        </div>

        <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <i className="fas fa-user text-purple-500"></i> My Profile
          </h2>
          <p className="text-sm text-gray-600">Edit your account information</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
