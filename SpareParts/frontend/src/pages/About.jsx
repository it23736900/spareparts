// src/pages/About.jsx
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { FaTimes } from "react-icons/fa";

export default function About() {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  // ✅ Cloudinary setup
  const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
  const clImg = (publicId) =>
    cld.image(publicId).format("auto").quality("auto").resize(auto().width(1200));

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate("/");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  // ✅ Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ✅ Neon green divider
  const GreenDivider = () => (
    <div
      className="h-[2px] w-40 mx-auto mt-1 mb-3 rounded-full"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(0,255,179,0.9), transparent)",
      }}
    />
  );

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 bg-gradient-to-br from-[#051111] via-[#0B1C1F] to-[#050A0A] 
                 backdrop-blur-sm flex items-center justify-center z-50 
                 px-3 sm:px-6 py-6 sm:py-10"
    >
      <div
        ref={modalRef}
        className="relative text-white rounded-2xl 
                   bg-[#051111]/80 border border-[#00ffb3]/30 backdrop-blur-2xl
                   shadow-[0_0_25px_rgba(0,255,179,0.08),inset_0_0_10px_rgba(255,255,255,0.03)]
                   w-full max-w-[95%] sm:max-w-[90%] md:max-w-4xl lg:max-w-7xl 
                   h-[94vh] overflow-y-auto
                   mx-auto
                   p-6 sm:p-10 lg:p-16 space-y-14 scroll-smooth"
        data-aos="zoom-in"
      >
        {/* Close button (safe-area aware) */}
        <button
          onClick={handleClose}
          className="absolute z-50 text-emerald-400 hover:text-emerald-300 
                     transition-transform transform hover:scale-110 
                     bg-black/40 rounded-full p-2"
          style={{
            top: "calc(env(safe-area-inset-top, 0px) + 1rem)",
            right: "1rem",
          }}
        >
          <FaTimes size={26} />
        </button>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-center">
          <span className="text-white">About </span>
          <span className="text-[#00ffb3]">Us</span>
        </h1>
        <GreenDivider />

        {/* Company Background */}
        <section className="space-y-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#00ffb3]">
            Company Background
          </h2>
          <GreenDivider />

          {/* Top Image */}
          <div>
            <AdvancedImage
              cldImg={clImg("faaff8ea-60e1-4102-bae8-39ef855d514b")}
              plugins={[responsive(), placeholder()]}
              className="rounded-xl shadow-lg w-full object-cover 
                         max-h-[300px] sm:max-h-[400px] lg:max-h-[520px]"
            />
            <p className="text-xs sm:text-sm lg:text-base text-gray-400 mt-2 italic text-center">
              Our UK breaker’s yard and warehouse operations
            </p>
          </div>

          <p className="text-gray-300 leading-relaxed text-base sm:text-lg lg:text-xl text-left">
            Founded in 2000, our group has grown into a diversified leader in Sri Lanka’s business landscape. 
            We proudly manage three successful companies:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300 text-base sm:text-lg lg:text-xl text-left">
            <li>A market leader in packaging materials and machinery across Sri Lanka</li>
            <li>An export company supplying premium Ceylon tea to over 10 countries worldwide</li>
            <li>An international business exporting industrial tea bagging machinery to more than 20 countries</li>
          </ul>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg lg:text-xl text-left">
            Building on decades of trusted partnerships and global reach, we launched our newest venture in 2025: 
            a dedicated European used spare parts importing company. As a direct importer, we bring genuine European 
            spare parts carefully sourced from our UK breaker’s yard to Sri Lanka’s automotive market.
          </p>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg lg:text-xl text-left">
            By combining industry expertise, strong UK supplier networks, and a commitment to quality, we ensure 
            Sri Lankan vehicle owners receive authentic, reliable European auto parts with fast island-wide delivery.
          </p>

          {/* ✅ Image grid with Cloudinary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <AdvancedImage
              cldImg={clImg("WhatsApp_Image_2025-09-01_at_15.13.17_zzkhrq")}
              plugins={[responsive(), placeholder()]}
              className="rounded-xl shadow-lg object-cover"
            />
            <AdvancedImage
              cldImg={clImg("WhatsApp_Image_2025-09-01_at_15.13.16_2_blmng2")}
              plugins={[responsive(), placeholder()]}
              className="rounded-xl shadow-lg object-cover"
            />
            <AdvancedImage
              cldImg={clImg("WhatsApp_Image_2025-09-01_at_15.13.15_u8nlib")}
              plugins={[responsive(), placeholder()]}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </section>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 sm:text-sm mt-10">
          EuroTec — Premium European Auto Parts Supplier. Delivering trusted 
          quality and service across Sri Lanka.
        </p>
      </div>
    </div>
  );
}
