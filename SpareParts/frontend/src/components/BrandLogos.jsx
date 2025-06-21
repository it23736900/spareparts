import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, AdvancedVideo } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

// ✅ Setup Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: "dnk3tgxht", // ✅ Your Cloudinary cloud name
  },
});

// ✅ Brand list
const cars = [
  {
    title: "Toyota",
    subtitle: "LEGENDARY SPEED & STYLE",
    imageId: "toyota_ubgl47", // ✅ Make sure this matches Cloudinary public ID
    videoId: "hero-video_at12yv",
    link: "#",
  },
  {
    title: "Benz",
    subtitle: "FACETS OF PERFORMANCE",
    imageId: "audi_q8sr4p",
    videoId: "hero-video_at12yv",
    link: "#",
  },
  {
    title: "BMW",
    subtitle: "LEGENDARY SPEED & STYLE",
    imageId: "BMW_if2qdm",
    videoId: "hero-video_at12yv",
    link: "#",
  },
  {
    title: "Nissan",
    subtitle: "FACETS OF PERFORMANCE",
    imageId: "nissan_e2poou",
    videoId: "hero-video_at12yv",
    link: "#",
  },
  {
    title: "Volkswagen",
    subtitle: "GERMAN ENGINEERING",
    imageId: "vw_kxbbn3",
    videoId: "hero-video_at12yv",
    link: "#",
  },
  {
    title: "Mazda",
    subtitle: "PURE DESIGN",
    imageId: "mazda_tpuka9",
    videoId: "hero-video_at12yv",
    link: "#",
  },
];

const BrandLogos = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="bg-[#1B2A2F] py-20 px-6 text-white min-h-screen font-poppins">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Our Supportive Brands
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {cars.map((car, index) => {
          const img = cld
            .image(car.imageId)
            .format("auto")
            .quality("auto")
            .resize(auto().width(800));

          const vid = cld
            .video(car.videoId)
            .format("auto")
            .quality("auto");

          return (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {hoveredCard === index ? (
                <AdvancedVideo
                  cldVid={vid}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
              ) : (
                <AdvancedImage
                  cldImg={img}
                  className="w-full h-[500px] object-cover"
                />
              )}

              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between text-center z-10 p-6">
                <div>
                  <h3 className="text-3xl font-bold tracking-wide">
                    {car.title}
                  </h3>
                </div>
                <div>
                  <p className="text-xs tracking-wider text-white/80 uppercase mb-2">
                    {car.subtitle}
                  </p>
                  <a
                    href={car.link}
                    className="text-sm inline-block border-b border-white hover:text-[#1B2A2F] hover:border-[#1B2A2F] transition duration-300"
                  >
                    LEARN MORE
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BrandLogos;
