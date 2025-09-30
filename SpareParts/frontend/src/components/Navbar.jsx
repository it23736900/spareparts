import React, { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GetQuotationForm from "./GetQuotationForm";

/* =========================
   Cloudinary assets
   ========================= */
const cld = new Cloudinary({ cloud: { cloudName: "dznt9s0j8" } });
const logo = cld
  .image("newlogoeuro_dd7xjc_c_crop_ar_16_9_ip5gt0_c_crop_w_1080_h_300_xvilbd_esm55u")
  .format("auto")
  .quality("auto")
  .resize(auto().width(240));

/* =========================
   Theme (EMERALD)
   ========================= */
const EMERALD = "#17A77A";
const METALLIC_GREEN_SOFT = `
  linear-gradient(
    135deg,
    rgba(3,8,6,0.58) 0%,
    rgba(8,20,15,0.52) 45%,
    rgba(3,8,6,0.58) 100%
  )
`;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredTo, setHoveredTo] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
  e.preventDefault();
  if (location.pathname === "/") {
    // Already on home → scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    // Navigate to home
    navigate("/");
    // After navigation, scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }
};



  /* Close mobile menu on route change */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    const b = document.body;
    if (isMobileMenuOpen) {
      const prev = b.style.overflow;
      b.style.overflow = "hidden";
      return () => (b.style.overflow = prev);
    }
  }, [isMobileMenuOpen]);

  /* Show/hide navbar based on scroll */
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) setIsVisible(true);
      else if (currentScrollY > lastScrollY) setIsVisible(false);
      else setIsVisible(true);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Nav links */
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact Us", to: "/contact" },
  ];

  /* Shell style (glass pill) */
  const pillShellStyle = {
    background: METALLIC_GREEN_SOFT,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1.5px solid #066F49",
    borderRadius: "9999px",
    boxShadow: "0 0 14px rgba(6,111,73,0.45)",
    transition: "opacity 300ms ease, transform 320ms ease",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(-10px)",
    pointerEvents: isVisible ? "auto" : "none",
  };

  const linkBase =
    "relative px-5 py-2 font-semibold transition-colors duration-300";

  return (
    <>
      {/* Fixed header */}
      <header
        className="fixed top-0 left-0 z-50 w-full pt-[env(safe-area-inset-top)]"
        style={{ background: "transparent" }}
      >
        <div className="px-2 sm:px-4 md:px-6 mt-3 md:mt-5">
          <div
            className="mx-auto"
            style={{ maxWidth: "min(1760px, 97.5vw)", position: "relative" }}
          >
            {/* Floating pill bar */}
            <div
              className="flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5"
              style={pillShellStyle}
            >
              {/* Logo */}
              <Link to="/" aria-label="Go to home" className="shrink-0 flex items-center">
                <AdvancedImage
                  cldImg={logo}
                  className="object-contain max-h-12 w-auto"
                />
              </Link>

              {/* Desktop Nav */}
<nav className="hidden md:flex gap-3 lg:gap-6 text-[0.98rem]">
  {navLinks.map((link) => {
    const isHover = hoveredTo === link.to;

    // 🎯 special case for Home
    if (link.label === "Home") {
      return (
        <a
          key={link.to}
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname === "/") {
              // already home → scroll to top
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              // go home → then scroll to top
              navigate("/");
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }
          }}
          className={linkBase}
          style={{
            color: isHover ? "#D8B765" : "#E9EDEB",
            textShadow: isHover
              ? "0 0 3px rgba(23,167,122,0.28), 0 0 6px rgba(23,167,122,0.2)"
              : "none",
            transition:
              "color 200ms ease, text-shadow 180ms ease, transform 160ms ease",
            willChange: "transform",
          }}
          onMouseEnter={() => setHoveredTo(link.to)}
          onMouseLeave={() => setHoveredTo("")}
          onFocus={() => setHoveredTo(link.to)}
          onBlur={() => setHoveredTo("")}
        >
          {link.label}
        </a>
      );
    }

    // 🟢 normal links
    return (
      <Link
        key={link.to}
        to={link.to}
        className={linkBase}
        onMouseEnter={() => setHoveredTo(link.to)}
        onMouseLeave={() => setHoveredTo("")}
        onFocus={() => setHoveredTo(link.to)}
        onBlur={() => setHoveredTo("")}
        style={{
          color: isHover ? "#D8B765" : "#E9EDEB",
          textShadow: isHover
            ? "0 0 3px rgba(23,167,122,0.28), 0 0 6px rgba(23,167,122,0.2)"
            : "none",
          transition:
            "color 200ms ease, text-shadow 180ms ease, transform 160ms ease",
          willChange: "transform",
        }}
      >
        {link.label}
      </Link>
    );
  })}
</nav>


              {/* Right cluster */}
              <div className="items-center hidden md:flex gap-3 lg:gap-6 -translate-x-[2px]">
                {/* Inquire Now */}
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="relative inline-flex h-10 md:h-11 items-center justify-center px-6 md:px-7 text-sm font-semibold transition-all duration-300 focus:outline-none hover:scale-[1.03]"
                  style={{
                    color: EMERALD,
                    border: `1.5px solid ${EMERALD}`,
                    borderRadius: "9999px",
                    background: METALLIC_GREEN_SOFT,
                    boxShadow:
                      "0 0 10px rgba(23,167,122,0.30), inset 0 0 10px rgba(23,167,122,0.18)",
                  }}
                >
                  Inquire Now
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen((v) => !v)}
                  className="relative p-3 text-white"
                >
                  {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="px-2 sm:px-4 md:hidden pb-3">
            <div
              className="mt-2 rounded-2xl overflow-hidden"
              style={{
                background: METALLIC_GREEN_SOFT,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: `1.5px solid rgba(23,167,122,0.35)`,
                boxShadow:
  "0 10px 24px rgba(0,0,0,0.45), inset 0 0 12px rgba(23,167,122,0.12)",

              }}
            >
              <div className="px-3 pt-2 pb-3 space-y-1 text-[1.02rem]">
                {navLinks.map((link) => {
  if (link.label === "Home") {
    return (
      <a
        key={link.to}
        href="/"
        onClick={(e) => {
          e.preventDefault();
          setIsMobileMenuOpen(false);
          if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            navigate("/");
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
          }
        }}
        className="block px-4 py-3 rounded-xl transition"
        style={{ color: "#E9EDEB" }}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      key={link.to}
      to={link.to}
      onClick={() => setIsMobileMenuOpen(false)}
      className="block px-4 py-3 rounded-xl transition"
      style={{ color: "#E9EDEB" }}
    >
      {link.label}
    </Link>
  );
})}


                <button
                  onClick={() => {
                    setIsFormOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="relative inline-flex h-[44px] items-center justify-center px-8 text-[0.98rem] font-semibold transition-all duration-300 focus:outline-none hover:scale-[1.02] w-full mt-2 rounded-full"
                  style={{
                    color: EMERALD,
                    border: `1.5px solid ${EMERALD}`,
                    background: METALLIC_GREEN_SOFT,
                    boxShadow:
                      "0 0 10px rgba(23,167,122,0.30), inset 0 0 10px rgba(23,167,122,0.18)",
                  }}
                >
                  Inquire Now
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Inquiry Form Modal */}
      <GetQuotationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        prefill={{}}
      />
    </>
  );
}
