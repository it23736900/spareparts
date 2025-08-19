import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate("/");
    }
  };

  // Reusable gold divider with tighter spacing
  const GoldDivider = () => (
    <div
      className="h-[2px] w-40 mx-auto mt-1 mb-3 rounded-full"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(212,175,55,0.9), transparent)",
      }}
    />
  );

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center 
                 z-50 px-3 sm:px-6 py-6 sm:py-10"
    >
      <div
        ref={modalRef}
        className="relative bg-gradient-to-b from-[#0B1C1F] to-[#050A0A] text-white 
                   rounded-2xl shadow-[0_0_60px_rgba(16,94,66,0.8)] 
                   w-full max-w-7xl max-h-[94vh] overflow-y-auto
                   p-6 sm:p-10 lg:p-16 space-y-14 scroll-smooth"
        data-aos="zoom-in"
      >
        {/* Top Image */}
        <div>
          <img
            src="/yard-sample.jpg"
            alt="Company Yard"
            className="rounded-xl shadow-lg w-full object-cover 
                       max-h-[300px] sm:max-h-[400px] lg:max-h-[520px]"
          />
          <p className="text-xs sm:text-sm lg:text-base text-gray-400 mt-2 italic text-center">
            Our UK breaker’s yard and warehouse operations
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold 
                       text-yellow-400 text-center">
          About Us
        </h1>
        <GoldDivider />

        {/* Company Background */}
        <section className="space-y-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-semibold text-yellow-300">
            Company Background
          </h2>
          <GoldDivider />
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg lg:text-xl text-left">
            Founded in 2000, our group has grown into a diversified leader in Sri Lanka’s business landscape. 
            We proudly manage three successful companies:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300 text-base sm:text-lg lg:text-xl text-left">
            <li>A market leader in packaging materials and machinery across Sri Lanka</li>
            <li>An export company supplying premium Ceylon tea to over 10 countries worldwide</li>
            <li>An international business exporting industrial tea bagging machinery to more than 20 countries</li>
          </ul>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg lg:text-xl text-left">
            Building on decades of trusted partnerships and global reach, we launched our newest venture in 2025: 
            a dedicated European used spare parts importing company. As a direct importer, we bring genuine European 
            spare parts carefully sourced from our UK breaker’s yard to Sri Lanka’s automotive market.
          </p>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg lg:text-xl text-left">
            By combining industry expertise, strong UK supplier networks, and a commitment to quality, we ensure 
            Sri Lankan vehicle owners receive authentic, reliable European auto parts with fast island-wide delivery.
          </p>

          {/* Example image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <img src="/warehouse.jpg" alt="Warehouse" className="rounded-xl shadow-lg object-cover" />
            <img src="/shipping.jpg" alt="Shipping" className="rounded-xl shadow-lg object-cover" />
            <img src="/team.jpg" alt="Team" className="rounded-xl shadow-lg object-cover" />
          </div>
        </section>

        {/* Mission */}
        <section className="bg-[#102d2f]/70 rounded-xl p-5 sm:p-8 lg:p-10 shadow-lg text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-300">
            Our Mission
          </h2>
          <GoldDivider />
          <p className="italic text-gray-300 text-base sm:text-lg lg:text-xl text-left">
            To be Sri Lanka’s trusted direct importer of genuine, high-quality used European vehicle parts and spares, 
            delivering reliability, safety, and peace of mind to every customer by sourcing directly from the UK.
          </p>
        </section>

        {/* Values */}
        <section className="bg-[#102d2f]/70 rounded-xl p-5 sm:p-8 lg:p-10 shadow-lg text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-300">
            Our Values
          </h2>
          <GoldDivider />
          <ul className="space-y-4 text-gray-300 text-base sm:text-lg lg:text-xl text-left">
            <li><span className="text-yellow-400 font-semibold">Transparency:</span> We believe in honest pricing, clear sourcing, and open communication.</li>
            <li><span className="text-yellow-400 font-semibold">Genuine Quality:</span> We import only authentic European auto parts, ensuring durability and performance.</li>
            <li><span className="text-yellow-400 font-semibold">Fast Service:</span> We work efficiently to source and deliver spare parts island-wide, minimizing downtime.</li>
            <li><span className="text-yellow-400 font-semibold">Global Reach:</span> Through direct UK partnerships, we bring premium auto parts right to Sri Lanka’s doorstep.</li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="bg-[#142b2e]/70 rounded-xl p-5 sm:p-8 lg:p-10 shadow-lg text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-300">
            Why Choose Us?
          </h2>
          <GoldDivider />
          <ul className="space-y-4 text-gray-300 text-base sm:text-lg lg:text-xl text-left">
            <li><b>Used European Auto Parts:</b> We import used quality spare parts for top European brands including Range Rover, BMW, Mercedes-Benz, Audi, Volvo, Jaguar and more.</li>
            <li><b>Genuine European Car Parts Only:</b> Guaranteed 100% authentic parts sourced directly from the UK.</li>
            <li><b>Flexible Air & Sea Cargo Options:</b> On-demand import using fast air freight or cost-effective sea cargo according to customer needs.</li>
            <li><b>Trusted Sourcing Partners:</b> Our strong UK supplier network delivers premium spare parts with reliable island-wide delivery.</li>
          </ul>

          {/* Example image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <img src="/parts.jpg" alt="Spare Parts" className="rounded-xl shadow-lg object-cover" />
            <img src="/delivery.jpg" alt="Delivery" className="rounded-xl shadow-lg object-cover" />
            <img src="/cargo.jpg" alt="Cargo" className="rounded-xl shadow-lg object-cover" />
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate("/contact")}
            className="px-8 sm:px-10 py-3 sm:py-4 bg-yellow-400 text-black text-lg sm:text-xl lg:text-2xl font-semibold 
                       rounded-xl shadow-md hover:bg-yellow-300 transition"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
}
