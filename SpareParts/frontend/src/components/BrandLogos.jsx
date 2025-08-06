import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });

const allBrands = [
  { title: "Range Rover", imageId: "range_rover_logo" },
  { title: "BMW", imageId: "BMW_if2qdm" },
  { title: "Mercedes-Benz", imageId: "mercedes_logo" },
  { title: "Audi", imageId: "audi_logo" },
  { title: "Volvo", imageId: "volvo_logo" },
  { title: "Volkswagen", imageId: "vw_kxbbn3" },
  { title: "Porsche", imageId: "porsche_logo" },
  { title: "MG", imageId: "mg_logo" },
  { title: "Ford", imageId: "ford_logo" },
  { title: "Jaguar", imageId: "jaguar_logo" },
  { title: "Renault", imageId: "renault_logo" },
  { title: "Peugeot", imageId: "peugeot_logo" },
  { title: "Mini Cooper", imageId: "mini_logo" },
];

const BrandMarquee = () => {
  const mid = Math.ceil(allBrands.length / 2);
  const topBrands = allBrands.slice(0, mid);
  const bottomBrands = allBrands.slice(mid);

  const getCloudImage = (imageId) =>
    cld.image(imageId).format("auto").quality("auto").resize(auto().width(300));

  const renderBrandBox = (brand, index, row) => (
    <div
      key={`${row}-${index}`}
      className="w-[280px] h-[280px] bg-[#1B2A2F] rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
    >
      <AdvancedImage
        cldImg={getCloudImage(brand.imageId)}
        className="w-24 h-24 object-contain mb-4"
      />
      <p className="text-lg font-semibold">{brand.title}</p>
    </div>
  );

  // Repeat 3 times to ensure smooth animation
  const repeatedTop = [...topBrands, ...topBrands, ...topBrands];
  const repeatedBottom = [...bottomBrands, ...bottomBrands, ...bottomBrands];

  return (
    <section className="bg-[#0B1C1F] py-20 px-4 text-white font-poppins min-h-[70vh]">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
        Our Supportive Brands
      </h2>

      {/* Top Row */}
      <div className="overflow-hidden">
<div className="flex animate-scrollInline gap-x-6 w-max">
          {repeatedTop.map((brand, index) => renderBrandBox(brand, index, "top"))}
        </div>
      </div>

      <div className="h-10" />

      {/* Bottom Row */}
      <div className="overflow-hidden">
<div className="flex animate-scrollReverse gap-x-6 w-max">
          {repeatedBottom.map((brand, index) => renderBrandBox(brand, index, "bottom"))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
