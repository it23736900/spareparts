import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, AdvancedVideo } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

// Cloudinary config
const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const video = cld.video("0829_6_yqjseg");

const sriLankanFlag = cld
  .image("sri_lanka_elrjw8")
  .format("png")
  .quality("auto:best")
  .resize(auto().width(32));

const ukFlag = cld
  .image("UK_j0lfab")
  .format("png")
  .quality("auto:best")
  .resize(auto().width(32));

const Hero = () => {
  return (
    <section
      className="
        relative w-full h-screen overflow-hidden group
        pt-[80px] md:pt-[90px]   /* 🔑 offset for navbar height */
      "
    >
      {/* 🔲 Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AdvancedVideo
          cldVid={video}
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* 🔲 Foreground Content */}
      <div className="relative z-10 flex items-center justify-start h-full px-6 sm:px-10">
        <div className="max-w-xl space-y-6">
          {/* 🇱🇰🇬🇧 Flags Row */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-6">
              <AdvancedImage
                cldImg={sriLankanFlag}
                className="object-cover w-full h-full rounded-sm"
                alt="Sri Lanka"
              />
            </div>
            <div className="w-8 h-6">
              <AdvancedImage
                cldImg={ukFlag}
                className="object-cover w-full h-full rounded-sm"
                alt="UK"
              />
            </div>
          </div>

          {/* 🏷️ Heading */}
          <h1 className="font-bold text-white leading-[1.05] tracking-tight">
            <span className="block whitespace-nowrap text-[clamp(2rem,8vw,5.5rem)]">
              Premium&nbsp;Used
            </span>
            <span className="block text-[clamp(1.6rem,6vw,3.75rem)] text-white/90">
              Vehicle Parts
            </span>
          </h1>

          {/* 📦 Subheading */}
          <p className="text-lg text-emerald-300">
            Fast, Reliable Island Wide Delivery.
          </p>

          {/* 🔘 CTA Button */}
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
    background: `
      linear-gradient(
        135deg,
        rgba(5,15,12,0.98) 0%,
        rgba(12,36,28,0.96) 45%,
        rgba(5,15,12,0.98) 100%
      )
    `,
    border: "2px solid #17A77A",     // Emerald border
    color: "#17A77A",                 // Emerald text
    boxShadow: "0 0 16px rgba(23,167,122,0.35)", // Emerald glow
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = "0 0 28px rgba(23,167,122,0.65)";
    e.currentTarget.style.background =
      "linear-gradient(135deg, rgba(12,36,28,0.96) 0%, rgba(5,15,12,0.98) 100%)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = "0 0 16px rgba(23,167,122,0.35)";
    e.currentTarget.style.background =
      "linear-gradient(135deg, rgba(5,15,12,0.98) 0%, rgba(12,36,28,0.96) 45%, rgba(5,15,12,0.98) 100%)";
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
