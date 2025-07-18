import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0B1C1F] text-white pt-32 px-6" data-aos="fade-up">
      <div className="max-w-4xl mx-auto space-y-16">

        <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow mb-6 border-b border-yellow-500 pb-4 w-fit" data-aos="zoom-in">
          Contact Us
        </h1>

        <section className="bg-[#132a30] p-6 rounded-xl border border-yellow-500/10 shadow space-y-4" data-aos="fade-right">
          <p>
            📧 Email: <a href="mailto:inquiry@luxuryautoparts.com" className="text-green-400 hover:underline">inquiry@luxuryautoparts.com</a>
          </p>
          <p>
            📞 Phone: <a href="tel:+18885557278" className="text-green-400 hover:underline">+1 (888) 555-PART</a>
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
              className="w-full p-3 rounded-lg bg-[#1B2A2F] border border-white/10 text-white placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-[#1B2A2F] border border-white/10 text-white placeholder-gray-400"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-[#1B2A2F] border border-white/10 text-white placeholder-gray-400"
            ></textarea>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg text-white font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
