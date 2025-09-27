// src/components/ServicesSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { auto as clAuto } from "@cloudinary/url-gen/actions/resize";

/* Icons (fallbacks) */
import { TbEngine } from "react-icons/tb";
import { FaTools, FaCarSide, FaMicrochip } from "react-icons/fa";

/* =========================
   Cloudinary setup
   ========================= */
const cld = new Cloudinary({ cloud: { cloudName: "dznt9s0j8" } });
const clImg = (id) =>
  cld
    .image(id)
    .format("auto")
    .quality("auto")
    .resize(clAuto().width(1600));

/* =========================
   THEME COLORS
   ========================= */
const DARK_GREEN = "#014421";
const LIGHT_YELLOW = "#E3C85C";

/* =========================
   IMAGES (Cloudinary IDs)
   ========================= */
const CLOUD_IMAGES = {
  engine: "engine_usewdv_lqoswe",
  mechanical: "mechanical_xjbgoi_iusj8u",
  body: "pexels-maxavans-5066559_paewy1",
  electronic: "electronic_a92a01_etopkr",
};

/* =========================
   CONTENT
   ========================= */
const services = [
  {
    key: "engine",
    title: "Engine Components",
    desc:
      "Blocks, heads, pistons, turbos, injectors, timing kits and gasket sets. OEM-grade parts tested and sourced from the UK to keep your powertrain reliable.",
    imageId: CLOUD_IMAGES.engine,
    icon: <TbEngine className="text-5xl md:text-6xl" />,
  },
  {
    key: "mechanical",
    title: "Mechanical",
    desc:
      "Suspension, steering racks, control arms, braking systems, clutches, gearboxes, differentials and cooling. Quality you can feel on every road.",
    imageId: CLOUD_IMAGES.mechanical,
    icon: <FaTools className="text-5xl md:text-6xl" />,
  },
  {
    key: "body",
    title: "Body",
    desc:
      "Bumpers, grilles, mirrors, lights, doors and trims with precise OEM fitment. Carefully packed and shipped to protect finishes.",
    imageId: CLOUD_IMAGES.body,
    icon: <FaCarSide className="text-5xl md:text-6xl" />,
  },
  {
    key: "electronic",
    title: "Electronic",
    desc:
      "ECUs, sensors, infotainment units, instrument clusters and modules. Professionally tested with diagnostic reports where applicable.",
    imageId: CLOUD_IMAGES.electronic,
    icon: <FaMicrochip className="text-5xl md:text-6xl" />,
  },
];

/* Animations */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
  }),
};

export default function ServicesSection() {
  return (
    <section
      className="px-4 py-16 sm:px-6 lg:px-8 sm:py-20"
      style={{
        background: `
          linear-gradient(
            180deg,
            #050505 0%,
            #0A0F0D 25%,
            #0A1A15 55%,
            #06110D 80%,
            #050505 100%
          )
        `,
      }}
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-10 text-center md:mb-12">
        <h2
          className="text-2xl font-extrabold text-center text-transparent sm:text-3xl md:text-4xl lg:text-5xl bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(white, white, #111111)",
          }}
        >
          Our Expertise
        </h2>
      </div>

      {/* Grid */}
      <div className="grid max-w-6xl gap-6 mx-auto sm:gap-8 md:grid-cols-2">
        {services.map((s, i) => (
          <motion.article
            key={s.key}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex flex-col overflow-hidden transition-all duration-300 ease-out bg-black border group rounded-2xl"
            style={{ borderColor: DARK_GREEN }}
          >
            {/* ===== Media ===== */}
            <div className="relative aspect-[16/9] overflow-hidden">
              {s.imageId ? (
                <>
                  <AdvancedImage
                    cldImg={clImg(s.imageId)}
                    loading="lazy"
                    plugins={[lazyload(), placeholder({ mode: "blur" })]}
                    className="object-cover w-full h-full"
                    alt={s.title}
                    fetchpriority={i === 0 ? "high" : "auto"}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.8))",
                    }}
                  />
                  {/* Inner border line */}
                  <div
                    className="absolute inset-3 rounded-2xl"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${DARK_GREEN}`,
                    }}
                  />
                </>
              ) : (
                <div
                  className="grid h-full place-items-center"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(12,28,22,0.95), rgba(5,15,10,0.95))",
                  }}
                >
                  <div
                    className="p-5 rounded-2xl"
                    style={{
                      border: `1px solid ${DARK_GREEN}`,
                      color: LIGHT_YELLOW,
                    }}
                  >
                    {s.icon}
                  </div>
                </div>
              )}
            </div>

            {/* ===== Body ===== */}
            <div className="flex flex-col items-center gap-3 p-5 text-center md:p-6">
              <h3
                className="text-xl md:text-[22px] font-extrabold"
                style={{ color: LIGHT_YELLOW }}
              >
                {s.title}
              </h3>
              <p className="text-white leading-relaxed text-[0.98rem]">
                {s.desc}
              </p>
            </div>

            {/* Hover effect border glow */}
            <style>{`
              .group:hover {
                box-shadow: 0 0 14px rgba(1,68,33,0.45);
                transform: scale(1.012);
              }
            `}</style>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
