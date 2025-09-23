// src/pages/Contact.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

export default function Contact() {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate("/");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSuccess(true);

    // Clear form after submit
    setForm({ name: "", email: "", message: "" });

    // Hide success after 4s
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 
                 bg-gradient-to-br from-[#051111] via-[#0B1C1F] to-[#050A0A] 
                 backdrop-blur-sm sm:px-8"
      style={{
        backgroundImage: "url('/images/contact-bg.jpg')", // optional bg
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto
                   rounded-2xl bg-[#051111]/80 border border-[#00ffb3]/30 
                   backdrop-blur-2xl p-8 sm:p-12 lg:p-16
                   shadow-[0_0_25px_rgba(0,255,179,0.08),inset_0_0_10px_rgba(255,255,255,0.03)]"
        data-aos="fade-up"
      >
        {/* Close button (emerald X only) */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-emerald-400 hover:text-emerald-300 
                     transition-transform transform hover:scale-110"
        >
          <FaTimes size={26} />
        </button>

        {/* Heading */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-wide text-white sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="max-w-3xl mx-auto text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
            We’re here to help you with inquiries, premium car part requests, or 
            after-sales support. Send us a message and our team will respond quickly 
            to ensure you experience EuroTec’s trusted service.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-10 mt-10 sm:mt-14 lg:grid-cols-2 sm:gap-14">
          {/* Left: Info */}
          <div className="space-y-8 text-gray-200 sm:space-y-10">
            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-[#00ffb3] text-xl sm:text-2xl" />
              <div>
                <p className="text-xs text-gray-400 sm:text-sm">Email</p>
                <a
                  href="mailto:Info@eurotec.lk"
                  className="text-base sm:text-lg text-white hover:text-[#00ffb3] transition"
                >
                  Info@eurotec.lk
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaPhoneAlt className="text-[#00ffb3] text-xl sm:text-2xl" />
              <div>
                <p className="text-xs text-gray-400 sm:text-sm">Phone</p>
                <a
                  href="tel:+94723085654"
                  className="text-base sm:text-lg text-white hover:text-[#00ffb3] transition"
                >
                  +94 7230 85654
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-[#00ffb3] text-xl sm:text-2xl" />
              <div>
                <p className="text-xs text-gray-400 sm:text-sm">Address</p>
                <a
                  href="https://maps.google.com?q=No.63,+Buthgamuwa+Road,+Rajagiriya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg text-white hover:text-[#00ffb3] transition"
                >
                  No.63, Buthgamuwa Road, Rajagiriya, 10100, Sri Lanka
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 sm:px-5 py-3 rounded-lg bg-[#051111]/60 border border-[#00ffb3]/30 
                         text-white placeholder-gray-400 
                         focus:outline-none focus:ring-1 focus:ring-[#00ffb3] 
                         transition backdrop-blur-md text-sm sm:text-base"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 sm:px-5 py-3 rounded-lg bg-[#051111]/60 border border-[#00ffb3]/30 
                         text-white placeholder-gray-400 
                         focus:outline-none focus:ring-1 focus:ring-[#00ffb3] 
                         transition backdrop-blur-md text-sm sm:text-base"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              required
              className="w-full px-4 sm:px-5 py-3 rounded-lg bg-[#051111]/60 border border-[#00ffb3]/30 
                         text-white placeholder-gray-400 
                         focus:outline-none focus:ring-1 focus:ring-[#00ffb3] 
                         transition backdrop-blur-md text-sm sm:text-base"
            ></textarea>

            {/* Error */}
            {error && (
              <p className="text-sm font-medium text-red-400">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-base sm:text-lg font-semibold 
                         text-white border border-[#00ffb3] 
                         bg-transparent hover:bg-[#00ffb3]/10 
                         transition duration-300 backdrop-blur-md
                         hover:shadow-[0_0_18px_rgba(0,255,179,0.2)]"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Success floating card */}
        {success && (
          <div className="absolute top-6 right-6 bg-[#051111]/90 border border-[#00ffb3] 
                          backdrop-blur-lg px-5 py-3 rounded-lg shadow-lg animate-fadeIn">
            <p className="text-[#00ffb3] font-semibold">Message Sent Successfully!</p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-10 text-xs text-center text-gray-400 sm:mt-12 sm:text-sm">
          <p>
            EuroTec — Premium European Auto Parts Supplier. Delivering trusted 
            quality and service across Sri Lanka.
          </p>
        </div>
      </div>
    </div>
  );
}
