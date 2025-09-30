// src/pages/Services.jsx
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiFileText,
  FiMessageSquare,
  FiDollarSign,
  FiCheckCircle,
  FiShield,
  FiPackage,
  FiTruck,
  FiTool,
  FiCreditCard,
} from "react-icons/fi";


const steps = [
  { icon: <FiFileText />, title: "Submit Your Inquiry", desc: "Share the required spare parts details with us." },
  { icon: <FiMessageSquare />, title: "We Get in Touch", desc: "Our team reviews your request and confirms additional details." },
  { icon: <FiDollarSign />, title: "Receive a Quote", desc: "We provide a detailed quote based on your request." },
  { icon: <FiCheckCircle />, title: "Order Confirmation", desc: "Confirm your order details with us." },
  { icon: <FiCreditCard />, title: "Advance Payment", desc: "Make an initial payment to begin processing." },
  { icon: <FiShield />, title: "Order Confirmation Receipt", desc: "Receive official confirmation of your order." },
  { icon: <FiTruck />, title: "Logistics Coordination", desc: "We arrange safe and efficient import from the UK." },
  { icon: <FiTool />, title: "Settle Balance Payment", desc: "Complete the final payment upon shipment." },
  { icon: <FiPackage />, title: "Parts Delivered", desc: "Receive your parts quickly and securely within 3 to 4 days." },
];

export default function Services() {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) navigate("/");
  };
  const handleClose = () => navigate("/");

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center 
                 px-3 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12
                 bg-gradient-to-br from-[#000000] via-[#0B1C1F] to-[#014421] 
                 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        className="relative text-white rounded-2xl
             bg-black/50 border border-[#014421]/60 backdrop-blur-2xl
             shadow-[0_0_30px_rgba(1,68,33,0.35),inset_0_0_12px_rgba(255,255,255,0.03)]
             w-full max-w-6xl h-[90vh] overflow-y-auto px-4 py-10 sm:px-8 sm:py-12 lg:px-16 lg:py-20"
         data-aos="zoom-in" 
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 ml-auto z-50
           text-[#00ffb3] hover:text-white
             transition-transform transform hover:scale-110
             bg-black/40 rounded-full w-8 h-8 flex items-center justify-center
             shadow-[0_0_10px_rgba(0,255,179,0.6)]"
          style={{
            top: "max(env(safe-area-inset-top, 0px), 0.75rem)",
            right: "0.75rem",
          }}
        >
           ✕
        </button>

        {/* Heading */}
        <div className="space-y-3 text-center">
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-5xl">
            Our Services
          </h1>
          <p className="max-w-3xl mx-auto text-xs leading-relaxed text-gray-300 sm:text-sm lg:text-lg">
            At EuroTec, we deliver a transparent and reliable process from inquiry to delivery.  
            Every step is carefully managed to ensure premium service and trusted quality.
          </p>
        </div>

        {/* Step-by-Step */}
        <section>
          <h2 className="text-lg font-semibold text-center text-white sm:text-2xl lg:text-3xl">
            Step-by-Step Process
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8 sm:mt-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-[#051111]/70 rounded-xl border border-[#014421]/50 
                           p-5 sm:p-6 lg:p-8 backdrop-blur-md
                           shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_0_8px_rgba(255,255,255,0.04)]
                           hover:shadow-[0_10px_28px_rgba(227,200,92,0.25)]
                           hover:border-[#E3C85C]/50
                           transition-all duration-300 transform hover:scale-[1.03]"
              >
                <div className="text-[#E3C85C] text-2xl sm:text-3xl mb-3">
                  {step.icon}
                </div>
                <h4 className="mb-1 text-sm font-bold text-white sm:text-base lg:text-lg">
                  {step.title}
                </h4>
                <p className="text-xs leading-relaxed text-gray-300 sm:text-sm lg:text-base">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping */}
        <section className="bg-[#051111]/70 rounded-xl border border-[#014421]/50 
                            p-5 sm:p-6 lg:p-10 backdrop-blur-md
                            shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_0_8px_rgba(255,255,255,0.04)]">
          <h2 className="text-lg font-bold text-center text-white sm:text-2xl lg:text-3xl">
            Shipping & Delivery Methods
          </h2>
          <ul className="pl-5 mt-4 space-y-2 text-xs text-left text-gray-300 list-disc sm:pl-6 sm:mt-6 sm:space-y-3 sm:text-sm lg:text-lg">
            <li><span className="text-[#E3C85C]">Sea Cargo:</span> Larger, cost-effective shipments</li>
            <li><span className="text-[#E3C85C]">Air Cargo:</span> Fast delivery for urgent orders</li>
            <li><span className="text-[#E3C85C]">Courier Service:</span> Ideal for smaller parts</li>
          </ul>
        </section>

        {/* Installation */}
        <section className="bg-[#051111]/70 rounded-xl border border-[#014421]/50 
                            p-5 sm:p-6 lg:p-10 backdrop-blur-md
                            shadow-[0_6px_20px_rgba(0,0,0,0.6),inset_0_0_8px_rgba(255,255,255,0.04)]">
          <h2 className="text-lg font-bold text-center text-white sm:text-2xl lg:text-3xl">
            Installation Support
          </h2>
          <p className="mt-4 text-xs leading-relaxed text-left text-gray-300 sm:mt-6 sm:text-sm lg:text-lg">
            We work with{" "}
            <span className="text-[#E3C85C] font-semibold">
              recommended partner garages
            </span>{" "}
            across Sri Lanka. Let us know your location and we’ll connect you with a
            trusted mechanic for professional installation of your parts.
          </p>
        </section>
      </div>
    </div>
  );
}
