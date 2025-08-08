import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

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
import BackToTopButton from './components/BackToTopButton';
import IntroParagraph from './components/IntroParagraph';
import LandingScreen from './components/LandingScreen';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AnimatePresence, motion } from 'framer-motion';

import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

function HomePage({ onSignInClick, onSignUpClick }) {
  return (
    <>
      <Navbar onSignInClick={onSignInClick} onSignUpClick={onSignUpClick} />
      <Hero />
      <IntroParagraph />
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
  const [started, setStarted] = useState(false); // Landing screen state

  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1200, once: true, offset: 100 });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1B2A2F] text-white">
      {/* ✅ Landing screen over background */}
      {!started && <LandingScreen onStart={() => setStarted(true)} />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
              >
                <HomePage
                  onSignInClick={() => setShowLogin(true)}
                  onSignUpClick={() => setShowSignupModal(true)}
                />
              </motion.div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
      </AnimatePresence>

      {/* 🔐 Auth modals */}
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
