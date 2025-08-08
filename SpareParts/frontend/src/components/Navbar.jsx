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
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black/95 via-gray-900/90 to-black/95 backdrop-blur-xl border-b border-emerald-600/30 shadow-2xl shadow-black/50 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/">
          <AdvancedImage cldImg={logo} className="h-10 object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-sm font-semibold">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="relative group transition-all duration-500 hover:text-emerald-400 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600/20 hover:to-emerald-700/20 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-600/30 transform hover:scale-105"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500 group-hover:w-full shadow-lg shadow-emerald-500/50 animate-glow"></span>
              {/* Elegant background effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600/0 to-emerald-700/0 group-hover:from-emerald-600/8 group-hover:to-emerald-700/8 transition-all duration-500 blur-sm"></div>
            </a>
          ))}
        </nav>

        {/* Profile */}
        <div className="hidden md:flex relative items-center">
          <button 
            onClick={toggleDropdown}
            className="relative group transition-all duration-300 hover:scale-110"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            <AdvancedImage
              cldImg={profileAvatar}
              className="relative w-10 h-10 rounded-full border-2 border-emerald-600/60 group-hover:border-emerald-500 transition-all duration-300 shadow-lg group-hover:shadow-emerald-600/25"
              alt="Profile"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-gray-900/90 backdrop-blur-xl text-white rounded-xl shadow-2xl shadow-black/50 z-50 w-40 border border-white/20">
              <button
                className="w-full text-left px-4 py-3 hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 rounded-lg mx-2 my-1"
                onClick={() => {
                  onSignInClick();
                  setIsDropdownOpen(false);
                }}
              >
                Sign In
              </button>
              <button
                className="w-full text-left px-4 py-3 hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 rounded-lg mx-2 my-1"
                onClick={() => {
                  onSignUpClick();
                  setIsDropdownOpen(false);
                }}
              >
                Sign Up
              </button>
              <Link
                to="/profile"
                className="block px-4 py-3 hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors duration-200 rounded-lg mx-2 my-1"
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
            className="relative group transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600/15 hover:to-emerald-700/15"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            <div className="relative text-emerald-400 group-hover:text-white transition-colors duration-300">
              {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl text-white text-sm space-y-2 border-t border-emerald-600/30 animate-slideDown">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="block hover:text-emerald-400 px-3 py-3 rounded-lg hover:bg-gradient-to-r hover:from-emerald-600/15 hover:to-emerald-700/15 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-600/20"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{animationDelay: `${index * 0.1}s`}}
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
