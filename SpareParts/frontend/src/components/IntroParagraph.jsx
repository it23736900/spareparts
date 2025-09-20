import React from "react";
import AnimatedBrandWord from "./AnimatedBrandWord";

export default function IntroParagraph() {
  const pStyle = {
    // slightly smaller than before
    fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
    lineHeight: 1.7,
    color: "#E8ECEA", // all white (soft)
  };

  // “highlight” now just keeps white + bold (no color change)
  const Highlight = ({ children }) => (
    <span style={{ color: "#E8ECEA", fontWeight: 700 }}>{children}</span>
  );

  return (
    <div className="space-y-5 sm:space-y-6">
      <p style={pStyle}>
        We specialize in importing and supplying{" "}
        <Highlight>genuine, high-quality European car parts</Highlight> and
        spares across Sri Lanka. Based in Colombo, we source used parts
        directly from the UK — including from our own breaker’s yard — to
        deliver trusted quality at great value.
      </p>

      {/* Text line, then the animated brand word below (emerald, not gold) */}
      <div>
        <p style={pStyle} className="mb-2">
          Our range includes parts for leading European brands, specially:
        </p>
        <AnimatedBrandWord accent="emerald" />
      </div>

      <p style={pStyle}>
        <Highlight>Enjoy fast, island-wide delivery</Highlight> and keep your
        vehicle running smoothly with top-quality parts, backed by expert
        sourcing and service.
      </p>
    </div>
  );
}
