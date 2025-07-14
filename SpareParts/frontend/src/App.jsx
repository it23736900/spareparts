import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandLogos from './components/BrandLogos';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import LoginSystem from './components/LoginSystem';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

function HomePage({ onSignInClick }) {
  return (
    <>
      <Navbar onSignInClick={onSignInClick} />
      <Hero />
      <BrandLogos />
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100
    });
  }, []);

  return (
    
      <div className="min-h-screen bg-[#1B2A2F] text-white">
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<HomePage onSignInClick={() => setShowLogin(true)} />} />

          {/* Dashboards */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>

        {/* Modal Login shown from homepage */}
        {showLogin && <LoginSystem onClose={() => setShowLogin(false)} />}
      </div>
    
  );
}

export default App;
