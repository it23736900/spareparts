import React from 'react';
import { FaTools, FaShippingFast, FaCreditCard, FaClipboardCheck } from 'react-icons/fa';

const steps = [
  { icon: <FaClipboardCheck />, title: 'Submit Your Inquiry', desc: 'Share the required spare parts details with us.' },
  { icon: <FaTools />, title: 'We Get in Touch', desc: 'Our team reviews your request and confirms additional details.' },
  { icon: <FaCreditCard />, title: 'Receive a Quote', desc: 'We provide a detailed quote based on your request.' },
  { icon: <FaClipboardCheck />, title: 'Order Confirmation', desc: 'Confirm your order details with us.' },
  { icon: <FaCreditCard />, title: 'Advance Payment', desc: 'Make an initial payment to begin processing.' },
  { icon: <FaClipboardCheck />, title: 'Order Confirmation Receipt', desc: 'Receive official confirmation of your order.' },
  { icon: <FaShippingFast />, title: 'Logistics Coordination', desc: 'We arrange safe and efficient import from the UK.' },
  { icon: <FaCreditCard />, title: 'Settle Balance Payment', desc: 'Complete the final payment upon shipment.' },
  { icon: <FaShippingFast />, title: 'Parts Delivered', desc: 'Receive your parts quickly and securely within 3 to 4 days.' },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 px-6" data-aos="fade-up">
      <div className="max-w-6xl mx-auto space-y-16">

        <h1 className="text-5xl font-extrabold text-emerald-400 drop-shadow mb-6 border-b border-emerald-500 pb-4 w-fit" data-aos="zoom-in">
          Our Services / How It Works
        </h1>

        <section data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6 text-white">🔧 Step-by-Step Process</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-emerald-600/20 p-6 shadow-lg hover:shadow-emerald-600/20 transition-all duration-300 transform hover:scale-105"
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
              >
                <div className="text-emerald-400 text-2xl mb-2">{step.icon}</div>
                <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                <p className="text-sm text-gray-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section data-aos="fade-right">
          <h2 className="text-2xl font-bold text-white mb-4">🚚 Shipping & Delivery Methods</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li><span className="text-emerald-400">Sea Cargo</span> – For larger, cost-effective shipments</li>
            <li><span className="text-emerald-400">Air Cargo</span> – Fast delivery for urgent orders</li>
            <li><span className="text-emerald-400">Courier Service</span> – Ideal for smaller parts</li>
          </ul>
        </section>

        <section data-aos="fade-up">
          <h2 className="text-2xl font-bold text-white mb-4">🔩 Installation Support</h2>
          <p className="text-gray-300">
            We work with <span className="text-emerald-400 font-semibold">recommended partner garages</span> across Sri Lanka.
            Let us know your location and we’ll connect you to a trusted mechanic for professional installation of your parts.
          </p>
        </section>

      </div>
    </div>
  );
}
