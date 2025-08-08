import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

// Cloudinary Setup
const cld = new Cloudinary({
  cloud: { cloudName: "dnk3tgxht" },
});
const engineStartImg = cld.image("startengine_j1ahyv").format("auto").quality("auto");

const LandingScreen = ({ onStart }) => {
  const [clicked, setClicked] = useState(false);

  const handleStart = () => {
    setClicked(true);
    setTimeout(() => {
      onStart();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] backdrop-blur-2xl bg-black/40 flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: clicked ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          onClick={handleStart}
          initial={{ scale: 1 }}
          animate={clicked ? { scale: 20, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="cursor-pointer"
        >
          <AdvancedImage
            cldImg={engineStartImg}
            alt="Start Engine"
            className="w-28 h-28 object-contain drop-shadow-xl"
          />
        </motion.div>

        {!clicked && (
          <p className="mt-6 text-yellow-300 font-bold text-lg animate-pulse">
            Click to Start Engine
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingScreen;

