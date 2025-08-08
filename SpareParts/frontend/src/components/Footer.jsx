import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import GetQuotationForm from './GetQuotationForm';
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-12 px-6 border-t border-emerald-600/20">
      {/* Main Grid */}
      <div className="grid gap-8 pb-10 mx-auto border-b border-gray-700 max-w-7xl md:grid-cols-4">
        {/* Company Info */}
        <div data-aos="fade-up">
          <h4 className="mb-4 text-lg font-semibold text-emerald-400">Company</h4>
          <p className="flex items-center gap-2 text-sm text-gray-300">
            <FaMapMarkerAlt className="text-emerald-400" />
            No.63, Buthgamuwa Road, Rajagiriya, 10100, Sri Lanka.
          </p>
          <p className="flex items-center gap-2 mt-3 text-sm text-gray-300">
            <FaPhoneAlt className="text-emerald-400" />
            +1 (888) 555-PART
          </p>
          <p className="flex items-center gap-2 mt-3 text-sm text-gray-300">
            <FaEnvelope className="text-emerald-400" />
            info@eurotec.lk 
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-3 rounded-xl w-full font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-600/25"
          >
            Inquire Now
          </button>
        </div>

        {/* Business Hours */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h4 className="mb-4 text-lg font-semibold text-emerald-400">Business Hours</h4>
          <p className="text-sm text-gray-300">Mon–Sat: 8.30 AM – 5.30 PM</p>
          <p className="mt-1 text-sm text-gray-300">Sun : Closed</p>
          <p className="mt-1 text-sm text-gray-300">Emergency services available 24/7</p>
        </div>

        {/* Quick Links */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h4 className="mb-4 text-lg font-semibold text-emerald-400">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/home" className="hover:text-emerald-400 transition-colors duration-200">Home</a></li>
            <li><a href="/about" className="hover:text-emerald-400 transition-colors duration-200">About</a></li>
            <li><a href="/services" className="hover:text-emerald-400 transition-colors duration-200">Services</a></li>
            <li><a href="/contact" className="hover:text-emerald-400 transition-colors duration-200">Contact</a></li>
          </ul>
        </div>

        {/* Find Us - Updated Map */}
        {/* Find Us - Updated Map with AOS + Responsiveness */}
<div data-aos="zoom-in" data-aos-delay="300">
  <h4 className="mb-4 text-lg font-semibold text-emerald-400">Find Us</h4>
  <div className="w-full h-32 md:h-48 lg:h-64 rounded-lg overflow-hidden shadow-md">
    <iframe
      title="Map to Our Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2162.1566709123817!2d79.900613267168!3d6.910282742519038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259f2755be2fd%3A0x42f57e57435a8ba8!2s63%20Buthgamuwa%20Rd%2C%20Sri%20Jayawardenepura%20Kotte!5e0!3m2!1sen!2slk!4v1754019294021!5m2!1sen!2slk"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
  <a
    href="https://maps.google.com?q=No.63,+Buthgamuwa+Road,+Rajagiriya"
    target="_blank"
    rel="noopener noreferrer"
    className="block mt-3 px-4 py-2 text-sm text-white bg-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-700 hover:text-white transition-all duration-300 transform hover:scale-105"
  >
    Get Directions
  </a>
</div>

      </div>

      {/* Connect With Us */}
      <div className="mt-10 text-center" data-aos="fade-up" data-aos-delay="400">
        <h4 className="mb-6 text-lg font-semibold text-emerald-400">Connect With Us</h4>
        <div className="flex items-center justify-center gap-6">
          {[
            { icon: FaFacebookF, url: "https://facebook.com", label: "Facebook" },
            { icon: FaInstagram, url: "https://instagram.com", label: "Instagram" },
            { icon: FaWhatsapp, url: "https://wa.me/94785264854", label: "WhatsApp" },
            { icon: FaTiktok, url: "https://tiktok.com", label: "TikTok" },
          ].map(({ icon: Icon, url, label }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-10 h-10 text-emerald-400 transition border border-emerald-400 rounded-full hover:bg-emerald-400 hover:text-black"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="pt-6 mt-10 text-sm text-center text-gray-400 border-t border-gray-700" data-aos="fade-up" data-aos-delay="500">
        <p>© 2025 Luxury Auto Parts Inquiry. All Rights Reserved.</p>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl relative border border-gray-700/50">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 text-2xl transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700/50"
            >
              &times;
            </button>
            <GetQuotationForm />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
