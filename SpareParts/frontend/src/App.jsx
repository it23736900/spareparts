// src/App.jsx
import { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandLogos from "./components/BrandLogos";
import Footer from "./components/Footer";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import ProcessFlow from "./components/ProcessFlow";
import TestimonialCarousel from "./components/TestimonialCarousel";
import LandingScreen from "./components/LandingScreen";
import ServicesSection from "./components/ServicesSection";
import GetQuotationForm from "./components/GetQuotationForm";
import Profile from "./pages/Profile";
import TrackOrderSearch from "./components/TrackOrderSearch";
import WorldMapShowcase from "./components/WorldMapShowcase";

import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AnimatePresence, motion } from "framer-motion";

import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./routes/RequireAuth";

/* ---------------- Home page composition ---------------- */
function HomePage({ onInquire, heroRef }) {
  return (
    <>
      <Navbar />
      <Hero ref={heroRef} />
      <WorldMapShowcase />
      <TrackOrderSearch />
      <BrandLogos onInquire={onInquire} />
      <ServicesSection onInquire={onInquire} />
      <ProcessFlow />
      <TestimonialCarousel />
      <Footer onInquire={() => onInquire("")} />
    </>
  );
}

/* ---------------- App root ---------------- */
function App() {
  const heroRef = useRef();
  const location = useLocation();

  const [started, setStarted] = useState(() => {
    const saved = localStorage.getItem("engineStartedAt");
    if (!saved) return false;

    const savedTime = parseInt(saved, 10);
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    // only auto-start if still within 7 days
    return Date.now() - savedTime <= sevenDays;
  });

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1200, once: true, offset: 100 });
  }, []);

  const openInquiry = (brand = "") => {
    setSelectedBrand(brand);
    setIsInquiryOpen(true);
  };

  const handleStart = () => {
    // save timestamp
    localStorage.setItem("engineStartedAt", String(Date.now()));
    localStorage.setItem("heroCanPlay", "true");

    setStarted(true);

    // force hero video to play
    heroRef.current?.playVideo?.();
  };

  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-app text-soft">
        {/* Splash overlay until started */}
        {!started && <LandingScreen onStart={handleStart} />}

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
                  <HomePage heroRef={heroRef} onInquire={openInquiry} />
                </motion.div>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            {/* ✅ Admin login (public) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ✅ Protected admin routes */}
            <Route element={<RequireAuth />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<UserDashboard />} />

            {/* Fallback → home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>

        {/* Inquiry modal */}
        <GetQuotationForm
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
          prefill={{ brand: selectedBrand }}
        />

        <FloatingWhatsAppButton />
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </AuthProvider>
  );
}

export default App;
