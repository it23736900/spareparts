import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

// Cloudinary
const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const engineStartImg = cld.image("startengine_j1ahyv").format("auto").quality("auto");

/**
 * LandingScreen
 * Props:
 *  - onStart: () => void        // required, called when splash finishes
 *  - autoDismissMs?: number     // optional, auto close after ms (e.g., 4000)
 *  - showSkip?: boolean         // optional, default true
 */
const LandingScreen = ({ onStart, autoDismissMs, showSkip = true }) => {
  const [clicked, setClicked] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const finish = useCallback(() => {
    if (clicked) return;
    setClicked(true);
    // keep timing short if motion reduced
    const delay = prefersReducedMotion ? 300 : 1000;
    const t = setTimeout(() => onStart?.(), delay);
    return () => clearTimeout(t);
  }, [clicked, onStart, prefersReducedMotion]);

  // Optional auto-dismiss (e.g., if user doesn't click)
  React.useEffect(() => {
    if (!autoDismissMs) return;
    const id = setTimeout(() => finish(), autoDismissMs);
    return () => clearTimeout(id);
  }, [autoDismissMs, finish]);

  // Keyboard access
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      finish();
    }
  };

  return (
    <AnimatePresence>
      {!clicked && (
        <motion.div
          className="
            fixed inset-0 z-[9999] flex flex-col items-center justify-center
            bg-black/60 backdrop-blur-xl
          "
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-modal="true"
          role="dialog"
          aria-label="Intro screen"
        >
          {/* Dark‑green vignette */}
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
            onKeyDown={onKey}
            className="relative cursor-pointer outline-none"
            initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
            animate={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { scale: 20, opacity: 0, transition: { duration: 1 } }
            }
            aria-label="Start Engine"
          >
            {/* glow */}
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

          {/* Prompt */}
          <p className="mt-6 text-[#D4AF37] font-bold text-base sm:text-lg animate-pulse select-none">
            Click to Start Engine
          </p>

          {/* Skip */}
          {showSkip && (
            <button
              type="button"
              onClick={finish}
              className="
                absolute bottom-6 right-6 text-xs sm:text-sm
                px-3 py-1.5 rounded-full
                bg-emerald-900/70 hover:bg-emerald-900/85
                border border-emerald-500/30 text-white
                shadow-[0_0_18px_rgba(16,94,66,0.45)]
                transition
              "
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
