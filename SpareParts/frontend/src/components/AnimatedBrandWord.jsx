// src/components/AnimatedBrandWord.jsx
import React, { useEffect, useState, useMemo } from "react";

const BRANDS = [
  "Range Rover", "BMW", "Mercedes-Benz", "Audi", "Volvo",
  "Volkswagen", "Porsche", "MG", "Ford", "Jaguar",
  "Renault", "Peugeot", "Mini Cooper"
];

export default function AnimatedBrandWord({
  intervalMs = 2000,      // change speed
  widthCh = 18,           // fixed width to avoid layout shift; tweak if needed
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % BRANDS.length), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);

  // Duplicate list once so we can scroll with a simple translate without bounds checks
  const list = useMemo(() => [...BRANDS, ...BRANDS], []);

  return (
    <span className="inline-flex align-baseline items-baseline">
      {/* Container uses current paragraph font-size via em; no hardcoded rems */}
      <span
        className="relative overflow-hidden inline-block"
        style={{
          height: "1em",            // exactly one text line tall
          lineHeight: 1,            // avoid extra vertical space/clipping
          width: `min(${widthCh}ch, 60vw)`, // keep width steady across brand lengths
          padding: "0.05em 0",      // tiny breathing room to prevent crop on some fonts
        }}
        aria-live="polite"
      >
        <span
          className="flex flex-col transition-transform duration-500 ease-in-out"
          // move by N * 1em since each row is exactly 1em tall
          style={{ transform: `translateY(-${index}em)` }}
        >
          {list.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              style={{
                height: "1em",
                lineHeight: 1,
                fontSize: "1em",        // inherit from parent (same size as paragraph)
                fontWeight: 600,
                color: "#FFD45A",
                whiteSpace: "nowrap",
                display: "block",
              }}
            >
              {brand}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
