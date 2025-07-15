import React, { useState } from 'react';

const mockInquiries = [
  { ref: 'ABC123', name: 'John Doe', email: 'john@example.com', status: 'Pending' },
  { ref: 'DEF456', name: 'Alice Smith', email: 'alice@example.com', status: 'In Progress' },
  { ref: 'XYZ789', name: 'Bob Marley', email: 'bob@marley.com', status: 'Resolved' },
];

const statusColors = {
  'Pending': 'text-yellow-400',
  'In Progress': 'text-blue-400',
  'Resolved': 'text-green-400',
  'Cancelled': 'text-red-400',
  'Closed': 'text-gray-400',
};

const InquiryTracker = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const handleSearch = () => {
    const found = mockInquiries.find(inq =>
      inq.ref.toLowerCase() === query.trim().toLowerCase()
    );
    setSelected(found || null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1C1F] via-[#13272A] to-[#0B1C1F] px-6 py-16 text-white flex flex-col items-center">
      <h1 className="mb-8 text-3xl font-bold text-yellow-400">Track Your Inquiry</h1>

      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your reference number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 mb-4 text-white placeholder-gray-300 border bg-white/10 border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleSearch}
          className="w-full py-3 font-semibold text-black transition bg-yellow-400 rounded-xl hover:bg-yellow-500"
        >
          Track Inquiry
        </button>
      </div>

      {selected && (
        <div className="w-full max-w-md p-6 mt-10 border shadow-lg bg-white/5 rounded-2xl border-white/10 backdrop-blur-md">
          <p className="mb-2 text-sm text-gray-300">Reference:</p>
          <h2 className="text-xl font-bold text-yellow-300">{selected.ref}</h2>

          <p className="mt-4 text-sm text-gray-300">Name:</p>
          <p className="text-white">{selected.name}</p>

          <p className="mt-4 text-sm text-gray-300">Email:</p>
          <p className="text-white">{selected.email}</p>

          <p className="mt-4 text-sm text-gray-300">Status:</p>
          <p className={`text-lg font-semibold ${statusColors[selected.status] || 'text-white'}`}>
            {selected.status}
          </p>
        </div>
      )}

      {!selected && query && (
        <p className="mt-6 text-sm text-gray-400">No matching inquiry found.</p>
      )}
    </div>
  );
};

export default InquiryTracker;
