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

    if (!saved) {
      // First visit ever → show splash
      setShowSplash(true);
    } else {
      const savedTime = parseInt(saved, 10);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - savedTime > sevenDays) {
        // More than 7 days passed → show splash again
        setShowSplash(true);
      } else {
        // Within 7 days → skip splash
        setShowSplash(false);
      }
    }
  }, []);

  const finish = useCallback(() => {
    // Save timestamp of when user clicked Start
    localStorage.setItem("engineStartedAt", String(Date.now()));
    localStorage.setItem("heroCanPlay", "true"); // ✅ Allow autoplay after Start/Skip
    setShowSplash(false);

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
            initial={{ scale: 0.8, opacity: 0 }}   // starts small + invisible
            animate={{ scale: 1, opacity: 1 }}     // grows to full size
            exit={{ scale: 1.2, opacity: 0 }}      //  expands + fades out on exit
            transition={{ duration: 0.6, ease: "easeInOut" }} // smooth timing
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
              className="w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-2xl"
            />
          </motion.button>

          <p className="mt-6 text-[#D4AF37] font-bold text-base sm:text-lg animate-pulse">
            Click to Start Engine
          </p>

          {showSkip && (
            <button
              type="button"
              onClick={finish}
              className="absolute bottom-6 right-6 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-emerald-900/70 text-white border border-emerald-500/30 shadow-lg"
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
