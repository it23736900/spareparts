import React, { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const logo = cld.image("logo_e46o12").format("auto").quality("auto").resize(auto().width(100));
const defaultAvatar = cld.image("default_avatar_khvzvj").format("auto").quality("auto").resize(auto().width(40));

// lighter premium gold
const GOLD = "#E6C84F";

// metallic dark-green gradient
const METALLIC_GREEN = `
  linear-gradient(
    135deg,
    rgba(3,8,6,0.97) 0%,
    rgba(8,20,15,0.95) 45%,
    rgba(3,8,6,0.97) 100%
  )
`;


export default function Navbar({ onSignInClick, onSignUpClick, onInquire }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const [user, setUser] = useState(getUser());
  const [avatarSrc, setAvatarSrc] = useState(getUser()?.avatarUrl || null);

  const navigate = useNavigate();
  const location = useLocation();
  const avatarBtnRef = useRef(null);

  useEffect(() => setActiveHref(window.location.hash || ""), []);
  useEffect(() => {
    const handler = () => {
      const u = getUser();
      setUser(u);
      setAvatarSrc(u?.avatarUrl || null);
    };
    window.addEventListener("userUpdated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("userUpdated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full shadow-xl"
      style={{
        background: METALLIC_GREEN,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        boxShadow: "inset 0 0 18px rgba(255,255,255,0.05), 0 6px 22px rgba(0,0,0,0.6)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link to="/" aria-label="Go to home" className="shrink-0">
          <AdvancedImage cldImg={logo} className="object-contain h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-10 text-sm font-semibold md:flex">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                className="relative px-4 py-2 transition-colors duration-300"
                style={{ color: isActive ? GOLD : "#E9EDEB" }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute left-0 -bottom-1 h-[2px] w-full"
                    style={{ background: GOLD }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="items-center hidden gap-4 md:flex">
          {/* Inquire Now */}
          <button
            onClick={() => onInquire?.("")}
            className="relative inline-flex h-11 items-center justify-center px-6 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none hover:scale-[1.05]"
            style={{
              color: GOLD,
              border: `2px solid ${GOLD}`,
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), rgba(0,0,0,0.5)) #0B1C1F",
              boxShadow:
                "0 0 10px rgba(230,200,79,0.4), inset 0 0 6px rgba(230,200,79,0.25)",
            }}
          >
            Inquire Now
          </button>

          {/* Avatar */}
          <button
            ref={avatarBtnRef}
            onClick={() => setIsDropdownOpen((v) => !v)}
            className="relative w-10 h-10 overflow-hidden transition border-2 rounded-full hover:scale-110"
            style={{
              borderColor: GOLD,
              boxShadow: "0 0 8px rgba(230,200,79,0.35)",
            }}
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="Profile"
                className="object-cover w-full h-full"
                onError={() => setAvatarSrc(null)}
              />
            ) : (
              <AdvancedImage
                cldImg={defaultAvatar}
                className="object-cover w-full h-full"
                alt="Profile"
              />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="relative p-2 text-white"
          >
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="px-4 pt-2 pb-4 space-y-2 text-sm md:hidden bg-gradient-to-b from-[#021C15]/95 to-[#083E2D]/95">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveHref(link.href);
                setIsMobileMenuOpen(false);
              }}
              className="block px-3 py-2 transition rounded-lg"
              style={{ color: activeHref === link.href ? GOLD : "#E9EDEB" }}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={() => {
              onInquire?.("");
              setIsMobileMenuOpen(false);
            }}
            className="w-full px-4 py-2 transition border rounded-full"
            style={{
              color: GOLD,
              border: `2px solid ${GOLD}`,
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), rgba(0,0,0,0.5)) #0B1C1F",
              boxShadow:
                "0 0 10px rgba(230,200,79,0.4), inset 0 0 6px rgba(230,200,79,0.25)",
            }}
          >
            Inquire Now
          </button>
        </div>
      )}
    </header>
  );
}
