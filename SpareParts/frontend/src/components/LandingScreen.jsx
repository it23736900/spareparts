import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

// Cloudinary
const cld = new Cloudinary({ cloud: { cloudName: "dznt9s0j8" } });
const engineStartImg = cld.image("24_auqdzg").format("auto").quality("auto");

const LandingScreen = ({ onStart, showSkip = true }) => {
  const [showSplash, setShowSplash] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Runs only once on mount
  useEffect(() => {
    const saved = localStorage.getItem("engineStartedAt");

    let shouldShow = false;
    if (!saved) {
      shouldShow = true;
    } else {
      const savedTime = parseInt(saved, 10);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - savedTime > sevenDays) {
        shouldShow = true;
      }
    }

    setShowSplash(shouldShow);

    // ⏸️ Pause hero video immediately if splash is needed
    if (shouldShow) {
      const heroVideo = document.getElementById("hero-video");
      if (heroVideo) {
        heroVideo.pause();
      }
    }
  }, []);

  // Lock/unlock body scroll
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  const finish = useCallback(() => {
    // Save timestamp
    localStorage.setItem("engineStartedAt", String(Date.now()));
    localStorage.setItem("heroCanPlay", "true");

    setShowSplash(false);

    // ▶️ Resume hero video
    const heroVideo = document.getElementById("hero-video");
    if (heroVideo) {
      heroVideo.play().catch(() => {});
    }

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
          {/* Start button */}
          <motion.button
            type="button"
            onClick={finish}
            className="relative cursor-pointer outline-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
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
              className="w-44 h-44 sm:w-56 sm:h-56 object-contain drop-shadow-2xl"
            />
          </motion.button>

          <p className="mt-6 text-[#D4AF37] font-bold text-xl sm:text-2xl animate-pulse">
            Click to Start Engine
          </p>

          {showSkip && (
            <button
              type="button"
              onClick={finish}
              className="absolute bottom-6 right-6 text-sm sm:text-base px-5 py-3 rounded-full bg-emerald-900/70 text-white border border-emerald-500/30 shadow-lg"
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
