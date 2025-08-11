import React from "react";
import { motion } from "framer-motion";

/* Theme */
const BASE_GREEN = "#105E42";      // deep elegant green
const ACCENT_GREEN = "#17A77A";    // brighter emerald for titles/icons

/* Animation */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

/* Icons (slightly brighter green + subtle glow for visibility) */
const iconStyle = {
  stroke: ACCENT_GREEN,
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  filter: "drop-shadow(0 0 6px rgba(23,167,122,0.28))",
};

const Icon = {
  Image: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ ...iconStyle }}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="2" />
      <path d="M21 15l-5-5-7 7" />
    </svg>
  ),
  Headset: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ ...iconStyle }}>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <rect x="3" y="11" width="4" height="7" rx="2" />
      <rect x="17" y="11" width="4" height="7" rx="2" />
      <path d="M13 21h-2a2 2 0 0 1-2-2" />
    </svg>
  ),
  Check: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ ...iconStyle }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l2.5 2.5L16 9" />
    </svg>
  ),
  HandMoney: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ ...iconStyle }}>
      <path d="M3 16s1.5-2 4-2h5a3 3 0 0 1 0 6H9" />
      <path d="M7 20H5a2 2 0 0 1-2-2" />
      <rect x="17" y="7" width="4.5" height="3.5" rx="1.2" />
      <path d="M19.25 7v3.5" />
    </svg>
  ),
  Truck: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ ...iconStyle }}>
      <rect x="1.5" y="7" width="12.5" height="9" rx="2" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="6" cy="18.5" r="1.8" />
      <circle cx="17.5" cy="18.5" r="1.8" />
    </svg>
  ),
  BoxCheck: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ ...iconStyle }}>
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 7v10l9 4 9-4V7" />
      <path d="M9 13l2 2 4-4" />
    </svg>
  ),
};

const steps = [
  { icon: <Icon.Image />,     title: "Submit Your Inquiry",
    desc: "Share the details of the necessary spare parts with us." },
  { icon: <Icon.Headset />,   title: "We Get in Touch",
    desc: "Our team reviews your request and contacts you within a working day to confirm additional details." },
  { icon: <Icon.Check />,     title: "Receive a Quotation",
    desc: "We provide a detailed quote based on your request." },
  { icon: <Icon.HandMoney />, title: "Advance Payment",
    desc: "Make an initial payment to begin processing." },
  { icon: <Icon.Truck />,     title: "Logistics Coordination",
    desc: "We arrange safe and efficient import from the UK." },
  { icon: <Icon.BoxCheck />,  title: "Parts Delivered",
    desc: "Receive your spare parts quickly and securely (typically 3–4 days)." },
];

export default function ProcessFlow() {
  return (
    <section
      className="relative px-6 py-16 sm:py-20"
      style={{
        /* dark navy base with subtle green tint to match testimonials */
        background: `
          radial-gradient(60% 40% at 50% 0%, rgba(16,94,66,0.16), transparent 60%),
          linear-gradient(180deg, #020A12 0%, #061826 100%)
        `,
      }}
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-extrabold md:text-4xl text-white">
          WE COMPLETE EVERY STEP CAREFULLY
        </h2>
      </div>

      {/* Grid */}
      <div className="grid max-w-6xl mx-auto gap-y-12 md:gap-y-16 gap-x-8 md:gap-x-12 lg:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="relative"
          >
            {/* Card — dark glass with soft green wash (NOT full green) */}
            <div
              className="
                group relative mx-auto pt-10 text-center rounded-2xl border
                transition-transform hover:scale-[1.02]
                backdrop-blur-[4px] hover:backdrop-blur-[8px]
              "
              style={{
                maxWidth: 420,
                background: `
                  radial-gradient(120% 90% at 20% 10%, rgba(23,167,122,0.10), transparent 55%),
                  radial-gradient(120% 90% at 80% 90%, rgba(16,94,66,0.10), transparent 55%),
                  linear-gradient(180deg, rgba(9,20,26,0.92), rgba(6,16,22,0.92))
                `,
                borderColor: "rgba(23,167,122,0.35)",
                boxShadow: "0 14px 34px rgba(0,0,0,0.45)",
              }}
            >
              <div className="inline-block mb-4">{s.icon}</div>

              {/* Title — brighter emerald + subtle glow for readability */}
              <h3
                className="text-2xl md:text-[28px] font-extrabold"
                style={{
                  color: ACCENT_GREEN,
                  textShadow: "0 0 10px rgba(23,167,122,0.28)",
                }}
              >
                {s.title}
              </h3>

              <p className="mx-auto mt-3 max-w-md px-6 pb-8 text-[1.06rem] leading-relaxed text-white/85">
                {s.desc}
              </p>

              {/* Hover sheen (green, very subtle) */}
              <span
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition"
                style={{ boxShadow: "0 0 32px 6px rgba(23,167,122,0.18)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
