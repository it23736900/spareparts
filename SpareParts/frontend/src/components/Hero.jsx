import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

// ✅ Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: "dnk3tgxht", // Your Cloudinary name
  },
});

const Hero = () => {
  const video = cld.video("hero-video_at12yv"); // Cloudinary video ID

  return (
    <section className="relative h-screen w-full overflow-hidden group">
      {/* 🎥 Background Video */}
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

      {/* ✨ Animated Hero Content */}
      <div className="relative z-10 flex items-center justify-start h-full px-10">
        <div className="max-w-xl">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            Premium Used Vehicle Parts
          </h1>
          <p
            className="text-lg text-green-300 mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            Fast, Reliable Island Wide Delivery.
          </p>
          <a
            href="#brands"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg"
            data-aos="zoom-in"
            data-aos-delay="400"
            data-aos-duration="800"
          >
            Explore Brands
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
