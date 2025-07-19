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
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import TestimonialCarousel from './components/TestimonialCarousel';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import BackToTopButton from "./components/BackToTopButton";


function HomePage({ onSignInClick, onSignUpClick }) {
  return (
    <>
      <Navbar onSignInClick={onSignInClick} onSignUpClick={onSignUpClick} />
      <Hero />
      <BrandLogos />
      <TestimonialCarousel />
      <BackToTopButton />
      <Footer />
    </>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignupModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true, offset: 100 });
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
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>

      {showLogin && (
        <LoginSystem
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignupModal(true);
          }}
        />
      )}

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
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
