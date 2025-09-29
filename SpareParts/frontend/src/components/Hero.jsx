import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";

// Cloudinary config
const cld = new Cloudinary({ cloud: { cloudName: "dznt9s0j8" } });

// Optimized Video
const video = cld
  .video("0829_6_adqkzz")
  .delivery(format("auto"))
  .delivery(quality("auto"));

const Hero = () => {
  return (
    <section
      className="
        relative w-full h-screen overflow-hidden group
        pt-[80px] md:pt-[90px]
      "
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AdvancedVideo
          cldVid={video}
          autoPlay
          muted
          loop
          playsInline
          poster="auto"
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0B1C1F]/80" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-start h-full px-6 sm:px-10">
        <div className="max-w-xl space-y-6">
          {/* Heading */}
          <h1 className="font-extrabold leading-[1.05] tracking-tight text-left">
            <span
              className="block whitespace-nowrap text-[clamp(2rem,8vw,5.5rem)] text-white"
              style={{
                WebkitTextFillColor: "#ffffff", // Safari fix
                WebkitTextStroke: "0px transparent", // disable stroke transparency
              }}
            >
              Premium&nbsp;Used
            </span>

            <span
              className="block text-[clamp(1.6rem,6vw,3.75rem)] text-white"
              style={{
                WebkitTextFillColor: "#ffffff",
                WebkitTextStroke: "0px transparent",
              }}
            >
              Vehicle Parts
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg font-medium text-[#FFD95A]/90 drop-shadow-sm">
            Fast, Reliable Island-Wide Delivery
          </p>

          {/* CTA Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("brands")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="
              relative inline-block px-8 py-4 rounded-xl font-semibold
              text-[clamp(0.95rem,2.5vw,1.1rem)]
              transition-all duration-300
              hover:scale-105
            "
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
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 24px rgba(6,111,73,0.7), 0 0 18px rgba(227,200,92,0.5)";
              e.currentTarget.style.color = "#FFF6D1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 14px rgba(6,111,73,0.45)";
              e.currentTarget.style.color = "#FFD95A";
            }}
          >
            Explore Brands
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;