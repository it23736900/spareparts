// src/components/TrackOrderSearch.jsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBoxOpen, FaUser, FaAt, FaInfoCircle } from "react-icons/fa";
import api from "../utils/api";

// map backend statuses → chip styles
const statusChip = (statusRaw = "") => {
  const status = (statusRaw || "").toLowerCase();
  const map = {
    pending: "text-yellow-300 bg-yellow-300/10 border-yellow-300/30",
    submitted: "text-yellow-300 bg-yellow-300/10 border-yellow-300/30",
    "in review": "text-amber-300 bg-amber-300/10 border-amber-300/30",
    quoted: "text-blue-300 bg-blue-300/10 border-blue-300/30",
    paid: "text-cyan-300 bg-cyan-300/10 border-cyan-300/30",
    dispatched: "text-indigo-300 bg-indigo-300/10 border-indigo-300/30",
    delivered: "text-green-300 bg-green-300/10 border-green-300/30",
    resolved: "text-green-300 bg-green-300/10 border-green-300/30",
    cancelled: "text-red-300 bg-red-300/10 border-red-300/30",
    closed: "text-gray-300 bg-gray-300/10 border-gray-300/30",
  };
  return map[status] || "text-white/90 bg-white/10 border-white/20";
};

export default function TrackOrderSearch() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const normalize = useMemo(
    () => (doc) => {
      if (!doc) return null;
      const d = Array.isArray(doc) ? doc[0] : doc;
      return {
        ref: d.refCode || d.ref || "",
        name: d.fullName || d.customerName || d.name || "",
        email: d.email || d.customerEmail || "",
        item:
          (d.vehicleBrand || d.brand || "Vehicle") +
          (d.description || d.item ? ` – ${d.description || d.item}` : ""),
        status: d.status || "Submitted",
      };
    },
    []
  );

  const doSearch = async () => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(false);
    setSelected(null);

    const ref = encodeURIComponent(q.trim());

    try {
      const { data } = await api.get(`/inquiries/track/${ref}`);
      const norm = normalize(data);
      setSelected(norm);
      setSearched(true);
    } catch (e1) {
      try {
        const { data } = await api.get(`/inquiries`, { params: { ref: q.trim() } });
        const norm = normalize(data);
        if (norm && norm.ref) {
          setSelected(norm);
        } else {
          setSelected(null);
        }
        setSearched(true);
      } catch (e2) {
        setSelected(null);
        setSearched(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="px-4 py-16 sm:px-6 lg:px-8 sm:py-20"
      style={{
        background: `
          linear-gradient(
            180deg,
            #050505 0%,
            #0A0F0D 25%,
            #0A1A15 55%,
            #06110D 80%,
            #050505 100%
          )
        `,
      }}
    >
      <div className="max-w-4xl mx-auto text-center text-soft">
        {/* Heading — only last word gradient */}
        
        <div className="max-w-6xl mx-auto mb-10 text-center md:mb-12">
        <h2
          className="text-2xl font-extrabold text-center text-transparent sm:text-3xl md:text-4xl lg:text-5xl bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(white, white, #111111)",
          }}
        >
          Track Your Order
        </h2>
      </div>
       

        {/* Input group */}
        <div className="relative max-w-2xl mx-auto mt-6">
          <div
            className="absolute -inset-1 rounded-2xl blur-xl opacity-70"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 0%, rgba(16,94,66,0.35), transparent 70%)",
            }}
          />
          <div className="relative flex items-center gap-2 p-2 border rounded-2xl border-white/10 bg-card backdrop-blur-xl">
            <FaSearch className="ml-2 shrink-0 text-white/70" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doSearch()}
              placeholder="Search to track your order (Enter your reference number)"
              className="w-full px-2 py-3 text-soft bg-transparent outline-none placeholder-white/50"
            />
            <button
              onClick={doSearch}
              disabled={loading || !q.trim()}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                loading || !q.trim()
                  ? "bg-white/10 text-white/50 cursor-not-allowed"
                  : "text-black"
              }`}
              style={
                loading || !q.trim()
                  ? {}
                  : {
                      backgroundColor: "#D4AF37",
                      boxShadow: "0 0 20px rgba(212,175,55,0.35)",
                    }
              }
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          <p className="mt-2 text-sm text-white/60">
            {" "}
            <span className="font-semibold text-white/80"></span>
          </p>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="max-w-2xl mx-auto mt-10"
            >
              <div className="p-6 text-left border rounded-2xl border-white/10 bg-card backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FaBoxOpen className="text-white/80" />
                    <div>
                      <p className="text-sm text-white/60">Reference</p>
                      <p className="text-xl font-bold luxury-gold">
                        {selected.ref}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm border ${statusChip(
                      selected.status
                    )}`}
                  >
                    {selected.status}
                  </span>
                </div>

                <div className="grid gap-4 mt-6 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-white/70" />
                    <div>
                      <p className="text-sm text-white/60">Name</p>
                      <p className="text-soft">{selected.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaAt className="text-white/70" />
                    <div>
                      <p className="text-sm text-white/60">Email</p>
                      <p className="text-soft">{selected.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:col-span-2">
                    <FaInfoCircle className="text-white/70" />
                    <div>
                      <p className="text-sm text-white/60">Item</p>
                      <p className="text-soft">{selected.item}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!selected && searched && (
            <motion.p
              key="nores"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-8 text-white/70"
            >
              No order found for that reference. Please check your code and try
              again.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Shimmer style */}
      <style>{`
        .luxury-gold {
          background: linear-gradient(90deg, #FFD95A, #E8B923, #FFD95A);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s linear infinite;
        }
        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}
