import React from 'react';
import {
  FaHome,
  FaBoxOpen,
  FaUsers,
  FaChartBar,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <FaHome />, route: '/admin' },
    { label: 'Products', icon: <FaBoxOpen />, route: '/admin/products' },
    { label: 'Users', icon: <FaUsers />, route: '/admin/users' },
    { label: 'Reports', icon: <FaChartBar />, route: '/admin/reports' },
  ];

  return (
    <aside className="w-72 h-screen bg-[#0B1C1F]/80 backdrop-blur-xl shadow-xl fixed top-0 left-0 z-50 flex flex-col">
      {/* Logo / Header */}
      <div className="p-6 text-2xl font-bold tracking-wide text-yellow-400 uppercase">
        Luxury Admin
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5 mt-4 space-y-4">
        {navItems.map(({ label, icon, route }) => {
          const isActive = location.pathname === route;
          return (
            <button
              key={label}
              onClick={() => navigate(route)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 text-left shadow-sm
                ${
                  isActive
                    ? 'bg-yellow-400 text-black font-semibold'
                    : 'bg-white/5 hover:bg-white/10 text-white'
                }`}
            >
              <span className="text-xl">{icon}</span>
              <span className="tracking-wide text-md">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Premium Glassy Logout */}
      <div className="p-5 mt-auto">
        <button
          onClick={onLogout}
          className="flex items-center w-full gap-4 px-5 py-4 text-left text-white transition-all duration-200 shadow-md rounded-2xl bg-white/5 hover:bg-red-500/80 backdrop-blur-lg"
        >
          <FaSignOutAlt className="text-lg opacity-90" />
          <span className="tracking-wide text-md">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
