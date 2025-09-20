import React, { useEffect, useState } from "react";

/**
 * Simple rotating word with a shimmering gradient fill.
 * Pass accent="emerald" (default) or "gold" if you ever want to switch back.
 */
export default function AnimatedBrandWord({ accent = "emerald" }) {
  const words = [
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Volkswagen",
    "Volvo",
    "Jaguar",
    "Porsche",
    "Renault",
    "Peugeot",
    "Mini Cooper",
  ];

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []);

  const gradients = {
    emerald:
      "linear-gradient(90deg, #7CF7D4 0%, #32D6A7 40%, #0BA57F 80%, #7CF7D4 100%)",
    gold: "linear-gradient(90deg, #FFD95A 0%, #D4AF37 100%)",
  };

  const glow = accent === "emerald"
    ? "0 0 18px rgba(23,167,122,0.45)"
    : "0 0 18px rgba(212,175,55,0.45)";

  return (
    <div
      className="inline-block select-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className="inline-block font-extrabold tracking-wide"
        style={{
          // size tuned to the paragraph scale
          fontSize: "clamp(1.05rem, 1.9vw, 1.25rem)",
          lineHeight: 1.2,
          backgroundImage: gradients[accent] || gradients.emerald,
          backgroundSize: "200% 100%",
          backgroundPosition: "0% 50%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: glow,
          transition: "opacity 260ms ease",
          animation: "brandShine 3s linear infinite",
        }}
      >
        {words[idx]}
      </span>

      {/* keyframes local to this component */}
      <style>{`
        @keyframes brandShine {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}
