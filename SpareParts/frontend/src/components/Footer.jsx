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


const METALLIC_GREEN = `
  linear-gradient(
    135deg,
    rgba(3,8,6,0.97) 0%,
    rgba(8,20,15,0.95) 45%,
    rgba(3,8,6,0.97) 100%
  )
`;

export default function Footer({ onInquire }) {
  return (
    <footer
      className="relative px-6 py-8 overflow-hidden text-white border-t"
      style={{
        background: METALLIC_GREEN,
        borderColor: "rgba(212,175,55,0.5)", // subtle gold divider at top
      }}
    >
      {/* Main Grid */}
      <div
        className="grid max-w-6xl gap-6 pb-6 mx-auto border-b md:grid-cols-4"
        style={{ borderColor: "rgba(212,175,55,0.4)" }} // gold dividing line
      >
        {/* Company Info */}
        <div>
          <h4 className="mb-3 text-base font-semibold luxury-gold">Company</h4>

          {/* Clickable Address */}
          <a
            href="https://maps.google.com/?q=No.63,+Buthgamuwa+Road,+Rajagiriya,+10100,+Sri+Lanka"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-yellow-300"
            aria-label="View address in Google Maps"
          >
            <FaMapMarkerAlt className="luxury-gold-icon" />
            No.63, Buthgamuwa Road, Rajagiriya, 10100, Sri Lanka.
          </a>

          {/* Tappable Phone */}
          <a
            href="tel:+94759687372"
            className="flex items-center gap-2 mt-2 text-sm text-gray-300 transition-colors hover:text-yellow-300"
            aria-label="Call +94 75 968 7372"
          >
            <FaPhoneAlt className="luxury-gold-icon" />
            +94 75 968 7372
          </a>

          {/* Clickable Email */}
          <a
            href="mailto:info@eurotec.lk"
            className="flex items-center gap-2 mt-2 text-sm text-gray-300 transition-colors hover:text-yellow-300"
            aria-label="Email info@eurotec.lk"
          >
            <FaEnvelope className="luxury-gold-icon" />
            info@eurotec.lk
          </a>

          <button
            type="button"
            onClick={() => onInquire?.("")}
            className="mt-4 text-sm underline underline-offset-4 decoration-yellow-500/50 hover:decoration-yellow-500/90 luxury-gold"
          >
            Inquire Now
          </button>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="mb-3 text-base font-semibold luxury-gold">Business Hours</h4>
          <p className="text-sm text-gray-300">Mon–Sat: 8.30 AM – 5.30 PM</p>
          <p className="mt-1 text-sm text-gray-300">Sun : Closed</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-3 text-base font-semibold luxury-gold">Quick Links</h4>
          <ul className="space-y-1.5 text-sm text-gray-300">
            <li><a href="/home" className="transition-colors hover:text-yellow-400">Home</a></li>
            <li><a href="/about" className="transition-colors hover:text-yellow-400">About</a></li>
            <li><a href="/services" className="transition-colors hover:text-yellow-400">Services</a></li>
            <li><a href="/contact" className="transition-colors hover:text-yellow-400">Contact</a></li>
          </ul>
        </div>

        {/* Find Us (Map Embed) */}
        <div>
          <h4 className="mb-3 text-base font-semibold luxury-gold">Find Us</h4>
          <div className="w-full overflow-hidden rounded-md shadow h-28 md:h-40 lg:h-48">
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
            className="block mt-2.5 px-3 py-2 text-xs text-white bg-white/10 rounded-md hover:bg-white/15 transition-colors"
          >
            Get Directions
          </a>
        </div>
      </div>
{/* Connect */}
<div className="mt-6 text-center">
  <h4 className="mb-4 text-base font-semibold luxury-gold">Connect With Us</h4>
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
        className="flex items-center justify-center transition border rounded-full w-9 h-9 border-yellow-500/40 hover:bg-yellow-500/10"
      >
        <Icon className="text-lg luxury-gold-icon" />
      </a>
    ))}
  </div>
</div>

      {/* Bottom */}
      <div
        className="pt-4 mt-6 text-xs text-center"
        style={{ borderTop: "1px solid rgba(212,175,55,0.4)" }} // gold line at bottom
      >
        <p className="text-gray-400">
          © 2025 <span className="luxury-gold">EuroTech</span>. All Rights Reserved.
        </p>
      </div>

      {/* Gold Text + Icon CSS */}
      <style>{`
        .luxury-gold {
          background: linear-gradient(90deg, #f7e98e, #d4af37, #f7e98e);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          animation: shine 5s linear infinite;
        }

        .luxury-gold-icon {
          background: linear-gradient(135deg, #f7e98e, #d4af37, #f7e98e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          animation: shine 5s linear infinite;
        }

        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </footer>
  );
}
