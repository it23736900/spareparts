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
import GetQuotationForm from './components/GetQuotationForm';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

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
    <div className="min-h-screen bg-[#1B2A2F] text-white relative">
      {/* ✅ Inquiry Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white text-black p-6 rounded-lg max-w-lg w-full shadow-lg relative mx-4 sm:mx-0">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>
            <GetQuotationForm />
          </div>
        </div>
      )}

      {/* ✅ Routes */}
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
      <FloatingWhatsAppButton />
    </div>
  );
}

export default App;
