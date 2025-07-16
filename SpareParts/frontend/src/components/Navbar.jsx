import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
<<<<<<< HEAD
import GetQuotationForm from './GetQuotationForm';
=======
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
>>>>>>> 4483b6b78bac643d7475944ea7312393866ac889

// Cloudinary config
const cld = new Cloudinary({
  cloud: { cloudName: "dnk3tgxht" },
});

// Images
const logo = cld.image("logo_e46o12").format("auto").quality("auto").resize(auto().width(120));
const sriLankanFlag = cld.image("sri_lanka_elrjw8").format("png").quality("auto:best").resize(auto().width(32));
const ukFlag = cld.image("UK_j0lfab").format("png").quality("auto:best").resize(auto().width(32));
const profileAvatar = cld.image("default_avatar_khvzvj").format("auto").quality("auto").resize(auto().width(40));

const mockInquiries = [
  {
    ref: 'ABC123',
    name: 'John Doe',
    message: 'Need pricing for engine parts.',
    status: 'Pending',
  },
  {
    ref: 'DEF456',
    name: 'Alice Smith',
    message: 'Do you ship to the UK?',
    status: 'In Progress',
  },
  {
    ref: 'XYZ789',
    name: 'Bob Marley',
    message: 'Availability of brake pads for Toyota Hilux 2020',
    status: 'Resolved',
  },
];

const statusColors = {
  'Pending': 'text-yellow-400',
  'In Progress': 'text-blue-400',
  'Resolved': 'text-green-400',
  'Cancelled': 'text-red-400',
  'Closed': 'text-gray-400',
};

<<<<<<< HEAD
// ✅ Modal Wrapper Component
const QuotationModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
      >
        &times;
      </button>
      <GetQuotationForm />
    </div>
  </div>
);

// ✅ Navbar component
const Navbar = ({ onSignInClick, onSignUpClick }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="fixed w-full z-50 bg-black/40 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left side - Logo and Flags */}
          <div className="flex items-center space-x-4">
            <AdvancedImage cldImg={logo} className="h-10 object-contain" alt="Company Logo" />
            <AdvancedImage cldImg={sriLankanFlag} className="h-6 w-8 object-contain rounded-sm" alt="Sri Lankan Flag" />
            <AdvancedImage cldImg={ukFlag} className="h-6 w-8 object-contain rounded-sm" alt="UK Flag" />
          </div>

          {/* Right side - Navigation */}
          <nav className="space-x-6 text-white">
            <a href="#" className="hover:text-green-400">Home</a>

            <button
              onClick={onSignInClick}
              className="hover:text-green-400 focus:outline-none"
            >
              Sign In
            </button>

            <button
              onClick={onSignUpClick}
              className="hover:text-green-400 focus:outline-none"
            >
              Sign Up
            </button>

            <a href="#" className="hover:text-green-400">Profile</a>

            <button
              onClick={() => setShowModal(true)}
              className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600"
            >
              Get Quotation
            </button>
          </nav>
=======
const Navbar = ({ onSignInClick, onSignUpClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [matchedInquiry, setMatchedInquiry] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    const found = mockInquiries.find(inq =>
      inq.ref.toLowerCase().includes(value.trim().toLowerCase())
    );
    setMatchedInquiry(found || null);
  };

  return (
    <header className="fixed w-full z-50 bg-[#0B1C1F]/90 backdrop-blur-md shadow-md text-white">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 mx-auto max-w-7xl">
        {/* Left: Logo and Flags */}
        <div className="flex items-center gap-4 min-w-fit">
          <AdvancedImage cldImg={logo} className="object-contain h-10" alt="Company Logo" />
          <AdvancedImage cldImg={sriLankanFlag} className="object-contain w-8 h-6 rounded-sm" alt="Sri Lankan Flag" />
          <AdvancedImage cldImg={ukFlag} className="object-contain w-8 h-6 rounded-sm" alt="UK Flag" />
>>>>>>> 4483b6b78bac643d7475944ea7312393866ac889
        </div>
      </header>

<<<<<<< HEAD
      {/* Modal Form */}
      {showModal && <QuotationModal onClose={() => setShowModal(false)} />}
    </>
=======
        {/* Center: Search Bar */}
        <div className="relative flex-1 w-full max-w-md">
          <input
            type="text"
            placeholder="Track your orders"
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full px-5 py-2.5 text-sm rounded-xl bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-white/10 backdrop-blur-md"
          />
          {searchValue && (
            <div className="absolute top-full left-0 w-full mt-1 bg-[#1B2A2F] text-white rounded-xl shadow-lg border border-white/10 z-50">
              {matchedInquiry ? (
                <div className="p-4 border bg-white/5 backdrop-blur-lg border-white/10 rounded-xl">
                  <p className="mb-1 text-sm text-gray-300">
                    <span className="font-semibold text-white">Reference:</span>{' '}
                    <span className="font-bold text-yellow-400">{matchedInquiry.ref}</span>
                  </p>
                  <p className="mb-1 text-sm text-gray-300">
                    <span className="font-semibold text-white">Name:</span>{' '}
                    {matchedInquiry.name}
                  </p>
                  <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold text-white">Inquiry:</span>{' '}
                    {matchedInquiry.message}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-white">Status:</span>{' '}
                    <span className={`font-bold ${statusColors[matchedInquiry.status]}`}>
                      {matchedInquiry.status}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="p-4 text-sm text-gray-400">No matching inquiry found</div>
              )}
            </div>
          )}
        </div>

        {/* Right: Home + Profile */}
        <div className="relative flex items-center gap-4 min-w-fit">
          {/* Home Button */}
          <a
            href="/"
            className="p-2 text-black transition bg-yellow-400 rounded-full hover:bg-yellow-500"
            aria-label="Home"
          >
            <FaHome className="text-lg" />
          </a>

          {/* Profile Avatar + Dropdown */}
          <div>
            <button onClick={toggleDropdown}>
              <AdvancedImage
                cldImg={profileAvatar}
                className="w-10 h-10 border-2 border-yellow-400 rounded-full"
                alt="Profile"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 text-black bg-white rounded-md shadow-lg w-44">
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
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-yellow-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
>>>>>>> 4483b6b78bac643d7475944ea7312393866ac889
  );
};

export default Navbar;