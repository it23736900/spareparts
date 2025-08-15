import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, AdvancedVideo } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

// Cloudinary config
const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const video = cld.video("hero-video_at12yv");

const sriLankanFlag = cld.image("sri_lanka_elrjw8")
  .format("png")
  .quality("auto:best")
  .resize(auto().width(32));
const ukFlag = cld.image("UK_j0lfab")
  .format("png")
  .quality("auto:best")
  .resize(auto().width(32));

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden group">
      {/* 🔲 Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AdvancedVideo
          cldVid={video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* 🔲 Foreground Content */}
      <div className="relative z-10 flex items-center justify-start h-full px-10">
        <div className="max-w-xl space-y-6">
          {/* 🇱🇰🇬🇧 Flags Row */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-6">
              <AdvancedImage cldImg={sriLankanFlag} className="w-full h-full object-cover rounded-sm" alt="Sri Lanka" />
            </div>
            <div className="w-8 h-6">
              <AdvancedImage cldImg={ukFlag} className="w-full h-full object-cover rounded-sm" alt="UK" />
            </div>
          </div>

          {/* 🏷️ Heading (Premium Used බහුලව) */}
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

          {/* 🔘 CTA */}
          <a
            href="#brands"
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-8 py-4 rounded-xl inline-block shadow-lg shadow-emerald-600/25 transition-all duration-300 transform hover:scale-105"
          >
            Explore Brands
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
