import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0B1C1F] text-white py-12 px-6">
      {/* Main Grid */}
      <div className="grid gap-8 pb-10 mx-auto border-b border-gray-700 max-w-7xl md:grid-cols-4">
        {/* Company Info */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-yellow-400">Company</h4>
          <p className="flex items-center gap-2 text-sm text-gray-300">
            <FaMapMarkerAlt className="text-yellow-400" />
            123 Luxury Drive, Automotive District, New York, NY 10001
          </p>
          <p className="flex items-center gap-2 mt-3 text-sm text-gray-300">
            <FaPhoneAlt className="text-yellow-400" />
            +1 (888) 555-PART
          </p>
          <p className="flex items-center gap-2 mt-3 text-sm text-gray-300">
            <FaEnvelope className="text-yellow-400" />
            inquiry@luxuryautoparts.com
          </p>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-yellow-400">Business Hours</h4>
          <p className="text-sm text-gray-300">Mon–Fri: 9 AM – 6 PM</p>
          <p className="mt-1 text-sm text-gray-300">Sat: 10 AM – 4 PM</p>
          <p className="mt-1 text-sm text-gray-300">Emergency services available 24/7</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-yellow-400">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/home" className="hover:text-yellow-400">Home</a></li>
            <li><a href="/about" className="hover:text-yellow-400">About</a></li>
            <li><a href="/services" className="hover:text-yellow-400">Services</a></li>
            <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
          </ul>
        </div>

        {/* Google Map Placeholder */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-yellow-400">Find Us</h4>
          <div className="w-full h-32 bg-gray-700 rounded-lg"></div>
          <button className="px-4 py-2 mt-3 text-sm text-white transition bg-gray-700 rounded hover:bg-yellow-500 hover:text-black">
            Get Directions
          </button>
        </div>
      </div>

      {/* Connect With Us */}
      <div className="mt-10 text-center">
        <h4 className="mb-6 text-lg font-semibold text-yellow-400">Connect With Us</h4>
        <div className="flex items-center justify-center gap-6">
          {[
            {
              icon: FaFacebookF,
              url: "https://facebook.com",
              label: "Facebook",
            },
            {
              icon: FaInstagram,
              url: "https://instagram.com",
              label: "Instagram",
            },
            {
              icon: FaWhatsapp,
              url: "https://wa.me/1234567890",
              label: "WhatsApp",
            },
            {
              icon: FaTiktok,
              url: "https://tiktok.com",
              label: "TikTok",
            },
          ].map(({ icon: Icon, url, label }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-10 h-10 text-yellow-400 transition border border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="pt-6 mt-10 text-sm text-center text-gray-400 border-t border-gray-700">
        <p>© 2025 Luxury Auto Parts Inquiry. All Rights Reserved.</p>
       
      </div>
    </footer>
  );
};

export default Footer;
