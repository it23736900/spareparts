import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

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
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 bg-black/90 backdrop-blur-sm sm:px-8"
      style={{
        backgroundImage: "url('/images/contact-bg.jpg')", // 🔹 car bg
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto
                   rounded-2xl bg-black/30 border border-[#00ffb3]/40 
                   backdrop-blur-2xl p-10 sm:p-14 lg:p-16
                   shadow-[0_0_25px_rgba(0,255,179,0.15)]"
        data-aos="fade-up"
      >
        {/* Heading */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-wide text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300">
            We’re here to help you with inquiries, premium car part requests, or 
            after-sales support. Send us a message and our team will respond quickly 
            to ensure you experience EuroTec’s trusted service.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 mt-14 lg:grid-cols-2 gap-14">
          {/* Left: Info */}
          <div className="space-y-10 text-gray-200">
            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-[#00ffb3] text-2xl" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a
                  href="mailto:Info@eurotec.lk"
                  className="text-lg text-white hover:text-[#00ffb3] transition"
                >
                  Info@eurotec.lk
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaPhoneAlt className="text-[#00ffb3] text-2xl" />
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <a
                  href="tel:+94723085654"
                  className="text-lg text-white hover:text-[#00ffb3] transition"
                >
                  +94 7230 85654
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-[#00ffb3] text-2xl" />
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <a
                  href="https://maps.google.com?q=No.63,+Buthgamuwa+Road,+Rajagiriya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-white hover:text-[#00ffb3] transition"
                >
                  No.63, Buthgamuwa Road, Rajagiriya, 10100, Sri Lanka
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-5 py-3 rounded-lg bg-black/20 border border-[#00ffb3]/30 
                         text-white placeholder-gray-400 
                         focus:outline-none focus:ring-1 focus:ring-[#00ffb3] 
                         transition backdrop-blur-md"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-5 py-3 rounded-lg bg-black/20 border border-[#00ffb3]/30 
                         text-white placeholder-gray-400 
                         focus:outline-none focus:ring-1 focus:ring-[#00ffb3] 
                         transition backdrop-blur-md"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              required
              className="w-full px-5 py-3 rounded-lg bg-black/20 border border-[#00ffb3]/30 
                         text-white placeholder-gray-400 
                         focus:outline-none focus:ring-1 focus:ring-[#00ffb3] 
                         transition backdrop-blur-md"
            ></textarea>

            {/* Error */}
            {error && (
              <p className="text-sm font-medium text-red-400">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-lg font-semibold 
                         text-white border border-[#00ffb3] 
                         bg-transparent hover:bg-[#00ffb3]/10 
                         transition duration-300 backdrop-blur-md
                         hover:shadow-[0_0_20px_rgba(0,255,179,0.25)]"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Success floating card */}
        {success && (
          <div className="absolute top-6 right-6 bg-black/70 border border-[#00ffb3] 
                          backdrop-blur-lg px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
            <p className="text-[#00ffb3] font-semibold">Message Sent Successfully!</p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-sm text-center text-gray-400">
          <p>
            EuroTec — Premium European Auto Parts Supplier. Delivering trusted 
            quality and service across Sri Lanka.
          </p>
        </div>
      </div>
    </div>
  );
}
