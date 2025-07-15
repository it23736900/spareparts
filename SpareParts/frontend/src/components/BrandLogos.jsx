import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({
  cloud: { cloudName: "dnk3tgxht" },
});

const brands = [
  {
    title: "Range Rover",
    imageId: "range_rover_logo",
    description:
      "Built for both rugged performance and refined luxury, Range Rover represents the very best of British automotive excellence. We supply Range Rover parts for SUVs, directly imported from the UK.",
  },
  {
    title: "BMW",
    imageId: "BMW_if2qdm",
    description:
      "Synonymous with precision German engineering and driving pleasure, BMW offers a perfect blend of sportiness and luxury. We supply genuine used BMW spare parts, imported from the UK.",
  },
  {
    title: "Mercedes-Benz",
    imageId: "mercedes_logo",
    description:
      "Celebrated worldwide for luxury and innovation, Mercedes‑Benz defines automotive excellence. We import authentic spare parts from the UK.",
  },
  {
    title: "Audi",
    imageId: "audi_logo",
    description:
      "With modern design and advanced technology, Audi stands for progressive German engineering. We help maintain that standard by importing Audi spares directly.",
  },
  {
    title: "Volvo",
    imageId: "volvo_logo",
    description:
      "Renowned for its Scandinavian safety, comfort, and reliability, Volvo vehicles are built to protect. We source used Volvo spare parts directly from the UK, keeping your car safe and road‑ready.",
  },
  {
    title: "Volkswagen",
    imageId: "vw_kxbbn3",
    description:
      "Combining timeless design with everyday practicality, Volkswagen is a symbol of German reliability. We import authentic Volkswagen spares from the UK, supporting smooth and dependable driving.",
  },
  {
    title: "Porsche",
    imageId: "porsche_logo",
    description:
      "Blending racing heritage with luxury, Porsche creates truly thrilling driving experiences. We help keep these high performance vehicles in peak condition with used Porsche spare parts directly sourced from the UK.",
  },
  {
    title: "MG",
    imageId: "mg_logo",
    description:
      "A British classic reborn with contemporary style, MG vehicles offer charm and affordability. We import used MG spares directly from the UK, supporting reliable maintenance and repairs.",
  },
  {
    title: "Ford",
    imageId: "ford_logo",
    description:
      "Known for versatility and durability, Ford's include cars, SUVs, and pickup trucks. We supply authentic Ford spare parts imported straight from trusted UK partners.",
  },
  {
    title: "Jaguar",
    imageId: "jaguar_logo",
    description:
      "Combining British elegance with powerful performance, Jaguar creates distinctive luxury vehicles. We import Jaguar spare parts from the UK to keep them running flawlessly.",
  },
  {
    title: "Renault",
    imageId: "renault_logo",
    description:
      "A trusted European brand known for efficiency and style, Renault makes cars that suit city and family life alike. We import Renault spare parts from the UK for quality maintenance.",
  },
  {
    title: "Peugeot",
    imageId: "peugeot_logo",
    description:
      "With French flair and comfort, Peugeot vehicles bring European sophistication to everyday driving. We help keep them in top shape with Peugeot spare parts imported directly from the UK.",
  },
  {
    title: "Mini Cooper",
    imageId: "mini_logo",
    description:
      "Iconic, compact, and full of character, Mini Cooper remains a symbol of British design and fun driving. We import used Mini Cooper spare parts directly from the UK, keeping your Mini as original as ever.",
  },
];

const BrandLogos = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="bg-[#0B1C1F] py-20 px-4 text-white font-poppins min-h-screen">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Our Supportive Brands
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {brands.map((brand, index) => {
          const img = cld
            .image(brand.imageId)
            .format("auto")
            .quality("auto")
            .resize(auto().width(600));

          const isFlipped = hoveredIndex === index;

          return (
            <div
              key={index}
              className="relative w-full h-[400px] cursor-pointer"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="absolute w-full h-full transition-transform duration-700"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div
                  className="absolute w-full h-full bg-[#1B2A2F] rounded-2xl flex flex-col items-center justify-center p-6"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  <AdvancedImage
                    cldImg={img}
                    className="w-28 h-28 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    {brand.title}
                  </h3>
                </div>

                {/* Back */}
                <div
                  className="absolute w-full h-full bg-[#102024] rounded-2xl flex items-center justify-center p-6 text-sm text-center leading-relaxed text-white"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {brand.description}
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
