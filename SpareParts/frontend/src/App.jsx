import { useEffect, useState } from "react";
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
function HomePage({ onInquire, heroPlay }) {
  return (
    <>
      <Navbar />
      <Hero play={heroPlay} />
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
  const [started, setStarted] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1200, once: true, offset: 100 });
  }, []);

  const openInquiry = (brand = "") => {
    setSelectedBrand(brand);
    setIsInquiryOpen(true);
  };

  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-app text-soft">
        {/* Splash overlay until started */}
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
                  <HomePage heroPlay={started} onInquire={openInquiry} />
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
