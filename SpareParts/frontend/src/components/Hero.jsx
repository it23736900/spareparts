import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";

// ✅ Import transformation if needed (optional)
import { auto } from "@cloudinary/url-gen/actions/resize";

// ✅ Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: "dnk3tgxht", // Replace with your Cloudinary name
  },
});

const Hero = () => {
  // ✅ Set the correct public ID from Cloudinary Media Library
  const video = cld.video("hero-video_at12yv"); // full ID without file extension

  return (
    <section className="relative h-screen w-full overflow-hidden group">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AdvancedVideo
          cldVid={video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 flex items-center justify-start h-full px-10">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Premium European Vehicle Parts
          </h1>
          <p className="text-lg text-green-300 mb-6">
            Trusted quality from brands like BMW, AUDI, TOYOTA and more.
          </p>
          <a
            href="#brands"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Explore Brands
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;