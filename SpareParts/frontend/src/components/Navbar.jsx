import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

// ✅ Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: "dnk3tgxht", // ✅ Your Cloudinary cloud name
  },
});

// ✅ Load logo from Cloudinary
const logo = cld.image("logo_e46o12").format("auto").quality("auto").resize(auto().width(120));

const Navbar = () => {
  return (
    <header className="fixed w-full z-50 bg-black/40 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <AdvancedImage cldImg={logo} className="h-10 object-contain" alt="Logo" />

        <nav className="space-x-6 text-white">
          <a href="#" className="hover:text-green-400">Home</a>
          <a href="#" className="hover:text-green-400">Sign In</a>
          <a href="#" className="hover:text-green-400">Sign Up</a>
          <a href="#" className="hover:text-green-400">Profile</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
