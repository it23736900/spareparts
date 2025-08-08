import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 px-6" data-aos="fade-up">
      <div className="max-w-4xl mx-auto space-y-16">

        <h1 className="text-5xl font-extrabold text-emerald-400 drop-shadow mb-6 border-b border-emerald-500 pb-4 w-fit" data-aos="zoom-in">
          Contact Us
        </h1>

        <section className="bg-gradient-to-br from-gray-900/50 to-black/50 p-6 rounded-xl border border-emerald-600/20 shadow-lg space-y-4" data-aos="fade-right">
          <p>
            📧 Email: <a href="mailto:inquiry@luxuryautoparts.com" className="text-emerald-400 hover:underline">inquiry@luxuryautoparts.com</a>
          </p>
          <p>
            📞 Phone: <a href="tel:+18885557278" className="text-emerald-400 hover:underline">+1 (888) 555-PART</a>
          </p>
          <p>
            📍 Address: <span className="text-gray-300">No.63, Buthgamuwa Road, Rajagiriya, 10100, Sri Lanka</span>
          </p>
        </section>

        <section data-aos="zoom-in-up">
          <h2 className="text-2xl font-bold text-white mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-xl bg-gray-900/50 border border-emerald-600/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-xl bg-gray-900/50 border border-emerald-600/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-4 rounded-xl bg-gray-900/50 border border-emerald-600/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-600/25"
            >
              Send Message
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
