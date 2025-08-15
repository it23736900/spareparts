import React from 'react';
import { FaCogs, FaCarSide, FaShippingFast } from 'react-icons/fa';
import AnimatedBrandWord from './AnimatedBrandWord';

const Highlight = ({ children }) => (
  <span className="text-yellow-400 font-semibold">{children}</span>
);

const IntroParagraph = () => {
  return (
    <section className="px-6 py-16 max-w-6xl mx-auto text-soft space-y-10 bg-transparent">
      {/* 🔧 Paragraph 1 */}
      <div className="flex items-start gap-4">
        <FaCogs className="text-yellow-400 text-3xl mt-1" />
        <p className="text-lg leading-relaxed">
          We specialize in importing and supplying <Highlight>genuine, high-quality European car parts</Highlight> and spares across Sri Lanka.
          Based in Colombo, we are a trusted direct importer sourcing used parts directly from the UK, including from our own breaker’s yard in the UK.
        </p>
      </div>

      {/* 🚗 Paragraph 2 - Animated brand names */}
      <div className="flex items-center gap-4">
        <FaCarSide className="text-yellow-400 text-3xl" />
        <p className="text-lg leading-relaxed">
          Our range includes parts for leading European brands specially <AnimatedBrandWord />.
        </p>
      </div>

      {/* 🚚 Paragraph 3 - Delivery emphasis */}
      <div className="flex items-start gap-4">
        <FaShippingFast className="text-yellow-400 text-3xl mt-1" />
        <p className="text-lg leading-relaxed">
          <Highlight>Enjoy fast, island-wide delivery</Highlight> and keep your vehicle running smoothly with top-quality European car parts and spares, backed by expert sourcing and service.
        </p>
      </div>
    </section>
  );
};

export default IntroParagraph;
