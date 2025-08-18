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
const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const clImg = (id) =>
  cld
    .image(id)
    .format("auto")
    .quality("auto")
    // 4K source → responsive downscale; keep it crisp on large screens
    .resize(clAuto().width(1600));

/* =========================
   THEME
   ========================= */
const ACCENT = "#17A77A";

/* =========================
   IMAGES — replace these with your real public IDs
   e.g. "services/engine_4k_abcd1234"
   ========================= */
const CLOUD_IMAGES = {
  engine:     "/engine_usewdv",      // <— REPLACE
  mechanical: "/mechanical_xjbgoi",  // <— REPLACE
  body:       "/bodypart_aep6hj",        // <— REPLACE
  electronic: "/electronic_a92a01",  // <— REPLACE
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

export default function ServicesSection({ onInquire = () => {} }) {
  return (
    <section className="bg-transparent px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Our Services</h2>
        <div
          className="mx-auto mt-4 h-[2px] w-36 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0), #FFD45A 20%, #D4AF37 60%, rgba(0,0,0,0))",
            boxShadow:
              "0 0px 12px rgba(212,175,55,0.6), 0 0 36px rgba(212,175,55,0.35)",
            filter: "blur(0.3px)",
          }}
        />
      </div>

      {/* Grid → 1 on mobile, 2 on md/lg/xl (as requested) */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-2">
        {services.map((s, i) => (
          <motion.article
            key={s.key}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="
              group relative rounded-2xl border bg-card
              hover:scale-[1.015] transition-transform
              backdrop-blur-[4px] hover:backdrop-blur-[8px]
              flex flex-col overflow-hidden
            "
            style={{
              borderColor: "rgba(23,167,122,0.35)",
              boxShadow: "0 14px 34px rgba(0,0,0,0.45)",
            }}
          >
            {/* ===== Media (photo with gradient + subtle glow) ===== */}
            <div className="relative aspect-[16/9] overflow-hidden">
              {s.imageId ? (
                <>
                  <AdvancedImage
                    cldImg={clImg(s.imageId)}
                    plugins={[
                      lazyload(),                 // lazy load off-screen
                      placeholder({ mode: "blur" }) // blur-up placeholder
                    ]}
                    className="w-full h-full object-cover will-change-transform"
                    alt={s.title}
                  />
                  {/* Vignette + emerald tint for brand consistency */}
                  <div className="absolute inset-0 pointer-events-none"
                       style={{
                         background:
                           "radial-gradient(120% 120% at 50% 0%, rgba(23,167,122,0.10), rgba(0,0,0,0) 60%), linear-gradient(180deg, rgba(2,10,18,0) 40%, rgba(2,10,18,0.55))"
                       }}
                  />
                  {/* Soft inner border glow */}
                  <div className="absolute inset-3 rounded-2xl"
                       style={{ boxShadow: "inset 0 0 0 1px rgba(23,167,122,0.30)" }} />
                </>
              ) : (
                <div
                  className="grid place-items-center h-full"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 20% 10%, rgba(23,167,122,0.10), transparent 55%), radial-gradient(120% 90% at 80% 90%, rgba(16,94,66,0.10), transparent 55%), linear-gradient(180deg, rgba(9,20,26,0.92), rgba(6,16,22,0.92))",
                  }}
                >
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      border: "1px solid rgba(23,167,122,0.35)",
                      boxShadow: "0 0 32px 6px rgba(23,167,122,0.18)",
                      color: ACCENT,
                      textShadow: "0 0 10px rgba(23,167,122,0.28)",
                    }}
                  >
                    {s.icon}
                  </div>
                </div>
              )}
            </div>

            {/* ===== Body ===== */}
<div className="p-5 md:p-6 flex flex-col gap-3">
  <h3
    className="text-xl md:text-[22px] font-extrabold"
    style={{ color: ACCENT, textShadow: "0 0 10px rgba(23,167,122,0.28)" }}
  >
    {s.title}
  </h3>

  <p className="text-white/85 leading-relaxed text-[0.98rem]">
    {s.desc}
  </p>
</div>


            {/* Hover sheen */}
            <span
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition"
              style={{ boxShadow: "0 0 32px 6px rgba(23,167,122,0.18)" }}
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}