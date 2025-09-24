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
import { FaTimes } from "react-icons/fa"; // close button icon

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate("/");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center 
                 px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-10 
                 bg-gradient-to-br from-[#051111] via-[#0B1C1F] to-[#050A0A] 
                 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        className="relative text-white rounded-2xl 
                   bg-[#051111]/80 border border-[#00ffb3]/20 backdrop-blur-xl
                   shadow-[0_0_25px_rgba(0,255,179,0.06),inset_0_0_10px_rgba(255,255,255,0.03)]
                   w-full max-w-7xl h-[95vh] overflow-y-auto
                   p-4 sm:p-6 md:p-10 lg:p-16 
                   space-y-8 sm:space-y-10 lg:space-y-14"
      >
        {/* Close button (safe-area aware) */}
        <button
          onClick={handleClose}
          className="absolute z-50 text-emerald-400 hover:text-emerald-300 
                     transition-transform transform hover:scale-110 
                     bg-black/40 rounded-full p-2"
          style={{
            top: "calc(env(safe-area-inset-top, 0px) + 1rem)",
            right: "1rem",
          }}
        >
          <FaTimes size={26} />
        </button>

        {/* Heading */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white">
            Our Services / How It Works
          </h1>
          <p className="max-w-3xl mx-auto text-xs sm:text-sm lg:text-lg text-gray-300 leading-relaxed">
            At EuroTec, we deliver a transparent and reliable process from inquiry to delivery.  
            Every step is carefully managed to ensure premium service and trusted quality.
          </p>
        </div>

        {/* Step-by-Step */}
        <section>
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-center text-white">
            Step-by-Step Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                          gap-3 sm:gap-5 lg:gap-6 mt-6 sm:mt-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-[#051111]/70 rounded-xl border border-[#00ffb3]/25 
                           p-4 sm:p-6 lg:p-8 backdrop-blur-md
                           shadow-[0_5px_18px_rgba(0,0,0,0.6),inset_0_0_8px_rgba(255,255,255,0.03)]
                           hover:shadow-[0_10px_25px_rgba(0,255,179,0.25)]
                           hover:border-[#00ffb3]/50
                           transition-all duration-200 transform hover:scale-[1.02]"
              >
                <div className="text-[#00ffb3] text-2xl sm:text-3xl mb-3">
                  {step.icon}
                </div>
                <h4 className="mb-1 text-sm sm:text-base lg:text-lg font-bold text-white">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping */}
        <section className="bg-[#051111]/70 rounded-xl border border-[#00ffb3]/25 
                            p-4 sm:p-6 lg:p-10 backdrop-blur-md
                            shadow-[0_5px_18px_rgba(0,0,0,0.6),inset_0_0_8px_rgba(255,255,255,0.03)]">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center text-white">
            Shipping & Delivery Methods
          </h2>
          <ul className="pl-4 sm:pl-6 mt-4 sm:mt-6 space-y-1 sm:space-y-2 
                         text-xs sm:text-sm lg:text-lg text-gray-300 list-disc text-left">
            <li><span className="text-[#00ffb3]">Sea Cargo:</span> Larger, cost-effective shipments</li>
            <li><span className="text-[#00ffb3]">Air Cargo:</span> Fast delivery for urgent orders</li>
            <li><span className="text-[#00ffb3]">Courier Service:</span> Ideal for smaller parts</li>
          </ul>
        </section>

        {/* Installation */}
        <section className="bg-[#051111]/70 rounded-xl border border-[#00ffb3]/25 
                            p-4 sm:p-6 lg:p-10 backdrop-blur-md
                            shadow-[0_5px_18px_rgba(0,0,0,0.6),inset_0_0_8px_rgba(255,255,255,0.03)]">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center text-white">
            Installation Support
          </h2>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm lg:text-lg text-gray-300 leading-relaxed text-left">
            We work with{" "}
            <span className="text-[#00ffb3] font-semibold">
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
