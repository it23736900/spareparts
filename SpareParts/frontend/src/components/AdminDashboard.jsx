import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('sparePartsUser'));
    if (!savedUser || savedUser.role !== 'admin') {
      navigate('/'); // redirect if not admin or not logged in
    } else {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sparePartsUser');
    navigate('/');
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">🔧 Admin Control Panel</h1>
        <div className="flex items-center gap-3">
          <span>Welcome, {user?.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Replace with actual admin content */}
      <div className="grid gap-4">
        <div className="p-4 bg-white text-black rounded shadow">
          📦 Manage Products
        </div>
        <div className="p-4 bg-white text-black rounded shadow">
          📊 View Inventory
        </div>
        <div className="p-4 bg-white text-black rounded shadow">
          👤 Manage Users
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
