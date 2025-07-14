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
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">🛒 Customer Portal</h1>
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

      {/* Dashboard cards here */}
    </div>
  );
};

export default UserDashboard;
