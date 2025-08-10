// src/components/Navbar.jsx
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

const DARK_GLOW = "rgba(16,94,66,0.55)";
const DARK_GLOW_SOFT = "rgba(16,94,66,0.35)";

const Navbar = ({ onSignInClick, onSignUpClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const [user, setUser] = useState(getUser());
  const [avatarSrc, setAvatarSrc] = useState(getUser()?.avatarUrl || null);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const avatarBtnRef = useRef(null);

  // reflect hash for active state
  useEffect(() => {
    setActiveHref(window.location.hash || "");
  }, []);

  // listen for user updates (login/logout/upload)
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

  // close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // click-away + Esc to close dropdown
  useEffect(() => {
    const onDocClick = (e) => {
      if (!isDropdownOpen) return;
      const target = e.target;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        avatarBtnRef.current &&
        !avatarBtnRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    const onEsc = (e) => e.key === "Escape" && setIsDropdownOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [isDropdownOpen]);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact Us", href: "#contact" },
  ];

  const toggleDropdown = () => setIsDropdownOpen((v) => !v);
  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full text-white border-b shadow-2xl bg-gradient-to-r from-black/95 via-gray-900/90 to-black/95 backdrop-blur-xl shadow-black/50"
      style={{ borderColor: DARK_GLOW_SOFT }}
    >
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link to="/" aria-label="Go to home">
          <AdvancedImage cldImg={logo} className="object-contain h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-10 text-sm font-semibold md:flex">
          {navLinks.map((link, index) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="relative px-4 py-2 text-white transition-all rounded-lg group duration-400"
              >
                <span className={`relative z-10 ${isActive ? "" : "group-hover:text-[#a7f3d0]"}`}>
                  {link.label}
                </span>
                <span
                  className="absolute left-0 -bottom-1 h-[3px] w-full origin-left transition-transform duration-500"
                  style={{
                    background: DARK_GLOW,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </a>
            );
          })}
        </nav>

        {/* Profile / Auth */}
        <div className="relative items-center hidden md:flex">
          <button
            ref={avatarBtnRef}
            onClick={toggleDropdown}
            className="relative transition-all duration-300 group hover:scale-110"
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
          >
            <div
              className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 -z-10 group-hover:opacity-100 blur-sm"
              style={{ background: "radial-gradient(circle, rgba(16,94,66,0.5), transparent 70%)" }}
            />
            {/* Avatar: either uploaded (dataURL/https) or default image */}
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="Profile"
                className="object-cover w-10 h-10 transition-all duration-300 border-2 rounded-full shadow-lg"
                onError={() => setAvatarSrc(null)}
                style={{ borderColor: "rgba(16,94,66,0.6)", boxShadow: `0 0 18px ${DARK_GLOW_SOFT}` }}
              />
            ) : (
              <AdvancedImage
                cldImg={defaultAvatar}
                className="w-10 h-10 transition-all duration-300 border-2 rounded-full shadow-lg"
                style={{ borderColor: "rgba(16,94,66,0.6)", boxShadow: `0 0 18px ${DARK_GLOW_SOFT}` }}
                alt="Profile"
              />
            )}
          </button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              role="menu"
              className="absolute right-0 z-50 mt-2 text-white border shadow-2xl bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-black/50 w-44 border-white/10"
            >
              {user ? (
                <>
                  <button
                    role="menuitem"
                    className="w-full text-left px-4 py-3 rounded-lg mx-2 my-1 hover:bg-[rgba(16,94,66,0.18)] hover:text-[#a7f3d0]"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </button>
                  <button
                    role="menuitem"
                    className="w-full px-4 py-3 mx-2 my-1 text-left rounded-lg hover:bg-red-600/20 hover:text-red-200"
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    role="menuitem"
                    className="w-full text-left px-4 py-3 rounded-lg mx-2 my-1 hover:bg-[rgba(16,94,66,0.18)] hover:text-[#a7f3d0]"
                    onClick={() => {
                      onSignInClick?.();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    role="menuitem"
                    className="w-full text-left px-4 py-3 rounded-lg mx-2 my-1 hover:bg-[rgba(16,94,66,0.18)] hover:text-[#a7f3d0]"
                    onClick={() => {
                      onSignUpClick?.();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="relative p-2 transition-all duration-300 rounded-lg group hover:scale-110"
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div
              className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 group-hover:opacity-100 blur-sm -z-10"
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
        <div
          className="px-4 pt-2 pb-4 space-y-2 text-sm text-white border-t md:hidden bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl"
          style={{ borderColor: DARK_GLOW_SOFT }}
        >
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveHref(link.href);
                setIsMobileMenuOpen(false);
              }}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="block px-3 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] relative"
            >
              <span className="relative z-10">{link.label}</span>
              <div
                className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 -z-10 hover:opacity-100 blur-sm"
                style={{ background: "radial-gradient(circle, rgba(16,94,66,0.4), transparent 70%)" }}
              />
            </a>
          ))}

          {/* Auth (mobile) */}
          {!user ? (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => onSignInClick?.()} className="px-4 py-2 border rounded-lg bg-white/10 border-white/10">
                Sign In
              </button>
              <button onClick={() => onSignUpClick?.()} className="px-4 py-2 rounded-lg bg-emerald-700/70">
                Sign Up
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/profile");
                }}
                className="px-4 py-2 border rounded-lg bg-white/10 border-white/10"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                  navigate("/");
                }}
                className="px-4 py-2 rounded-lg bg-red-600/80"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
