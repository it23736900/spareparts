import React from 'react';

const UserDashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">🛒 Customer Portal</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, {user?.username}</span>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-2">🔍 Browse Parts</h2>
          <p>Search and view available spare parts</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-2">🛒 My Cart</h2>
          <p>View and manage your cart</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-2">📋 My Orders</h2>
          <p>Track order status & history</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-2">👤 My Profile</h2>
          <p>Edit your account information</p>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
