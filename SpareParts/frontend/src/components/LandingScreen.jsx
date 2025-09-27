import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

// Cloudinary
const cld = new Cloudinary({ cloud: { cloudName: "dznt9s0j8" } });
const engineStartImg = cld.image("24_auqdzg").format("auto").quality("auto");

const LandingScreen = ({ onStart, showSkip = true }) => {
  const [clicked, setClicked] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Prevent scrolling while screen is active
  useEffect(() => {
    if (!clicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [clicked]);

  const finish = useCallback(() => {
    if (clicked) return;
    setClicked(true);

    // Save timestamp
    const now = Date.now();
    localStorage.setItem("engineStartedAt", String(now));

    const delay = prefersReducedMotion ? 300 : 1000;
    const t = setTimeout(() => onStart?.(), delay);
    return () => clearTimeout(t);
  }, [clicked, onStart, prefersReducedMotion]);

  // Check localStorage to skip showing again within 5 days
  useEffect(() => {
    const saved = localStorage.getItem("engineStartedAt");
    if (saved) {
      const savedTime = parseInt(saved, 10);
      const fiveDays = 5 * 24 * 60 * 60 * 1000; // 5 days in ms
      if (Date.now() - savedTime < fiveDays) {
        setClicked(true);
      }
    }
  }, []);

  return (
    <AnimatePresence>
      {!clicked && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Dark overlay */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 40% at 50% 40%, rgba(16,94,66,0.35), transparent 70%)",
              filter: "blur(28px)",
            }}
          />

          {/* Start button */}
          <motion.button
            type="button"
            onClick={finish}
            className="relative cursor-pointer outline-none"
            exit={{ scale: 20, opacity: 0, transition: { duration: 1 } }}
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
              className="w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-xl"
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
