// src/components/ServicesShowcase.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Demo stock loops (free GIFs/WEBPs hosted externally) ---
// You can later replace these with Cloudinary links if you want full control
const DEMO_MEDIA = {
  inquiry: "https://media.giphy.com/media/Ll22OhMLAlVDb8UQWe/giphy.gif", // writing
  touch: "https://media.giphy.com/media/f3CtEsJ72j86DIumaJ/giphy.gif", // talking headset
  quote: "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif", // document/price
  payment: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif", // credit card
  logistics: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif", // truck
  delivered: "https://media.giphy.com/media/26gsvzPj6nUjRr0IU/giphy.gif", // package delivery
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
      whileHover={{ translateY: -4, boxShadow: "0 18px 60px -24px rgba(23,167,122,0.45)" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl p-6 bg-card border border-emerald-500/25"
    >
      {/* Media circle */}
      <div className="relative h-28 flex items-center justify-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-emerald-400/30 shadow-lg">
          <img
            src={DEMO_MEDIA[item.id]}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-2 text-xl font-extrabold text-emerald-300 text-center">{item.title}</h3>
      <p className="mt-2 text-center text-sm text-[#cfe2df] leading-relaxed">{item.blurb}</p>

      {/* Button */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => onToggle(isOpen ? null : item.id)}
          className="px-4 py-2 rounded-full text-sm font-semibold border border-emerald-400/45 text-[#cfe2df] hover:text-emerald-300 transition-all"
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
            <ul className="mt-4 space-y-2 text-[14px] text-[#d9eee9]">
              {item.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-[6px] block w-[6px] h-[6px] rounded-full bg-emerald-400" />
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
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-10">
          We Complete Every Step <span className="luxury-gold">Carefully</span>
        </h2>

        <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} item={s} active={active} onToggle={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
