import React from "react";
import { motion } from "framer-motion";

const GOLD = "#D4AF37";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

/* Outline icons (match your green reference) */
const Icon = {
  Image: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={GOLD} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="2" />
      <path d="M21 15l-5-5-7 7" />
    </svg>
  ),
  Headset: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={GOLD} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12a8 8 0 0 1 16 0" />
      <rect x="3" y="11" width="4" height="7" rx="2" />
      <rect x="17" y="11" width="4" height="7" rx="2" />
      <path d="M13 21h-2a2 2 0 0 1-2-2" />
    </svg>
  ),
  Check: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={GOLD} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l2.5 2.5L16 9" />
    </svg>
  ),
  HandMoney: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={GOLD} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 16s1.5-2 4-2h5a3 3 0 0 1 0 6H9" />
      <path d="M7 20H5a2 2 0 0 1-2-2" />
      <rect x="17" y="7" width="4.5" height="3.5" rx="1.2" />
      <path d="M19.25 7v3.5" />
    </svg>
  ),
  Truck: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={GOLD} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="7" width="12.5" height="9" rx="2" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="6" cy="18.5" r="1.8" />
      <circle cx="17.5" cy="18.5" r="1.8" />
    </svg>
  ),
  BoxCheck: ({ size = 72 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={GOLD} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 7v10l9 4 9-4V7" />
      <path d="M9 13l2 2 4-4" />
    </svg>
  ),
};

/* Premium number badge (fits inside the step; no overflow) */
function NumberBadge({ n }) {
  const num = String(n).padStart(2, "0");
  return (
    <div className="absolute top-0 -translate-x-1/2 select-none left-1/2">
      <div
        className="relative grid w-12 h-12 rounded-full place-items-center md:w-14 md:h-14"
        style={{
          background:
            "radial-gradient(70% 70% at 50% 35%, rgba(212,175,55,0.16), rgba(0,0,0,0))",
          border: "1px solid rgba(212,175,55,0.45)",
          boxShadow:
            "0 0 26px rgba(212,175,55,0.22), inset 0 0 0 1px rgba(255,255,255,0.06)",
          backdropFilter: "blur(2px)",
        }}
      >
        <span
          className="text-base font-extrabold tracking-widest md:text-xl"
          style={{ color: GOLD, textShadow: "0 0 12px rgba(212,175,55,0.35)" }}
        >
          {num}
        </span>

        {/* outer faint ring highlight */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "conic-gradient(from 230deg, rgba(212,175,55,0.38), rgba(212,175,55,0) 42%)",
            mask: "radial-gradient(circle at 50% 50%, transparent 66%, black 68%)",
          }}
        />
      </div>
    </div>
  );
}

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
        background:
          "radial-gradient(60% 40% at 50% 0%, rgba(16,94,66,0.22), transparent 70%)",
      }}
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h2
          className="text-3xl font-extrabold tracking-wide md:text-4xl"
          style={{ color: GOLD }}
        >
          WE COMPLETE EVERY STEP CAREFULLY
        </h2>
        <div className="relative mx-auto mt-4 h-[2px] w-64">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.9), transparent)",
              filter: "drop-shadow(0 0 10px rgba(212,175,55,0.5))",
            }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid max-w-6xl mx-auto gap-y-20 gap-x-24 lg:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            className="relative text-center pt-14"  /* reserve space for badge */
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <NumberBadge n={i + 1} />

            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              className="inline-block mb-4"
            >
              {s.icon}
            </motion.div>

            <h3 className="text-2xl md:text-[28px] font-extrabold"
                style={{ color: GOLD }}>
              {s.title}
            </h3>

            <p className="mx-auto mt-3 max-w-md text-[1.06rem] leading-relaxed text-white/80">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
