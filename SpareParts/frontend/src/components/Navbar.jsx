import React, { useState, useEffect } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";


const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const logo = cld.image("logo_e46o12").format("auto").quality("auto").resize(auto().width(100));
const profileAvatar = cld.image("default_avatar_khvzvj").format("auto").quality("auto").resize(auto().width(40));

const DARK_GLOW = "rgba(16,94,66,0.55)";      // deep elegant green
const DARK_GLOW_SOFT = "rgba(16,94,66,0.35)"; // softer version

const Navbar = ({ onSignInClick, onSignUpClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    // set active from current hash on load
    setActiveHref(window.location.hash || "");
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-gradient-to-r from-black/95 via-gray-900/90 to-black/95
        backdrop-blur-xl
        border-b
        text-white
        shadow-2xl shadow-black/50
      "
      style={{ borderColor: "rgba(16,94,66,0.35)" }} // darker green border
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/">
          <AdvancedImage cldImg={logo} className="h-10 object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-sm font-semibold">
          {navLinks.map((link, index) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                style={{ animationDelay: `${index * 0.1}s` }}
                className={`
                  relative group px-4 py-2 rounded-lg transition-all duration-400
                  ${isActive ? "text-white" : "text-white"}
                `}
              >
                {/* Text */}
                <span
                  className={`
                    relative z-10
                    ${isActive ? "" : "group-hover:text-[#a7f3d0]"}  /* optional soft tint on hover */
                  `}
                >
                  {link.label}
                </span>

                {/* Underline (dark green) */}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-[3px] w-full origin-left
                    bg-[${DARK_GLOW}]
                    transition-transform duration-500
                    ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                  `}
                />

                {/* Dark-green aura */}
                <div
                  className={`
                    absolute inset-0 rounded-lg -z-10 transition-opacity duration-300
                    before:content-[''] before:absolute before:inset-0 before:rounded-lg
                    before:bg-[radial-gradient(circle,rgba(16,94,66,0.48),transparent_70%)]
                    before:blur-md
                    ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                  `}
                />

                {/* Subtle dark-green shadow */}
                <div
                  className={`
                    absolute inset-0 rounded-lg -z-20
                  `}
                  style={{
                    boxShadow: isActive
                      ? `0 0 22px ${DARK_GLOW}`
                      : `0 0 16px ${DARK_GLOW_SOFT}`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity .3s ease",
                  }}
                />
              </a>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="hidden md:flex relative items-center">
          <button onClick={toggleDropdown} className="relative group transition-all duration-300 hover:scale-110">
            {/* dark-green aura */}
            <div className="absolute inset-0 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                 style={{ background: "radial-gradient(circle, rgba(16,94,66,0.5), transparent 70%)" }} />
            <AdvancedImage
              cldImg={profileAvatar}
              className="relative w-10 h-10 rounded-full border-2 transition-all duration-300 shadow-lg"
              style={{
                borderColor: "rgba(16,94,66,0.6)",
                boxShadow: `0 0 18px ${DARK_GLOW_SOFT}`,
              }}
              alt="Profile"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-gray-900/90 backdrop-blur-xl text-white rounded-xl shadow-2xl shadow-black/50 z-50 w-40 border border-white/10">
              <button
                className="w-full text-left px-4 py-3 rounded-lg mx-2 my-1 transition-colors duration-200 hover:bg-[rgba(16,94,66,0.18)] hover:text-[#a7f3d0]"
                onClick={() => { onSignInClick(); setIsDropdownOpen(false); }}
              >
                Sign In
              </button>
              <button
                className="w-full text-left px-4 py-3 rounded-lg mx-2 my-1 transition-colors duration-200 hover:bg-[rgba(16,94,66,0.18)] hover:text-[#a7f3d0]"
                onClick={() => { onSignUpClick(); setIsDropdownOpen(false); }}
              >
                Sign Up
              </button>
              <Link
                to="/profile"
                className="block px-4 py-3 rounded-lg mx-2 my-1 transition-colors duration-200 hover:bg-[rgba(16,94,66,0.18)] hover:text-[#a7f3d0]"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="relative group transition-all duration-300 hover:scale-110 p-2 rounded-lg"
          >
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"
              style={{ background: "radial-gradient(circle, rgba(16,94,66,0.45), transparent 70%)" }}
            />
            <div className="relative text-white">
              {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl text-white text-sm space-y-2 border-t"
             style={{ borderColor: DARK_GLOW_SOFT }}>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => { setActiveHref(link.href); setIsMobileMenuOpen(false); }}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="
                block px-3 py-3 rounded-lg transition-all duration-300 transform
                hover:scale-[1.02]
                relative
              "
            >
              <span className="relative z-10">{link.label}</span>
              <div
                className="absolute inset-0 rounded-lg -z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm"
                style={{ background: "radial-gradient(circle, rgba(16,94,66,0.4), transparent 70%)" }}
              />
              <div
                className="absolute inset-0 rounded-lg -z-20"
                style={{ boxShadow: `0 0 18px ${DARK_GLOW_SOFT}`, opacity: 0.85 }}
              />
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;

