import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTools,
  FaShippingFast,
  FaCreditCard,
  FaClipboardCheck,
} from "react-icons/fa";

const steps = [
  { icon: <FaClipboardCheck />, title: "Submit Your Inquiry", desc: "Share the required spare parts details with us." },
  { icon: <FaTools />, title: "We Get in Touch", desc: "Our team reviews your request and confirms additional details." },
  { icon: <FaCreditCard />, title: "Receive a Quote", desc: "We provide a detailed quote based on your request." },
  { icon: <FaClipboardCheck />, title: "Order Confirmation", desc: "Confirm your order details with us." },
  { icon: <FaCreditCard />, title: "Advance Payment", desc: "Make an initial payment to begin processing." },
  { icon: <FaClipboardCheck />, title: "Order Confirmation Receipt", desc: "Receive official confirmation of your order." },
  { icon: <FaShippingFast />, title: "Logistics Coordination", desc: "We arrange safe and efficient import from the UK." },
  { icon: <FaCreditCard />, title: "Settle Balance Payment", desc: "Complete the final payment upon shipment." },
  { icon: <FaShippingFast />, title: "Parts Delivered", desc: "Receive your parts quickly and securely within 3 to 4 days." },
];

export default function Services() {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate("/");
    }
  };

  const GoldDivider = () => (
    <div
      className="h-[2px] w-32 sm:w-40 mx-auto mt-1 mb-3 rounded-full"
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
                   rounded-2xl shadow-[0_0_60px_rgba(16,94,66,0.8)] border border-green-700/40
                   w-full max-w-7xl max-h-[94vh] overflow-y-auto
                   p-4 sm:p-8 lg:p-14 space-y-10 sm:space-y-14 scroll-smooth"
        data-aos="zoom-in"
      >
        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-400 text-center">
          Our Services / How It Works
        </h1>
        <GoldDivider />

        {/* Step-by-Step */}
        <section>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-yellow-300 text-center">
            Step-by-Step Process
          </h2>
          <GoldDivider />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-black/40 rounded-xl border border-green-600/50 p-5 sm:p-6 
                           shadow-md hover:shadow-green-400/30 transition-all duration-300 
                           hover:scale-105 text-left"
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
              >
                <div className="text-yellow-400 text-xl sm:text-2xl mb-2 sm:mb-3">
                  {step.icon}
                </div>
                <h4 className="text-base sm:text-lg font-bold mb-1">{step.title}</h4>
                <p className="text-sm sm:text-base text-gray-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping */}
        <section className="bg-[#102d2f]/80 rounded-xl p-5 sm:p-8 lg:p-10 shadow-lg border border-green-600/50">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-yellow-300 text-center">
            Shipping & Delivery Methods
          </h2>
          <GoldDivider />
          <ul className="list-disc pl-5 sm:pl-6 text-gray-300 space-y-1 sm:space-y-2 text-left text-sm sm:text-lg lg:text-xl">
            <li><span className="text-yellow-400">Sea Cargo:</span> Larger, cost-effective shipments</li>
            <li><span className="text-yellow-400">Air Cargo:</span> Fast delivery for urgent orders</li>
            <li><span className="text-yellow-400">Courier Service:</span> Ideal for smaller parts</li>
          </ul>
        </section>

        {/* Installation */}
        <section className="bg-[#142b2e]/80 rounded-xl p-5 sm:p-8 lg:p-10 shadow-lg border border-green-600/50">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-yellow-300 text-center">
            Installation Support
          </h2>
          <GoldDivider />
          <p className="text-gray-300 text-sm sm:text-lg lg:text-xl leading-relaxed text-left">
            We work with{" "}
            <span className="text-yellow-400 font-semibold">
              recommended partner garages
            </span>{" "}
            across Sri Lanka. Let us know your location and we’ll connect you to a
            trusted mechanic for professional installation of your parts.
          </p>
        </section>
      </div>
    </div>
  );
}
