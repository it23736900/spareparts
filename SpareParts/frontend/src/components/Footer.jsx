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
import GetQuotationForm from './GetQuotationForm';

const Footer = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <footer className="bg-[#0B1C1F] text-white py-12 px-6">
      {/* Main Grid */}
      <div className="grid gap-8 pb-10 mx-auto border-b border-gray-700 max-w-7xl md:grid-cols-4">
        {/* Company Info */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-yellow-400">Company</h4>
          <p className="flex items-center gap-2 text-sm text-gray-300">
            <FaMapMarkerAlt className="text-yellow-400" />
            No.63, Buthgamuwa Road, Rajagiriya, 10100, Sri Lanka.
          </p>
          <p className="flex items-center gap-2 mt-3 text-sm text-gray-300">
            <FaPhoneAlt className="text-yellow-400" />
            +1 (888) 555-PART
          </p>
          <p className="flex items-center gap-2 mt-3 text-sm text-gray-300">
            <FaEnvelope className="text-yellow-400" />
            inquiry@luxuryautoparts.com
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-yellow-500 text-black px-3 py-2 rounded hover:bg-yellow-600 w-full font-semibold text-base transition"
          >
            Get Quotation
          </button>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-yellow-400">Business Hours</h4>
          <p className="text-sm text-gray-300">Mon–Sat: 8.30 AM – 5.30 PM</p>
          <p className="mt-1 text-sm text-gray-300">Sun : Closed</p>
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
      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
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
