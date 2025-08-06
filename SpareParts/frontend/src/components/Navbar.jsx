import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

// Cloudinary config
const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });

const logo = cld.image("logo_e46o12").format("auto").quality("auto").resize(auto().width(120));
const sriLankanFlag = cld.image("sri_lanka_elrjw8").format("png").quality("auto:best").resize(auto().width(32));
const ukFlag = cld.image("UK_j0lfab").format("png").quality("auto:best").resize(auto().width(32));
const profileAvatar = cld.image("default_avatar_khvzvj").format("auto").quality("auto").resize(auto().width(40));

const mockInquiries = [
  { ref: 'ABC123', name: 'John Doe', message: 'Need pricing for engine parts.', status: 'Pending' },
  { ref: 'DEF456', name: 'Alice Smith', message: 'Do you ship to the UK?', status: 'In Progress' },
  { ref: 'XYZ789', name: 'Bob Marley', message: 'Availability of brake pads for Toyota Hilux 2020', status: 'Resolved' },
];

const statusColors = {
  'Pending': 'text-yellow-400',
  'In Progress': 'text-blue-400',
  'Resolved': 'text-green-400',
  'Cancelled': 'text-red-400',
  'Closed': 'text-gray-400',
};

const Navbar = ({ onSignInClick, onSignUpClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [matchedInquiry, setMatchedInquiry] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const found = mockInquiries.find(inq =>
      inq.ref.toLowerCase().includes(value.trim().toLowerCase())
    );
    setMatchedInquiry(found || null);
  };

  return (
<header className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-2xl shadow-lg text-white border-b border-white/10 transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
        {/* Left: Logo and Flags */}
        <div className="flex items-center gap-4 min-w-fit">
          <AdvancedImage cldImg={logo} className="object-contain h-10" alt="Company Logo" />
          <AdvancedImage cldImg={sriLankanFlag} className="object-contain w-8 h-6 rounded-sm" alt="Sri Lankan Flag" />
          <AdvancedImage cldImg={ukFlag} className="object-contain w-8 h-6 rounded-sm" alt="UK Flag" />
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold transition-all duration-300">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/about" className="hover:text-yellow-400">About Us</Link>
          <Link to="/services" className="hover:text-yellow-400">Services</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact Us</Link>
        </nav>

        {/* Right: Search, Home, Profile (Desktop Only) */}
        <div className="hidden md:flex items-center gap-4 min-w-fit">
          

          

          <div className="relative">
            <button onClick={toggleDropdown}>
              <AdvancedImage
                cldImg={profileAvatar}
                className="w-10 h-10 border-2 border-yellow-400 rounded-full"
                alt="Profile"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 text-black bg-white/80 backdrop-blur-md border border-white/20 rounded-xl shadow-xl transition-all duration-300 w-44">
                <button
                  onClick={() => {
                    onSignInClick();
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-yellow-100"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onSignUpClick();
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-yellow-100"
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
        </div>
      </div>

      {/* Mobile Menu (Below main bar) */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2 bg-white/10 backdrop-blur-xl rounded-b-xl border-t border-white/10 text-sm font-semibold text-white">
          <Link to="/" className="block hover:text-yellow-400">Home</Link>
          <Link to="/about" className="block hover:text-yellow-400">About Us</Link>
          <Link to="/services" className="block hover:text-yellow-400">Services</Link>
          <Link to="/contact" className="block hover:text-yellow-400">Contact Us</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
