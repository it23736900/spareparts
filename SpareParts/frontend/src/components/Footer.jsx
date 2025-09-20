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

const METALLIC_GREEN = `
  linear-gradient(
    135deg,
    rgba(3,8,6,0.97) 0%,
    rgba(8,20,15,0.95) 45%,
    rgba(3,8,6,0.97) 100%
  )
`;

export default function Footer() {
  return (
    <footer
      className="relative px-6 py-8 overflow-hidden text-white border-t"
      style={{
        background: METALLIC_GREEN,
        // emerald divider at top
        borderColor: "rgba(23,167,122,0.28)",
      }}
    >
      {/* Main Grid */}
      <div
        className="grid max-w-6xl gap-8 pb-8 mx-auto border-b md:grid-cols-4"
        style={{ borderColor: "rgba(23,167,122,0.22)" }}
      >
        {/* Company Info */}
        <div>
          <h4 className="mb-3 text-base font-semibold emerald-accent">Company</h4>

          <a
            href="https://maps.google.com/?q=No.63,+Buthgamuwa+Road,+Rajagiriya,+10100,+Sri+Lanka"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-emerald-300"
            aria-label="View address in Google Maps"
          >
            <FaMapMarkerAlt className="text-emerald-300/90" />
            No.63, Buthgamuwa Road, Rajagiriya, 10100, Sri Lanka.
          </a>

          <a
            href="tel:+94759687372"
            className="flex items-center gap-2 mt-2 text-sm text-white/80 transition-colors hover:text-emerald-300"
            aria-label="Call +94 75 968 7372"
          >
            <FaPhoneAlt className="text-emerald-300/90" />
            +94 75 968 7372
          </a>

          <a
            href="mailto:info@eurotec.lk"
            className="flex items-center gap-2 mt-2 text-sm text-white/80 transition-colors hover:text-emerald-300"
            aria-label="Email info@eurotec.lk"
          >
            <FaEnvelope className="text-emerald-300/90" />
            info@eurotec.lk
          </a>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="mb-3 text-base font-semibold emerald-accent">Business Hours</h4>
          {[
            "Mon: 8.30 AM – 5.30 PM",
            "Tue: 8.30 AM – 5.30 PM",
            "Wed: 8.30 AM – 5.30 PM",
            "Thu: 8.30 AM – 5.30 PM",
            "Fri: 8.30 AM – 5.30 PM",
            "Sat: 8.30 AM – 5.30 PM",
          ].map((t) => (
            <p key={t} className="text-sm text-white/75">
              {t}
            </p>
          ))}
          <p className="mt-1 text-sm text-white/75">Sun : Closed</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-3 text-base font-semibold emerald-accent">Quick Links</h4>
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
                  className="text-white/80 transition-colors hover:text-emerald-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Find Us (Map Embed) */}
        <div>
          <h4 className="mb-3 text-base font-semibold emerald-accent">Find Us</h4>
          <div
            className="w-full overflow-hidden rounded-md shadow h-28 md:h-40 lg:h-48"
            style={{ boxShadow: "0 0 0 1px rgba(23,167,122,0.22) inset" }}
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
            className="block mt-2.5 px-3 py-2 text-xs text-white rounded-md border transition-colors"
            style={{
              borderColor: "rgba(23,167,122,0.35)",
              background: "rgba(23,167,122,0.10)",
            }}
          >
            Get Directions
          </a>
        </div>
      </div>

      {/* Connect */}
      <div className="mt-7 text-center">
        <h4 className="mb-4 text-base font-semibold emerald-accent">Connect With Us</h4>
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
              className="flex items-center justify-center rounded-full w-9 h-9 border transition"
              style={{
                borderColor: "rgba(23,167,122,0.45)",
                boxShadow: "0 0 0 0 rgba(23,167,122,0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(23,167,122,0.12)";
                e.currentTarget.style.boxShadow =
                  "0 0 16px 2px rgba(23,167,122,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "0 0 0 0 rgba(23,167,122,0)";
              }}
            >
              <Icon className="text-emerald-300 text-[1rem]" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div
        className="pt-4 mt-7 text-xs text-center text-white/70"
        style={{ borderTop: "1px solid rgba(23,167,122,0.22)" }}
      >
        <p>
          © 2025 <span className="emerald-accent">EuroTec</span>. All Rights Reserved.
        </p>
      </div>

      {/* Emerald accent text */}
      <style>{`
        .emerald-accent {
          background: linear-gradient(90deg, #A6FFE7, #32D6A7, #0BA57F, #32D6A7, #A6FFE7);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          animation: emeraldShine 6s linear infinite;
        }
        @keyframes emeraldShine {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </footer>
  );
}
