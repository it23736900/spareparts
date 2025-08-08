import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const logo = cld.image("logo_e46o12").format("auto").quality("auto").resize(auto().width(100));
const profileAvatar = cld.image("default_avatar_khvzvj").format("auto").quality("auto").resize(auto().width(40));

const Navbar = ({ onSignInClick, onSignUpClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { label: "About Us", href: "#about" },
    { label: "Brands", href: "#brands" },
    { label: "Services", href: "#services" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/">
          <AdvancedImage cldImg={logo} className="h-10 object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-sm font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative group transition-all duration-300"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Profile */}
        <div className="hidden md:flex relative items-center">
          <button onClick={toggleDropdown}>
            <AdvancedImage
              cldImg={profileAvatar}
              className="w-10 h-10 rounded-full border-2 border-yellow-400"
              alt="Profile"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-50 w-40">
              <button
                className="w-full text-left px-4 py-2 hover:bg-yellow-100"
                onClick={() => {
                  onSignInClick();
                  setIsDropdownOpen(false);
                }}
              >
                Sign In
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-yellow-100"
                onClick={() => {
                  onSignUpClick();
                  setIsDropdownOpen(false);
                }}
              >
                Sign Up
              </button>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-yellow-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-black/80 backdrop-blur-md text-white text-sm space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block hover:text-yellow-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
