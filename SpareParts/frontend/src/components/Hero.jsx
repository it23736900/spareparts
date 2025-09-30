// src/components/Hero.jsx
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";

// =============================
// Cloudinary Setup
// =============================
const cld = new Cloudinary({ cloud: { cloudName: "dznt9s0j8" } });
const video = cld
  .video("0829_6_adqkzz")
  .delivery(format("auto"))
  .delivery(quality("auto:eco"));

const Hero = forwardRef((props, ref) => {
  const videoRef = useRef(null);

  // expose method for parent (App.jsx) to control video
  useImperativeHandle(ref, () => ({
    playVideo: () => {
      const vid = videoRef.current?.videoRef?.current;
      if (vid) {
        vid.play().catch(() => {
          console.warn("Video play blocked until user interacts");
        });
      }
    },
  }));

  useEffect(() => {
    const adv = videoRef.current;
    const vid = adv?.videoRef?.current;
    if (!vid) return;

    const loopStart = 9; // seconds
    const loopEnd = 29; // seconds
    let rafId;

    const checkLoop = () => {
      if (vid.currentTime >= loopEnd - 0.05) {
        vid.currentTime = loopStart;
        vid.play().catch(() => {});
      }
      rafId = requestAnimationFrame(checkLoop);
    };

    const startLoop = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkLoop);
    };
    const stopLoop = () => cancelAnimationFrame(rafId);

    vid.addEventListener("play", startLoop);
    vid.addEventListener("pause", stopLoop);
    vid.addEventListener("ended", stopLoop);

    vid.muted = true;
    vid.playsInline = true;

    // ✅ autoplay if already allowed before
    if (localStorage.getItem("heroCanPlay") === "true") {
      vid.play().catch(() => {});
    }

    return () => {
      stopLoop();
      vid.removeEventListener("play", startLoop);
      vid.removeEventListener("pause", stopLoop);
      vid.removeEventListener("ended", stopLoop);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden group pt-[80px] md:pt-[90px]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AdvancedVideo
          ref={videoRef}
          cldVid={video}
          muted
          playsInline
          loop={false} // manual loop
          preload="auto"
          poster="auto"
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0B1C1F]/80" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-start h-full px-6 sm:px-10">
        <div className="max-w-xl space-y-6">
          {/* Heading */}
          <h1 className="font-bold leading-[1.05] tracking-tight text-left">
            <span className="block text-[clamp(2rem,8vw,5.5rem)] text-white">
              Premium&nbsp;Used
            </span>
            <span className="block text-[clamp(1.6rem,6vw,3.75rem)] text-white">
              Vehicle Parts
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg font-medium text-[#FFD95A]/90">
            Fast, Reliable Island-Wide Delivery
          </p>

          {/* CTA Button */}
          <button
            onClick={() =>
              document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" })
            }
            className="relative inline-block px-8 py-4 rounded-xl font-semibold text-[clamp(0.95rem,2.5vw,1.1rem)] transition-all duration-300 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, rgba(6,12,10,0.92) 0%, rgba(10,22,18,0.95) 50%, rgba(6,12,10,0.92) 100%)",
              border: "2px solid #066F49",
              color: "#FFD95A",
              boxShadow: "0 0 14px rgba(6,111,73,0.45)",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            Explore Brands
          </button>
        </div>
      </div>
    </section>
  );
});

export default Hero;
