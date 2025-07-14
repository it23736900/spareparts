import React from 'react';

const AdminDashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">🔧 Admin Control Panel</h1>
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
          <h2 className="text-lg font-bold mb-2">📦 Manage Products</h2>
          <p>Add, edit, or delete spare parts</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-2">👥 Manage Users</h2>
          <p>View or manage customer accounts</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-2">📊 View Reports</h2>
          <p>Sales reports & analytics</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-2">🛒 Manage Orders</h2>
          <p>Handle customer orders</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
