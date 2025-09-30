// src/components/LandingScreen.jsx
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

// Cloudinary setup for Start Engine image
const cld = new Cloudinary({ cloud: { cloudName: "dznt9s0j8" } });
const engineStartImg = cld.image("24_auqdzg").format("auto").quality("auto");

const LandingScreen = ({ onStart, showSkip = true }) => {
  const [showSplash, setShowSplash] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const saved = localStorage.getItem("engineStartedAt");

    if (!saved) {
      setShowSplash(true); // first visit → show splash
    } else {
      const savedTime = parseInt(saved, 10);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;

      if (Date.now() - savedTime > sevenDays) {
        setShowSplash(true); // show again if > 7 days
      } else {
        setShowSplash(false); // skip if within 7 days
      }
    }
  }, []);

  const finish = useCallback(() => {
    localStorage.setItem("engineStartedAt", String(Date.now()));
    localStorage.setItem("heroCanPlay", "true"); // unlock autoplay
    setShowSplash(false);

    // optional animation delay
    const delay = prefersReducedMotion ? 200 : 400;
    const t = setTimeout(() => onStart?.(), delay);
    return () => clearTimeout(t);
  }, [onStart, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Start Button */}
          <motion.button
            type="button"
            onClick={finish}
            className="relative cursor-pointer outline-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <span
              className="absolute inset-0 -z-10 rounded-full blur-md"
              style={{
                background:
                  "radial-gradient(circle, rgba(16,94,66,0.55), transparent 70%)",
                boxShadow: "0 0 36px rgba(16,94,66,0.55)",
              }}
            />
            <AdvancedImage
              cldImg={engineStartImg}
              alt="Start Engine"
              className="w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-2xl"
            />
          </motion.button>

          {/* Label */}
          <p className="mt-6 text-[#D4AF37] font-bold text-xl sm:text-2xl lg:text-3xl animate-pulse">
            Click to Start Engine
          </p>

          {/* Skip Button */}
          {showSkip && (
            <button
              type="button"
              onClick={finish}
              className="absolute bottom-6 right-6 text-sm sm:text-base px-5 py-3 rounded-full bg-emerald-900/80 text-white border border-emerald-500/30 shadow-lg hover:bg-emerald-800 transition"
            >
              Skip
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingScreen;
