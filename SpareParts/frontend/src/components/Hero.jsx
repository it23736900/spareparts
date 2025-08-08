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

          {/* 🏷️ Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Premium Used<br />Vehicle Parts
          </h1>

          {/* 📦 Subheading */}
          <p className="text-lg text-green-300">
            Fast, Reliable Island Wide Delivery.
          </p>

          {/* 🔘 CTA */}
          <a
            href="#brands"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg inline-block"
          >
            Explore Brands
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
