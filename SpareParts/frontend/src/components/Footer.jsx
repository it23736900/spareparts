// src/components/Footer.jsx
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

const PREMIUM_GRADIENT = `
  linear-gradient(
    135deg,
    #000000 0%,
    #000000 70%,
    #014421 100%
  )
`;

export default function Footer() {
  return (
    <footer
      className="relative px-6 py-8 overflow-hidden text-white border-t"
      style={{
        background: PREMIUM_GRADIENT, // black dominant, green blended
        borderColor: "#014421", // green for dividers
      }}
    >
      {/* Main Grid */}
      <div
        className="grid max-w-6xl gap-8 pb-8 mx-auto border-b md:grid-cols-4"
        style={{ borderColor: "#014421" }}
      >
        {/* Company Info */}
        <div>
          <h4 className="mb-3 text-base font-semibold yellow-accent">Company</h4>

          <a
            href="https://maps.google.com/?q=No.63,+Buthgamuwa+Road,+Rajagiriya,+10100,+Sri+Lanka"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-[#E3C85C]"
          >
            <FaMapMarkerAlt className="text-[#E3C85C]/90" />
            No.63, Buthgamuwa Road, Rajagiriya, 10100, Sri Lanka.
          </a>

          <a
            href="tel:+94759687372"
            className="flex items-center gap-2 mt-2 text-sm text-white/80 transition-colors hover:text-[#E3C85C]"
          >
            <FaPhoneAlt className="text-[#E3C85C]/90" />
            +94 75 968 7372
          </a>

          <a
            href="mailto:info@eurotec.lk"
            className="flex items-center gap-2 mt-2 text-sm text-white/80 transition-colors hover:text-[#E3C85C]"
          >
            <FaEnvelope className="text-[#E3C85C]/90" />
            info@eurotec.lk
          </a>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="mb-3 text-base font-semibold yellow-accent">Business Hours</h4>
          {[
            "Mon: 8.30 AM – 5.30 PM",
            "Tue: 8.30 AM – 5.30 PM",
            "Wed: 8.30 AM – 5.30 PM",
            "Thu: 8.30 AM – 5.30 PM",
            "Fri: 8.30 AM – 5.30 PM",
            "Sat: 8.30 AM – 5.30 PM",
          ].map((t) => (
            <p key={t} className="text-sm text-gray-300">
              {t}
            </p>
          ))}
          <p className="mt-1 text-sm text-gray-300">Sun : Closed</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-3 text-base font-semibold yellow-accent">Quick Links</h4>
          <ul className="space-y-1.5 text-sm">
            {[
              { label: "Home", href: "/home" },
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="transition-colors text-white/80 hover:text-[#E3C85C]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Find Us */}
        <div>
          <h4 className="mb-3 text-base font-semibold yellow-accent">Find Us</h4>
          <div
            className="w-full overflow-hidden rounded-md shadow h-28 md:h-40 lg:h-48"
            style={{ boxShadow: "0 0 0 1px #014421 inset" }}
          >
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
            className="block mt-2.5 px-3 py-2 text-xs rounded-md border transition-colors"
            style={{
              borderColor: "#014421",
              background: "rgba(1,68,33,0.2)",
              color: "#fff",
            }}
          >
            Get Directions
          </a>
        </div>
      </div>

      {/* Connect */}
      <div className="text-center mt-7">
        <h4 className="mb-4 text-base font-semibold yellow-accent">Connect With Us</h4>
        <div className="flex items-center justify-center gap-5">
          {[
            {
              icon: FaFacebookF,
              url: "https://web.facebook.com/profile.php?id=61580201289240",
              label: "Facebook",
            },
            {
              icon: FaInstagram,
              url: "https://www.instagram.com/eurotec_automotive/",
              label: "Instagram",
            },
            {
              icon: FaWhatsapp,
              url: "https://wa.me/94785264854",
              label: "WhatsApp",
            },
            {
              icon: FaTiktok,
              url: "https://www.tiktok.com/@eurotec_automotive?lang=e",
              label: "TikTok",
            },
          ].map(({ icon: Icon, url, label }, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center transition border rounded-full w-9 h-9"
              style={{
                borderColor: "#014421",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(227,200,92,0.15)";
                e.currentTarget.style.boxShadow =
                  "0 0 16px 2px rgba(227,200,92,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Icon className="text-[#E3C85C] text-[1rem]" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div
        className="pt-4 text-xs text-center mt-7 text-white/70"
        style={{ borderTop: "1px solid #014421" }}
      >
        <p>
          © 2025 <span className="yellow-accent">EuroTec</span>. All Rights Reserved.
        </p>
      </div>

      {/* Yellow shimmer effect */}
      <style>{`
        .yellow-accent {
          background: linear-gradient(90deg, #E3C85C, #FFF1A8, #E3C85C);
          background-size: 220% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          animation: yellowShine 6s linear infinite;
        }
        @keyframes yellowShine {
          0% { background-position: 0% center; }
          100% { background-position: 220% center; }
        }
      `}</style>
    </footer>
  );
}
