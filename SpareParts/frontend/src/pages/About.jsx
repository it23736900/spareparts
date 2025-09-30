// src/pages/About.jsx
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";


export default function About() {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  // ✅ Cloudinary setup
  const cld = new Cloudinary({ cloud: { cloudName: "dznt9s0j8" } });
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

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center px-3 py-6 sm:px-6 sm:py-10 backdrop-blur-sm scroll-smooth"
      style={{
        background: `linear-gradient(135deg, #000000 0%, #000000 70%, #014421 100%)`,
      }}
    >
      <div
        ref={modalRef}
        className="relative text-white rounded-2xl 
                   bg-black/50 border border-[#014421] backdrop-blur-2xl
                   shadow-[0_0_30px_rgba(1,68,33,0.4),inset_0_0_10px_rgba(255,255,255,0.03)]
                   w-full max-w-6xl h-[80vh] overflow-y-auto px-4 py-10 sm:px-8 sm:py-12 lg:px-16 lg:py-20"
        data-aos="zoom-in"
      >
        {/* Close button */}
        
<button
  onClick={handleClose}
  className="sticky top-3 right-3 ml-auto z-50
             text-[#00ffb3] hover:text-white
             transition-transform transform hover:scale-110
             bg-black/40 rounded-full w-8 h-8 flex items-center justify-center
             shadow-[0_0_10px_rgba(0,255,179,0.6)]"
  style={{
    top: "max(env(safe-area-inset-top, 0px), 1rem)",
    right: "max(env(safe-area-inset-right, 0px), 1rem)",
  }}
>
  ✕
</button>



        {/* Main Heading */}
        <h1
  className="text-3xl font-extrabold tracking-wide text-center text-transparent bg-clip-text sm:text-4xl lg:text-5xl"
  style={{
    backgroundImage: "linear-gradient(white, white, #111111)",
  }}
>
  About Us
</h1>



        {/* Company Background */}
        <section className="space-y-8 text-center">
          <h2 className="text-[clamp(1.4rem,3.5vw,2.2rem)] font-semibold text-[silver]">
            Company Background
          </h2>

          {/* Top Image */}
          <div>
            <AdvancedImage
              cldImg={clImg("faaff8ea-60e1-4102-bae8-39ef855d514b_r0yife")}
              plugins={[responsive(), placeholder()]}
              className="rounded-xl shadow-lg w-full object-cover 
                         max-h-[260px] sm:max-h-[360px] lg:max-h-[480px] border border-[#014421]"
            />
            <p className="mt-2 text-xs italic text-gray-400 sm:text-sm">
              Our UK breaker’s yard and warehouse operations
            </p>
          </div>

          {/* Text content */}
          <div className="max-w-5xl mx-auto space-y-5 text-left">
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
              Founded in 2000, our group has grown into a diversified leader in Sri Lanka’s business landscape. 
              We proudly manage three successful companies:
            </p>
            <ul className="pl-5 space-y-2 text-sm text-gray-300 list-disc sm:pl-6 sm:text-base lg:text-lg">
              <li>A market leader in packaging materials and machinery across Sri Lanka</li>
              <li>An export company supplying premium Ceylon tea to over 10 countries worldwide</li>
              <li>An international business exporting industrial tea bagging machinery to more than 20 countries</li>
            </ul>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
              Building on decades of trusted partnerships and global reach, we launched our newest venture in 2025: 
              a dedicated European used spare parts importing company. As a direct importer, we bring genuine European 
              spare parts carefully sourced from our UK breaker’s yard to Sri Lanka’s automotive market.
            </p>
            <p className="text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
              By combining industry expertise, strong UK supplier networks, and a commitment to quality, we ensure 
              Sri Lankan vehicle owners receive authentic, reliable European auto parts with fast island-wide delivery.
            </p>
          </div>

          {/* ✅ Image grid */}
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            <AdvancedImage
              cldImg={clImg("WhatsApp_Image_2025-09-01_at_15.13.17_zzkhrq_kemsdm")}
              plugins={[responsive(), placeholder()]}
              className="rounded-xl shadow-lg object-cover border border-[#014421]"
            />
            <AdvancedImage
              cldImg={clImg("WhatsApp_Image_2025-09-01_at_15.13.16_2_blmng2_vygadd")}
              plugins={[responsive(), placeholder()]}
              className="rounded-xl shadow-lg object-cover border border-[#014421]"
            />
            <AdvancedImage
              cldImg={clImg("WhatsApp_Image_2025-09-01_at_15.13.15_u8nlib_wxis6v")}
              plugins={[responsive(), placeholder()]}
              className="rounded-xl shadow-lg object-cover border border-[#014421]"
            />
          </div>
        </section>

        {/* Footer */}
        <p className="mt-10 text-xs text-center text-gray-400 sm:text-sm">
          EuroTec  Premium European Auto Parts Supplier. Delivering trusted 
          quality and service across Sri Lanka.
        </p>
      </div>
    </div>
  );
}
