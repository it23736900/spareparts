import React from "react";
import AnimatedBrandWord from "./AnimatedBrandWord";

const GOLD = "#D4AF37";
const Highlight = ({ children }) => (
  <span style={{ color: GOLD, fontWeight: 700 }}>{children}</span>
);

export default function IntroParagraph() {
  const pStyle = {
    fontSize: "clamp(1.1rem, 1.9vw, 1.28rem)",
    lineHeight: 1.75,
    color: "#cfe9e2",
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <p style={pStyle}>
        We specialize in importing and supplying{" "}
        <Highlight>genuine, high-quality European car parts</Highlight> and
        spares across Sri Lanka. Based in Colombo, we source used parts
        directly from the UK — including from our own breaker’s yard — to
        deliver trusted quality at great value.
      </p>

      {/* Text line, then marquee on its own block to avoid clipping */}
      <div>
        <p style={pStyle} className="mb-2">
          Our range includes parts for leading European brands, specially:
        </p>
        <AnimatedBrandWord />
      </div>

      <p style={pStyle}>
        <Highlight>Enjoy fast, island-wide delivery</Highlight> and keep your
        vehicle running smoothly with top-quality parts, backed by expert
        sourcing and service.
      </p>
    </div>
  );
}
