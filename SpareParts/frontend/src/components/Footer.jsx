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

const Footer = ({ onInquire }) => {
  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-8 px-6 border-t border-emerald-600/20">
      {/* Main Grid */}
      <div className="grid gap-6 pb-6 mx-auto border-b border-gray-700 max-w-6xl md:grid-cols-4">
        {/* Company Info */}
        <div>
          <h4 className="mb-3 text-base font-semibold text-emerald-400">Company</h4>
          <p className="flex items-center gap-2 text-sm text-gray-300">
            <FaMapMarkerAlt className="text-emerald-400" />
            No.63, Buthgamuwa Road, Rajagiriya, 10100, Sri Lanka.
          </p>
          <p className="flex items-center gap-2 mt-2 text-sm text-gray-300">
            <FaPhoneAlt className="text-emerald-400" />
            +1 (888) 555-PART
          </p>
          <p className="flex items-center gap-2 mt-2 text-sm text-gray-300">
            <FaEnvelope className="text-emerald-400" />
            info@eurotec.lk
          </p>

          <button
            type="button"
            onClick={() => onInquire?.("")}
            className="mt-5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-3.5 py-2.5 rounded-lg w-full font-semibold text-sm transition-all duration-200 shadow-md shadow-emerald-600/20"
          >
            Inquire Now
          </button>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="mb-3 text-base font-semibold text-emerald-400">Business Hours</h4>
          <p className="text-sm text-gray-300">Mon–Sat: 8.30 AM – 5.30 PM</p>
          <p className="mt-1 text-sm text-gray-300">Sun : Closed</p>
          <p className="mt-1 text-sm text-gray-300">Emergency services available 24/7</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-3 text-base font-semibold text-emerald-400">Quick Links</h4>
          <ul className="space-y-1.5 text-sm text-gray-300">
            <li><a href="/home" className="hover:text-emerald-400 transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-emerald-400 transition-colors">About</a></li>
            <li><a href="/services" className="hover:text-emerald-400 transition-colors">Services</a></li>
            <li><a href="/contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Find Us */}
        <div>
          <h4 className="mb-3 text-base font-semibold text-emerald-400">Find Us</h4>
          <div className="w-full h-28 md:h-40 lg:h-48 rounded-md overflow-hidden shadow">
            <iframe
              title="Map to Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2162.1566709123817!2d79.900613267168!3d6.910282742519038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259f2755be2fd%3A0x42f57e57435a8ba8!2s63%20Buthgamuwa%20Rd%2C%20Sri%20Jayawardenepura%20Kotte!5e0!3m2!1sen!2slk!4v1754019294021!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href="https://maps.google.com?q=No.63,+Buthgamuwa+Road,+Rajagiriya"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2.5 px-3 py-2 text-xs text-white bg-gray-700 rounded-md hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-700 transition-colors"
          >
            Get Directions
          </a>
        </div>
      </div>

      {/* Connect With Us */}
      <div className="mt-6 text-center">
        <h4 className="mb-4 text-base font-semibold text-emerald-400">Connect With Us</h4>
        <div className="flex items-center justify-center gap-5">
          {[
            { icon: FaFacebookF, url: "https://facebook.com", label: "Facebook" },
            { icon: FaInstagram, url: "https://instagram.com", label: "Instagram" },
            { icon: FaWhatsapp, url: "https://wa.me/94785264854", label: "WhatsApp" },
            { icon: FaTiktok, url: "https://tiktok.com", label: "TikTok" },
          ].map(({ icon: Icon, url, label }, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-9 h-9 text-emerald-400 transition border border-emerald-400 rounded-full hover:bg-emerald-400 hover:text-black"
            >
              <Icon className="text-sm" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="pt-4 mt-6 text-xs text-center text-gray-400 border-t border-gray-700">
        <p>© 2025 Luxury Auto Parts Inquiry. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
