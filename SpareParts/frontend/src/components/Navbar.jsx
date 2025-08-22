// src/components/Navbar.jsx
import React, { useEffect, useState, useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import GetQuotationForm from "./GetQuotationForm"; // keep if you want the navbar "Inquire Now" CTA

// Cloudinary assets
const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const logo = cld.image("logo_e46o12").format("auto").quality("auto").resize(auto().width(100));
const defaultAvatar = cld.image("default_avatar_khvzvj").format("auto").quality("auto").resize(auto().width(40));

// Theme tokens
const GOLD = "#E6C84F";
const METALLIC_GREEN = `
  linear-gradient(
    135deg,
    rgba(3,8,6,0.97) 0%,
    rgba(8,20,15,0.95) 45%,
    rgba(3,8,6,0.97) 100%
  )
`;

export default function Navbar({ onSignInClick, onSignUpClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(getUser()?.avatarUrl || null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const authMenuRef = useRef(null);

  // Keep avatar in sync with auth changes
  useEffect(() => {
    const handler = () => {
      const u = getUser();
      setAvatarSrc(u?.avatarUrl || null);
    };
    window.addEventListener("userUpdated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("userUpdated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAuthMenuOpen(false);
  }, [location.pathname]);

  // Close auth dropdown on outside click
  useEffect(() => {
    function onClickAway(e) {
      if (!authMenuRef.current) return;
      if (!authMenuRef.current.contains(e.target)) setIsAuthMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ];

  const user = getUser();

  return (
    <>
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
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
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
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="items-center hidden md:flex gap-5 -translate-x-[2px]">
            {/* Inquire Now — opens form */}
            <button
              onClick={() => setIsFormOpen(true)}
              className="relative inline-flex h-11 items-center justify-center px-7 text-sm font-semibold transition-all duration-300 focus:outline-none hover:scale-[1.03]"
              style={{
                color: GOLD,
                border: `2px solid ${GOLD}`,
                borderRadius: "0.6rem",
                background: METALLIC_GREEN,
                boxShadow: "0 0 12px rgba(230,200,79,0.45), inset 0 0 8px rgba(230,200,79,0.25)",
              }}
            >
              Inquire Now
            </button>

            {/* Account menu: shows avatar if logged in, else user icon */}
            <div className="relative" ref={authMenuRef}>
              <button
                onClick={() => setIsAuthMenuOpen((v) => !v)}
                className="relative grid w-10 h-10 overflow-hidden transition border-2 rounded-full hover:scale-110 place-items-center"
                style={{
                  borderColor: GOLD,
                  boxShadow: "0 0 8px rgba(230,200,79,0.35)",
                  background: "transparent",
                  color: "#E9EDEB",
                }}
                aria-label="Account menu"
              >
                {user ? (
                  avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt="Profile"
                      className="object-cover w-full h-full"
                      onError={() => setAvatarSrc(null)}
                    />
                  ) : (
                    <AdvancedImage cldImg={defaultAvatar} className="object-cover w-full h-full" alt="Profile" />
                  )
                ) : (
                  <FaUserCircle size={20} />
                )}
              </button>

              {isAuthMenuOpen && (
                <div
                  className="absolute right-0 z-50 mt-2 w-48 rounded-xl overflow-hidden border shadow-xl bg-[#0B1C1F]/95 backdrop-blur-lg"
                  style={{ borderColor: "rgba(212,175,55,0.45)" }}
                >
                  {!user ? (
                    <>
                      <button
                        className="w-full px-4 py-3 text-sm text-left hover:bg-white/10"
                        onClick={() => {
                          setIsAuthMenuOpen(false);
                          onSignInClick?.();
                        }}
                      >
                        Log in
                      </button>
                      <button
                        className="w-full px-4 py-3 text-sm text-left hover:bg-white/10"
                        onClick={() => {
                          setIsAuthMenuOpen(false);
                          onSignUpClick?.();
                        }}
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-sm hover:bg-white/10"
                        onClick={() => setIsAuthMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="flex items-center w-full gap-2 px-4 py-3 text-sm text-left hover:bg-white/10"
                        onClick={() => {
                          setIsAuthMenuOpen(false);
                          logout();
                          navigate("/");
                        }}
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="relative p-2 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="px-4 pt-2 pb-4 space-y-2 text-sm md:hidden bg-gradient-to-b from-[#021C15]/95 to-[#083E2D]/95">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 transition rounded-lg"
                style={{ color: location.pathname === link.to ? GOLD : "#E9EDEB" }}
              >
                {link.label}
              </Link>
            ))}

            {/* Inquire Now (mobile) */}
            <button
              onClick={() => {
                setIsFormOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="relative inline-flex h-11 items-center justify-center px-8 text-sm font-semibold transition-all duration-300 focus:outline-none hover:scale-[1.02] w-full"
              style={{
                color: GOLD,
                border: `2px solid ${GOLD}`,
                borderRadius: "0.6rem",
                background: METALLIC_GREEN,
                boxShadow: "0 0 12px rgba(230,200,79,0.45), inset 0 0 8px rgba(230,200,79,0.25)",
              }}
            >
              Inquire Now
            </button>

            {/* Account actions (mobile) */}
            <div className="flex gap-2 pt-2">
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      onSignInClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 border rounded-lg h-11"
                    style={{ color: "#E9EDEB", borderColor: "rgba(212,175,55,0.45)" }}
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      onSignUpClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 rounded-lg h-11"
                    style={{ color: "#0B1C1F", background: GOLD, border: "2px solid " + GOLD }}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="grid flex-1 border rounded-lg h-11 place-items-center"
                    style={{ color: "#E9EDEB", borderColor: "rgba(212,175,55,0.45)" }}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                      navigate("/");
                    }}
                    className="grid flex-1 rounded-lg h-11 place-items-center"
                    style={{ color: "#0B1C1F", background: GOLD, border: "2px solid " + GOLD }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Inquiry Form Modal (if you want the header CTA to open it) */}
      <GetQuotationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        prefill={{}}
      />
    </>
  );
}
