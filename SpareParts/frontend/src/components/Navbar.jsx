import React, { useEffect, useState, useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import GetQuotationForm from "./GetQuotationForm";

/* =========================
   Cloudinary assets
   ========================= */
const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const logo = cld.image("newlogoeuro_dd7xjc_c_crop_ar_16_9_ip5gt0").format("auto").quality("auto").resize(auto().width(120));
const defaultAvatar = cld.image("default_avatar_khvzvj").format("auto").quality("auto").resize(auto().width(40));

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

/* Auto-hide delay (ms) */
const AUTO_HIDE_DELAY = 10000; // 10s

export default function Navbar({ onSignInClick, onSignUpClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(getUser()?.avatarUrl || null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

  // START HIDDEN -> will fade in when the user scrolls
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const authMenuRef = useRef(null);
  const hideTimerRef = useRef(null);
  const rafRef = useRef(null);

  /* Sync avatar with auth updates */
  useEffect(() => {
    const handler = () => setAvatarSrc(getUser()?.avatarUrl || null);
    window.addEventListener("userUpdated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("userUpdated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  /* Close menus on route change + ensure bar visible briefly */
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAuthMenuOpen(false);
    showNow();
  }, [location.pathname]);

  /* Click-away for auth dropdown */
  useEffect(() => {
    const onClickAway = (e) => {
      if (!authMenuRef.current) return;
      if (!authMenuRef.current.contains(e.target)) setIsAuthMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    const b = document.body;
    if (isMobileMenuOpen) {
      const prev = b.style.overflow;
      b.style.overflow = "hidden";
      return () => (b.style.overflow = prev);
    }
  }, [isMobileMenuOpen]);

  /* Show-on-scroll + auto-hide after inactivity */
  useEffect(() => {
    const onActivity = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        showNow();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("touchmove", onActivity, { passive: true });
    const onKey = (e) => {
      if (["PageUp", "PageDown", "Home", "End", "ArrowDown", "ArrowUp", " ", "Spacebar"].includes(e.key)) {
        showNow();
      }
    };
    window.addEventListener("keydown", onKey);

    if (window.scrollY > 0) showNow();

    return () => {
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("touchmove", onActivity);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(rafRef.current || 0);
      clearHideTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileMenuOpen, isAuthMenuOpen, isFormOpen]);

  function clearHideTimer() {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }

  function showNow() {
    if (!isVisible) setIsVisible(true);
    resetHideTimer();
  }

  function resetHideTimer() {
    clearHideTimer();
    if (isMobileMenuOpen || isAuthMenuOpen || isFormOpen) return;
    hideTimerRef.current = setTimeout(() => setIsVisible(false), AUTO_HIDE_DELAY);
  }

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
    border: `1.5px solid rgba(23,167,122,0.35)`,
    borderRadius: "9999px",
    boxShadow:
      "0 12px 28px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.35), inset 0 0 16px rgba(23,167,122,0.10)",
    transition: "opacity 300ms ease, transform 320ms ease",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(-10px)",
    pointerEvents: isVisible ? "auto" : "none",
  };

  const linkBase = "relative px-5 py-2 transition-colors duration-300";

  return (
    <>
      {/* Fixed header */}
      <header className="fixed top-0 left-0 z-50 w-full pt-[env(safe-area-inset-top)]" style={{ background: "transparent" }}>
        <div className="px-2 sm:px-4 md:px-6 mt-3 md:mt-5">
          <div className="mx-auto" style={{ maxWidth: "min(1760px, 97.5vw)", position: "relative" }}>
            {/* Floating pill bar */}
            <div className="flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5" style={pillShellStyle}>
              {/* Logo */}
              <Link to="/" aria-label="Go to home" className="shrink-0">
                <AdvancedImage cldImg={logo} className="object-contain h-9 md:h-10" />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex gap-3 lg:gap-6 text-[0.98rem] font-semibold">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={linkBase}
                      style={{ color: isActive ? EMERALD : "#E9EDEB" }}
                      onClick={showNow}
                    >
                      <span>{link.label}</span>
                      <span
                        className="absolute left-5 right-5 -bottom-[2px] h-[2px]"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(23,167,122,0.0) 0%, rgba(23,167,122,1) 50%, rgba(23,167,122,0.0) 100%)",
                          transform: `scaleX(${isActive ? 1 : 0})`,
                          transformOrigin: "left",
                          transition: "transform 420ms ease",
                        }}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Right cluster */}
              <div className="items-center hidden md:flex gap-3 lg:gap-6 -translate-x-[2px]">
                {/* Inquire Now — Emerald Outline */}
                <button
                  onClick={() => {
                    setIsFormOpen(true);
                    showNow();
                  }}
                  className="relative inline-flex h-10 md:h-11 items-center justify-center px-6 md:px-7 text-sm font-semibold transition-all duration-300 focus:outline-none hover:scale-[1.03]"
                  style={{
                    color: EMERALD,
                    border: `1.5px solid ${EMERALD}`,
                    borderRadius: "9999px",
                    background: METALLIC_GREEN_SOFT,
                    boxShadow: "0 0 10px rgba(23,167,122,0.30), inset 0 0 10px rgba(23,167,122,0.18)",
                  }}
                >
                  Inquire Now
                </button>

                {/* Account menu */}
                <div className="relative" ref={authMenuRef}>
                  <button
                    onClick={() => {
                      setIsAuthMenuOpen((v) => !v);
                      showNow();
                    }}
                    className="relative grid w-10 h-10 overflow-hidden transition border rounded-full hover:scale-110 place-items-center"
                    style={{
                      borderColor: EMERALD,
                      boxShadow: "0 0 8px rgba(23,167,122,0.22)",
                      background: "transparent",
                      color: "#E9EDEB",
                    }}
                    aria-label="Account menu"
                    aria-haspopup="menu"
                    aria-expanded={isAuthMenuOpen}
                  >
                    {getUser() ? (
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
                      role="menu"
                      className="absolute right-0 z-50 mt-2 w-56 rounded-2xl overflow-hidden border shadow-2xl bg-[#0B1C1F]/95 backdrop-blur-lg"
                      style={{ borderColor: "rgba(23,167,122,0.45)" }}
                      onMouseEnter={() => clearHideTimer()}
                      onMouseLeave={() => resetHideTimer()}
                    >
                      {!getUser() ? (
                        <>
                          <button
                            role="menuitem"
                            className="w-full px-5 py-3 text-sm text-left hover:bg-white/10"
                            onClick={() => {
                              setIsAuthMenuOpen(false);
                              onSignInClick?.();
                            }}
                          >
                            Log in
                          </button>
                          <button
                            role="menuitem"
                            className="w-full px-5 py-3 text-sm text-left hover:bg-white/10"
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
                            role="menuitem"
                            to="/profile"
                            className="block px-5 py-3 text-sm hover:bg-white/10"
                            onClick={() => setIsAuthMenuOpen(false)}
                          >
                            Profile
                          </Link>
                          <button
                            role="menuitem"
                            className="flex items-center w-full gap-2 px-5 py-3 text-sm text-left hover:bg-white/10"
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
                  onClick={() => {
                    setIsMobileMenuOpen((v) => !v);
                    showNow();
                  }}
                  className="relative p-3 text-white"
                  aria-label="Toggle menu"
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
                boxShadow: "0 10px 24px rgba(0,0,0,0.45), inset 0 0 12px rgba(23,167,122,0.12)",
              }}
              onMouseEnter={() => clearHideTimer()}
              onMouseLeave={() => resetHideTimer()}
            >
              <div className="px-3 pt-2 pb-3 space-y-1 text-[1.02rem]">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl transition"
                    style={{ color: location.pathname === link.to ? EMERALD : "#E9EDEB" }}
                  >
                    {link.label}
                  </Link>
                ))}

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
                    boxShadow: "0 0 10px rgba(23,167,122,0.30), inset 0 0 10px rgba(23,167,122,0.18)",
                  }}
                >
                  Inquire Now
                </button>

                <div className="flex gap-2 pt-2">
                  {!getUser() ? (
                    <>
                      <button
                        onClick={() => {
                          onSignInClick?.();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex-1 border rounded-full h-[44px] px-4"
                        style={{ color: "#E9EDEB", borderColor: "rgba(23,167,122,0.45)" }}
                      >
                        Log in
                      </button>
                      <button
                        onClick={() => {
                          onSignUpClick?.();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex-1 rounded-full h-[44px] px-4"
                        style={{
                          color: "#0B1C1F",
                          background: EMERALD,
                          border: "1.5px solid " + EMERALD,
                        }}
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="grid flex-1 border rounded-full h-[44px] place-items-center px-4"
                        style={{ color: "#E9EDEB", borderColor: "rgba(23,167,122,0.45)" }}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                          navigate("/");
                        }}
                        className="grid flex-1 rounded-full h-[44px] place-items-center px-4"
                        style={{
                          color: "#0B1C1F",
                          background: EMERALD,
                          border: "1.5px solid " + EMERALD,
                        }}
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Inquiry Form Modal */}
      <GetQuotationForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setTimeout(() => resetHideTimer(), 0);
        }}
        prefill={{}}
      />
    </>
  );
}
