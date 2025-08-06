import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

// Cloudinary config
const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });

const allBrands = [
  {
    title: "Range Rover",
    imageId: "range_rover_logo",
    description: "Built for both rugged performance and refined luxury, Range Rover represents the very best of British automotive excellence. To keep these powerful machines running at their peak, we supply Range Rover parts for SUV’s, directly imported from the UK.",
  },
  {
    title: "BMW",
    imageId: "BMW_if2qdm",
    description: "Synonymous with precision German engineering and driving pleasure, BMW offers a perfect blend of sportiness and luxury. We supply genuine used BMW spare parts, directly imported from the UK.",
  },
  {
    title: "Mercedes-Benz",
    imageId: "mercedes_logo",
    description: "Celebrated worldwide for its luxury, innovation, and safety, Mercedes‑Benz defines automotive excellence. We import authentic Mercedes‑Benz European spare parts from the UK.",
  },
  {
    title: "Audi",
    imageId: "audi_logo",
    description: "With modern design and advanced technology, Audi stands for progressive German engineering. We help maintain that standard by importing Audi spares directly.",
  },
  {
    title: "Volvo",
    imageId: "volvo_logo",
    description: "Renowned for its Scandinavian safety, comfort, and reliability, Volvo vehicles are built to protect. We source used Volvo spare parts directly from the UK.",
  },
  {
    title: "Volkswagen",
    imageId: "vw_kxbbn3",
    description: "Combining timeless design with everyday practicality, Volkswagen is a symbol of German reliability. We import authentic Volkswagen spares from the UK.",
  },
  {
    title: "Porsche",
    imageId: "porsche_logo",
    description: "Blending racing heritage with luxury, Porsche creates truly thrilling driving experiences. We supply used Porsche spare parts directly sourced from the UK.",
  },
  {
    title: "MG",
    imageId: "mg_logo",
    description: "A British classic reborn with contemporary style, MG vehicles offer charm and affordability. We import used MG spares directly from the UK.",
  },
  {
    title: "Ford",
    imageId: "ford_logo",
    description: "Known for versatility and durability, Ford’s include cars, SUVs, and pickup trucks. We supply authentic Ford spare parts from trusted UK partners.",
  },
  {
    title: "Jaguar",
    imageId: "jaguar_logo",
    description: "Combining British elegance with powerful performance, Jaguar creates distinctive luxury vehicles. We import Jaguar spare parts from the UK.",
  },
  {
    title: "Renault",
    imageId: "renault_logo",
    description: "A trusted European brand known for efficiency and style, Renault makes cars that suit city and family life alike. We import Renault spare parts from the UK.",
  },
  {
    title: "Peugeot",
    imageId: "peugeot_logo",
    description: "With French flair and comfort, Peugeot vehicles bring European sophistication to everyday driving. We keep them in top shape with UK-imported parts.",
  },
  {
    title: "Mini Cooper",
    imageId: "mini_logo",
    description: "Iconic, compact, and full of character, Mini Cooper remains a symbol of British design and fun driving. We import used Mini Cooper parts from the UK.",
  },
];

const BrandMarquee = () => {
  const [pausedRow, setPausedRow] = useState(null);

  const mid = Math.ceil(allBrands.length / 2);
  const topBrands = allBrands.slice(0, mid);
  const bottomBrands = allBrands.slice(mid);

  const getCloudImage = (imageId) =>
    cld.image(imageId).format("auto").quality("auto").resize(auto().width(400));

  const handleMouseEnter = (row) => setPausedRow(row);
  const handleMouseLeave = () => setPausedRow(null);

  const renderBrandBox = (brand, index, row) => (
    <div
      key={`${row}-${index}`}
      className="w-[280px] h-[280px] flex-shrink-0 group [perspective:1000px]"
      onMouseEnter={() => handleMouseEnter(row)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Side */}
        <div className="absolute w-full h-full bg-[#1B2A2F] rounded-2xl flex flex-col items-center justify-center [backface-visibility:hidden] p-4">
          <AdvancedImage
            cldImg={getCloudImage(brand.imageId)}
            style={{ width: "150px", height: "150px" }}
            className="object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-xl"
          />
          <p className="text-base font-semibold text-center mt-2">{brand.title}</p>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full bg-[#163035] rounded-2xl flex flex-col justify-center px-4 text-center text-sm leading-snug [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-yellow-400 font-semibold mb-2">{brand.title}</p>
          <p className="text-gray-300 text-xs">{brand.description}</p>
        </div>
      </div>
    </div>
  );

  const repeatedTop = [...topBrands, ...topBrands, ...topBrands];
  const repeatedBottom = [...bottomBrands, ...bottomBrands, ...bottomBrands];

  return (
    <section className="bg-[#0B1C1F] py-20 px-4 text-white font-poppins min-h-[70vh]">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
        Our Supportive Brands
      </h2>

      {/* Top Row */}
      <div className="overflow-hidden">
        <div
          className="flex gap-x-6 w-max animate-scrollInline"
          style={{
            animationPlayState: pausedRow === "top" ? "paused" : "running",
          }}
        >
          {repeatedTop.map((brand, index) =>
            renderBrandBox(brand, index, "top")
          )}
        </div>
      </div>

      <div className="h-10" />

      {/* Bottom Row */}
      <div className="overflow-hidden">
        <div
          className="flex gap-x-6 w-max animate-scrollReverse"
          style={{
            animationPlayState: pausedRow === "bottom" ? "paused" : "running",
          }}
        >
          {repeatedBottom.map((brand, index) =>
            renderBrandBox(brand, index, "bottom")
          )}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
