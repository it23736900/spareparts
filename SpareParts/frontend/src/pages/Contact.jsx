import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate("/"); // go home when clicked outside
    }
  };

  // Gold divider (same as About Us)
  const GoldDivider = () => (
    <div
      className="h-[2px] w-40 mx-auto mt-0.5 mb-2 rounded-full"
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
                   w-full max-w-4xl max-h-[94vh] overflow-y-auto
                   p-6 sm:p-10 lg:p-14 space-y-10 scroll-smooth"
        data-aos="zoom-in"
      >
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-400 text-center">
          Contact Us
        </h1>
        <GoldDivider />

        {/* Contact Info */}
        <section className="bg-[#102d2f]/80 rounded-xl p-6 sm:p-8 shadow-lg space-y-4">
          <p>
            📧 Email:{" "}
            <a
              href="mailto:Info@eurotec.lk"
              className="text-green-400 hover:underline"
            >
              Info@eurotec.lk
            </a>
          </p>
          <p>
            📞 Phone:{" "}
            <a href="tel:+94723085654" className="text-green-400 hover:underline">
              +94723085654
            </a>
          </p>
          <p>
            📍 Address:{" "}
            <span className="text-gray-300">
              No.63, Buthgamuwa Road, Rajagiriya, 10100, Sri Lanka
            </span>
          </p>
        </section>

        {/* Send Message */}
        <section className="bg-[#142b2e]/80 rounded-xl p-6 sm:p-8 shadow-lg text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-300">
            Send Us a Message
          </h2>
          <GoldDivider />

          <form className="mt-6 space-y-5 text-left">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-600/40 
                         text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-600/40 
                         text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-green-500"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-600/40 
                         text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-green-500"
            ></textarea>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-yellow-400 text-black text-lg font-semibold 
                           rounded-xl shadow-md hover:bg-yellow-300 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
