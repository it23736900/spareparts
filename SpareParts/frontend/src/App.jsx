import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandLogos from './components/BrandLogos';
import Footer from './components/Footer';
import LoginSystem from './components/LoginSystem';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import SignupModal from './components/SignupModal';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




// ✅ HomePage with modal triggers
function HomePage({ onSignInClick, onSignUpClick }) {
  return (
    <>
      <Navbar
        onSignInClick={onSignInClick}
        onSignUpClick={onSignUpClick}
      />
      <Hero />
      <BrandLogos />
      <Footer />
    </>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignupModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
        <Route
          path="/"
          element={
            <HomePage
              onSignInClick={() => setShowLogin(true)}
              onSignUpClick={() => setShowSignupModal(true)}
            />
          }
        />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>

      {/* ✅ Login Modal */}
      {showLogin && (
        <LoginSystem
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignupModal(true);
          }}
        />
      )}

      {/* ✅ Signup Modal */}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
    
  );<ToastContainer position="top-center" autoClose={3000} />

}

export default App;
