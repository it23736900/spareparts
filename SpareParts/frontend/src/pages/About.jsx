import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 px-6" data-aos="fade-up">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-emerald-400 drop-shadow mb-6 border-b border-emerald-500 pb-4 w-fit">
          About Us
        </h1>

        {/* Company Background */}
        <section className="space-y-4" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-white">📦 Company Background</h2>
          <p className="text-gray-300 leading-relaxed">
            Founded in 2000, our group has grown into a diversified leader in Sri Lanka’s business landscape.
            Today, we operate three successful companies and in 2025, we launched our newest venture: a dedicated
            European used spare parts importing company. We import genuine parts directly from our UK breaker’s yard
            to serve Sri Lanka’s automotive market with speed and authenticity.
          </p>
        </section>

        {/* Mission */}
        <section className="space-y-4 border-l-4 border-emerald-400 pl-4" data-aos="fade-right">
          <h2 className="text-2xl font-bold text-white">🎯 Our Mission</h2>
          <p className="text-gray-300 italic">
            “To be Sri Lanka’s trusted direct importer of genuine, high‑quality used European vehicle parts and spares —
            delivering reliability, safety, and peace of mind by sourcing directly from the UK.”
          </p>
        </section>

        {/* Values */}
        <section data-aos="zoom-in">
          <h2 className="text-2xl font-bold text-white mb-4">💡 Our Values</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-300">
            <li><span className="text-emerald-400 font-semibold">Transparency:</span> Clear sourcing, honest pricing, and open communication.</li>
            <li><span className="text-emerald-400 font-semibold">Genuine Quality:</span> Only authentic European auto parts imported.</li>
            <li><span className="text-emerald-400 font-semibold">Fast Service:</span> Reliable island-wide delivery and quick response.</li>
            <li><span className="text-emerald-400 font-semibold">Global Reach:</span> Direct partnerships across the UK automotive market.</li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-emerald-600/20 rounded-xl p-6 shadow-lg" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">✅ Why Choose Us?</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Specialized in top European brands: Range Rover, BMW, Mercedes, Audi, Volvo, and more.</li>
            <li>Flexible air & sea cargo options to match urgency and budget.</li>
            <li>Strong UK supplier network for consistent, high-quality sourcing.</li>
            <li>Authentic, tested, and fast-delivered vehicle spare parts.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
