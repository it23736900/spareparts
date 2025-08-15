import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandLogos from "./components/BrandLogos";
import Footer from "./components/Footer";
import LoginSystem from "./components/LoginSystem";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import SignupModal from "./components/SignupModal";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import ProcessFlow from "./components/ProcessFlow";
import TestimonialCarousel from "./components/TestimonialCarousel";
import IntroParagraph from "./components/IntroParagraph";
import LandingScreen from "./components/LandingScreen";
import GetQuotationForm from "./components/GetQuotationForm";
import Profile from "./pages/Profile";
import TrackOrderSearch from "./components/TrackOrderSearch";
import GlobeConnect from "./components/GlobeConnect";

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

      {/* Globe (transparent) + Intro text */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Globe column — no background */}
          <div data-aos="fade-up" className="globe-transparent !bg-transparent" style={{ background: "transparent" }}>
            <div className="w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[520px] xl:h-[560px] !bg-transparent" style={{ background: "transparent" }}>
              <GlobeConnect />
            </div>
          </div>

          {/* Text column */}
          <div
            className="text-soft leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <IntroParagraph />
          </div>
        </div>
      </section>

      <TrackOrderSearch />
      <BrandLogos onInquire={onInquire} />
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
