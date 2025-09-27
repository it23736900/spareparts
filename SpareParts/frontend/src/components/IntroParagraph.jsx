import React from "react";
import AnimatedBrandWord from "./AnimatedBrandWord";

export default function IntroParagraph() {
  const pStyle = {
    fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
    lineHeight: 1.6,
    color: "#FFFFFF", // all text white
  };

  const Highlight = ({ children }) => (
    <span style={{ color: "#FFFFFF", fontWeight: 700 }}>{children}</span>
  );

  return (
    <div
      className="p-6 space-y-4 sm:space-y-5 rounded-2xl sm:p-8"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.45)", // soft shadow
      }}
    >
      {/* Heading styled like About Us */}
      <h2
        className="mb-4 font-extrabold text-transparent sm:mb-5 bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(white, gray,white )",
          fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
        }}
      >
        Global Sourcing, Local Confidence
      </h2>

      <p style={pStyle}>
        We specialize in importing and supplying{" "}
        <Highlight>genuine, high-quality European car parts</Highlight> and
        spares across Sri Lanka. Based in Colombo, we source used parts directly
        from the UK  including from our own breaker’s yard to deliver trusted
        quality at great value.
      </p>

      <div>
        <p style={pStyle} className="mb-2">
          Our range includes parts for leading European brands, specially : 
         < AnimatedBrandWord accent ="white" /> </p>
       
      </div>

      <p style={pStyle}>
        <Highlight>Enjoy fast, island-wide delivery</Highlight> and keep your
        vehicle running smoothly with top-quality parts, backed by expert
        sourcing and service.
      </p>
    </div>
  );
}
