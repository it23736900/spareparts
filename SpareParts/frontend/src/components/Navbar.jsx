import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import GetQuotationForm from './GetQuotationForm';

// ✅ Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: "dnk3tgxht",
  },
});

// ✅ Load logo and flags
const logo = cld.image("logo_e46o12").format("auto").quality("auto").resize(auto().width(120));
const sriLankanFlag = cld.image("sri_lanka_elrjw8").format("png").quality("auto:best").resize(auto().width(32));
const ukFlag = cld.image("UK_j0lfab").format("png").quality("auto:best").resize(auto().width(32));

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
        </div>
      </header>

      {/* Modal Form */}
      {showModal && <QuotationModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
