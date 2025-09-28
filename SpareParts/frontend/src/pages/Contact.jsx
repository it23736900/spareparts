
// src/pages/Contact.jsx
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt,} from "react-icons/fa";

export default function Contact() {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // ✅ Lock body scroll
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Updated handleSubmit for WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    // SpareParts WhatsApp number (international format, no +, spaces, or dashes)
    const phone = "+94770556247"; 
    const text = `New inquiry from ${form.name} (${form.email}): %0A${form.message}`;

    // Open WhatsApp Web/App with pre-filled message
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");

    // Reset form + show popup
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 backdrop-blur-sm sm:px-8"
      style={{
        background: `linear-gradient(135deg, #000000 0%, #000000 70%, #014421 100%)`,
        backgroundImage: "url('/images/contact-bg.jpg')", // optional
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl h-[95vh] overflow-y-auto
                   rounded-2xl bg-black/50 border border-[#014421] 
                   backdrop-blur-2xl px-4 py-10 sm:px-8 sm:py-12 lg:px-16 lg:py-20
                   shadow-[0_0_25px_rgba(1,68,33,0.4),inset_0_0_10px_rgba(255,255,255,0.03)]"
        data-aos="zoom-in"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="sticky top-3 ml-auto z-50
             text-[#00ffb3] hover:text-white
             transition-transform transform hover:scale-110
             bg-black/40 rounded-full w-8 h-8 flex items-center justify-center
             shadow-[0_0_10px_rgba(0,255,179,0.6)]"
          style={{
            top: "calc(env(safe-area-inset-top, 0px) + 0.75rem)",
            right: "1rem",
          }}
        >
          ✕
        </button>

        {/* Heading */}
        <div className="space-y-4 text-center">
          <h1
            className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text sm:text-4xl lg:text-5xl"
            style={{ backgroundImage: "linear-gradient(white, white, #111111)" }}
          >
            Contact Us
          </h1>

          <p className="max-w-3xl mx-auto text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
            Have inquiries or need premium European car parts?  
            Reach out to us and our team will respond quickly with trusted support.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-10 mt-10 sm:mt-14 lg:grid-cols-2 sm:gap-14">
          {/* Left: Info */}
          <div className="space-y-8 text-gray-200 sm:space-y-10">
            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-[#E3C85C] text-xl sm:text-2xl" />
              <div>
                <p className="text-xs text-gray-400 sm:text-sm">Email</p>
                <a
                  href="mailto:Info@eurotec.lk"
                  className="text-base sm:text-lg text-white hover:text-[#E3C85C] transition"
                >
                  Info@eurotec.lk
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaPhoneAlt className="text-[#E3C85C] text-xl sm:text-2xl" />
              <div>
                <p className="text-xs text-gray-400 sm:text-sm">Phone</p>
                <a
                  href="tel:+94770556247"
                  className="text-base sm:text-lg text-white hover:text-[#E3C85C] transition"
                >
                  +94 770 556 247
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-[#E3C85C] text-xl sm:text-2xl" />
              <div>
                <p className="text-xs text-gray-400 sm:text-sm">Address</p>
                <a
                  href="https://maps.google.com?q=No.63,+Buthgamuwa+Road,+Rajagiriya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg text-white hover:text-[#E3C85C] transition"
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
              className="w-full px-4 sm:px-5 py-3 rounded-lg 
                         bg-black/40 border border-[#014421] 
                         text-white placeholder-gray-400 
                         focus:outline-none focus:ring-1 focus:ring-[#E3C85C] 
                         transition backdrop-blur-md text-sm sm:text-base"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 sm:px-5 py-3 rounded-lg 
                         bg-black/40 border border-[#014421] 
                         text-white placeholder-gray-400 
                         focus:outline-none focus:ring-1 focus:ring-[#E3C85C] 
                         transition backdrop-blur-md text-sm sm:text-base"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              required
              className="w-full px-4 sm:px-5 py-3 rounded-lg 
                         bg-black/40 border border-[#014421] 
                         text-white placeholder-gray-400 
                         focus:outline-none focus:ring-1 focus:ring-[#E3C85C] 
                         transition backdrop-blur-md text-sm sm:text-base"
            ></textarea>

            {/* Error */}
            {error && (
              <p className="text-sm font-medium text-red-400">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-base sm:text-lg font-semibold 
                         text-white border border-[#014421] 
                         bg-transparent hover:bg-[#014421]/20 
                         transition duration-300 backdrop-blur-md
                         hover:shadow-[0_0_18px_rgba(227,200,92,0.25)]"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Success floating card */}
        {success && (
          <div className="absolute top-6 right-6 bg-black/80 border border-[#E3C85C] 
                          backdrop-blur-lg px-5 py-3 rounded-lg shadow-lg animate-fadeIn">
            <p className="text-[#E3C85C] font-semibold">Opening WhatsApp…</p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-10 text-xs text-center text-gray-400 sm:mt-12 sm:text-sm">
          <p>
            EuroTec Premium European Auto Parts Supplier. Delivering trusted 
            quality and service across Sri Lanka.
          </p>
        </div>
      </div>
    </div>
  );
}
