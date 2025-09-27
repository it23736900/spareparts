// src/components/ServicesShowcase.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Demo media (replace with Cloudinary later if needed) ---
const DEMO_MEDIA = {
  inquiry: "https://media.giphy.com/media/3ohryiYkE0DVwdLAys/giphy.gif",
  touch: "https://res.cloudinary.com/dznt9s0j8/image/upload/v1758807541/we_get_in_touch_roaopi.gif",
  quote: "https://res.cloudinary.com/dznt9s0j8/image/upload/v1758807962/receive_a_quotation_wbv41c.gif",
  payment: "https://media.giphy.com/media/I90rL3aw7iwFNIu2qO/giphy.gif",
  logistics: "https://res.cloudinary.com/dznt9s0j8/image/upload/v1758808028/logistics_coprdination_cqzfxh.png",
  delivered: "https://assets-v2.lottiefiles.com/a/4fae1352-1178-11ee-ba24-eb0cb26a3211/OdQXXyGM51.gif",
};

const SERVICES = [
  {
    id: "inquiry",
    title: "Submit Your Inquiry",
    blurb: "Share part details or photos. VIN/Chassis welcome.",
    details: ["Upload part images if possible", "VIN helps exact fitment", "Response within a working day"],
  },
  {
    id: "touch",
    title: "We Get in Touch",
    blurb: "A specialist confirms specs, availability, and options.",
    details: ["Check compatibility", "Suggest alternatives", "Friendly WhatsApp/phone support"],
  },
  {
    id: "quote",
    title: "Receive a Quotation",
    blurb: "Transparent pricing with ETA. No surprises.",
    details: ["Itemized quote", "ETA & shipping included", "Valid for limited time"],
  },
  {
    id: "payment",
    title: "Advance Payment",
    blurb: "Secure payment, stock reserved instantly.",
    details: ["Multiple methods", "Instant confirmation", "Stock locked"],
  },
  {
    id: "logistics",
    title: "Logistics Coordination",
    blurb: "UK pickup → customs → dispatch.",
    details: ["Tracked shipping", "Customs handling", "Safe packing"],
  },
  {
    id: "delivered",
    title: "Parts Delivered",
    blurb: "Island-wide delivery in 3–4 days.",
    details: ["Door-to-door", "Return options", "After-sales support"],
  },
];

function ServiceCard({ item, active, onToggle }) {
  const isOpen = active === item.id;
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ translateY: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="relative p-6 overflow-hidden group rounded-2xl backdrop-blur-xl"
      style={{
        background: "rgba(0,0,0,0.75)", // black card
        border: "1px solid rgba(1,68,33,0.6)", // thin dark green line
      }}
    >
      {/* Media circle */}
      <div className="relative flex items-center justify-center h-28">
        <div
          className="relative w-24 h-24 overflow-hidden rounded-full shadow-md"
          style={{ border: "1px solid rgba(1,68,33,0.6)" }}
        >
          <img
            src={DEMO_MEDIA[item.id]}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Title */}
      <h3
        className="mt-3 text-xl font-extrabold text-center"
        style={{ color: "#E3C85C" }}
      >
        {item.title}
      </h3>

      {/* Blurb */}
      <p className="mt-2 text-sm leading-relaxed text-center text-white">
        {item.blurb}
      </p>

      {/* Button */}
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => onToggle(isOpen ? null : item.id)}
          className="px-5 py-2 text-sm font-semibold transition-all rounded-full"
          style={{
            background: "black",
            border: "1px solid #014421",
            color: "white",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#E3C85C";
            e.currentTarget.style.color = "#000";
            e.currentTarget.style.border = "1px solid #E3C85C";
            e.currentTarget.style.boxShadow = "0 0 16px rgba(227,200,92,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "black";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.border = "1px solid #014421";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {isOpen ? "Hide details" : "View details"}
        </button>
      </div>

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-2 text-[14px] text-white">
              {item.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-[6px] block w-[6px] h-[6px] rounded-full bg-[#014421]" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesShowcase() {
  const [active, setActive] = useState(null);

  return (
    <section
      className="relative py-16 sm:py-20"
 style={{
  background: `
    linear-gradient(
      180deg,
      #050505 0%,        /* pure blackish at top for headings */
      #0A0F0D 25%,       /* slight green tint */
      #0A1A15 55%,       /* richer dark green */
      #06110D 80%,       /* deep green-black */
      #050505 100%       /* fade back to black at bottom */
    )
  `,
}}

    >
      <div className="max-w-6xl px-4 mx-auto">
        {/* Section Heading */}
        <h2
          className="mb-10 text-2xl font-extrabold text-center text-transparent sm:text-3xl md:text-4xl bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(white, white, black)",
          }}
        >
          We Complete Every Step Carefully
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.id}
              item={s}
              active={active}
              onToggle={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
