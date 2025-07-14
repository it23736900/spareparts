import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

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

// ✅ Navbar component
const Navbar = ({ onSignInClick, onSignUpClick }) => {
  return (
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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
