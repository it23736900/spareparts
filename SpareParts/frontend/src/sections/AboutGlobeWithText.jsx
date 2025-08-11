import React from "react";
import GlobeConnect from "../components/GlobeConnect"; // <-- you already have this

export default function AboutGlobeWithText({ children }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Left: Globe */}
        <div>
          <div className="relative h-[340px] sm:h-[420px] md:h-[520px] lg:h-[560px] xl:h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
            <GlobeConnect />
          </div>
        </div>

        {/* Right: Your text goes here */}
        <div className="text-slate-100/90 leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}
