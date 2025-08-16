import React, { useState } from 'react';

// 🔹 Mock inquiry data
const mockInquiries = [
  { ref: 'ABC123', name: 'John Doe', email: 'john@example.com', status: 'Pending' },
  { ref: 'DEF456', name: 'Alice Smith', email: 'alice@example.com', status: 'In Progress' },
  { ref: 'XYZ789', name: 'Bob Marley', email: 'bob@marley.com', status: 'Resolved' },
  { ref: 'LMN321', name: 'Charlie Brown', email: 'charlie@brown.com', status: 'Cancelled' },
];

// 🔹 Status → Gold glow + metallic theme colors
const statusColors = {
  'Pending': 'text-yellow-400 drop-shadow-[0_0_6px_rgba(230,200,79,0.7)]',
  'In Progress': 'text-blue-400 drop-shadow-[0_0_6px_rgba(79,200,255,0.5)]',
  'Resolved': 'text-green-400 drop-shadow-[0_0_6px_rgba(79,255,150,0.5)]',
  'Cancelled': 'text-red-400 drop-shadow-[0_0_6px_rgba(255,120,120,0.5)]',
  'Closed': 'text-gray-400',
};

// 🔹 Theme constants
const METALLIC_GREEN = `
  linear-gradient(135deg, rgba(5,25,15,0.95) 0%, rgba(8,30,20,0.95) 50%, rgba(5,25,15,0.95) 100%)
`;
const GOLD = "#E6C84F";

const InquiryTracker = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const handleSearch = () => {
    const found = mockInquiries.find(
      (inq) => inq.ref.toLowerCase() === query.trim().toLowerCase()
    );
    setSelected(found || null);
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen px-6 py-16 text-white"
      style={{ background: METALLIC_GREEN }}
    >
      {/* 🔹 Title */}
      <h1 className="mb-8 text-3xl font-extrabold tracking-wide text-center"
          style={{ color: GOLD, textShadow: "0 0 10px rgba(230,200,79,0.5)" }}>
        Track Your Inquiry
      </h1>

      {/* 🔹 Search Box */}
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your reference number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 mb-4 text-white placeholder-gray-400
                     rounded-lg bg-[#0A1F14]/70 border border-yellow-400/20
                     focus:outline-none focus:ring-1 focus:ring-yellow-400/40
                     shadow-[inset_0_0_6px_rgba(230,200,79,0.15)]"
        />
        <button
          onClick={handleSearch}
          className="w-full py-3 font-semibold text-black rounded-lg
                     transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: GOLD,
            boxShadow: "0 0 12px rgba(230,200,79,0.5), inset 0 0 6px rgba(0,0,0,0.4)",
          }}
        >
          Track Inquiry
        </button>
      </div>

      {/* 🔹 Inquiry Card */}
      {selected && (
        <div
          className="w-full max-w-md p-6 mt-10 border rounded-lg backdrop-blur-sm"
          style={{
            background: "rgba(10,30,20,0.85)",  // dark green base
            borderColor: "rgba(230,200,79,0.25)", // very slight gold outline
            boxShadow: "0 0 16px rgba(230,200,79,0.25)",
          }}
        >
          <p className="mb-1 text-sm text-gray-300">Reference:</p>
          <h2 className="text-xl font-bold" style={{ color: GOLD }}>
            {selected.ref}
          </h2>

          <p className="mt-4 text-sm text-gray-300">Name:</p>
          <p className="text-white">{selected.name}</p>

          <p className="mt-4 text-sm text-gray-300">Email:</p>
          <p className="text-white">{selected.email}</p>

          <p className="mt-4 text-sm text-gray-300">Status:</p>
          <p
            className={`text-lg font-semibold ${statusColors[selected.status] || "text-white"}`}
          >
            {selected.status}
          </p>
        </div>
      )}

      {/* 🔹 Not Found */}
      {!selected && query && (
        <p className="mt-6 text-sm text-gray-400">
          No matching inquiry found.
        </p>
      )}
    </div>
  );
};

export default InquiryTracker;
