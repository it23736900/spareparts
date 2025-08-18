import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandLogos from "./components/BrandLogos";
import Footer from "./components/Footer";
import LoginSystem from "./components/LoginSystem"; // if used elsewhere
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import SignupModal from "./components/SignupModal"; // if used elsewhere
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import ProcessFlow from "./components/ProcessFlow";
import TestimonialCarousel from "./components/TestimonialCarousel";
import IntroParagraph from "./components/IntroParagraph"; // still available if you want it elsewhere
import LandingScreen from "./components/LandingScreen";
import ServicesSection from "./components/ServicesSection";
import GetQuotationForm from "./components/GetQuotationForm";
import Profile from "./pages/Profile";
import TrackOrderSearch from "./components/TrackOrderSearch";
// import GlobeConnect from "./components/GlobeConnect"; // ⛔️ not used anymore
import WorldMapShowcase from "./components/WorldMapShowcase"; // ✅ new map section

import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AnimatePresence, motion } from "framer-motion";

import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

/* ---------------- Home page composition ---------------- */
function HomePage({ onSignInClick, onSignUpClick, onInquire }) {
  return (
    <>
      <Navbar onSignInClick={onSignInClick} onSignUpClick={onSignUpClick} />
      <Hero />

      {/* 🌍 Futuristic interactive world map with right-side copy */}
      <WorldMapShowcase />

      {/* Optional: keep the intro paragraph somewhere else if you still want it */}
      {/* <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IntroParagraph />
      </section> */}

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
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignupModal] = useState(false);
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
    // ✅ Global rich dark-emerald background + soft text
    <div className="relative min-h-screen bg-app text-soft">
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
                  onInquire={openInquiry}
                />
              </motion.div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
      </AnimatePresence>

      <GetQuotationForm
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        prefill={{ brand: selectedBrand }}
      />

      <FloatingWhatsAppButton />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
