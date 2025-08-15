import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBoxOpen, FaUser, FaAt, FaInfoCircle } from "react-icons/fa";

const GOLD = "#D4AF37";

const MOCK = [
  { ref: "ABC123", name: "John Doe", email: "john@example.com", status: "Pending",  item: "Range Rover – Front Grille" },
  { ref: "DEF456", name: "Alice Smith", email: "alice@example.com", status: "In Progress", item: "BMW – Brake Calipers" },
  { ref: "XYZ789", name: "Bob Marley", email: "bob@marley.com", status: "Resolved", item: "Audi – MMI Screen" },
];

const statusChip = (status) => {
  const map = {
    Pending: "text-yellow-300 bg-yellow-300/10 border-yellow-300/30",
    "In Progress": "text-blue-300 bg-blue-300/10 border-blue-300/30",
    Resolved: "text-green-300 bg-green-300/10 border-green-300/30",
    Cancelled: "text-red-300 bg-red-300/10 border-red-300/30",
    Closed: "text-gray-300 bg-gray-300/10 border-gray-300/30",
  };
  return map[status] || "text-white/90 bg-white/10 border-white/20";
};

export default function TrackOrderSearch({ data = MOCK, onSearch }) {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const findByRef = useMemo(() => {
    const index = new Map(data.map((d) => [d.ref.toLowerCase(), d]));
    return (ref) => index.get(ref.trim().toLowerCase()) || null;
  }, [data]);

  const doSearch = async () => {
    if (!q.trim()) return;
    setLoading(true);
    // Wire your real API here later if needed.
    await new Promise((r) => setTimeout(r, 400)); // tiny UX delay
    const result = findByRef(q);
    setSelected(result);
    setSearched(true);
    setLoading(false);
    onSearch?.(q, result);
  };

  return (
    <section className="px-6 py-16 sm:py-20 bg-transparent" aria-label="Track your order">
      <div className="max-w-4xl mx-auto text-center text-soft">
        <h2 className="text-3xl font-extrabold md:text-4xl" style={{ color: GOLD }}>
          Track Your Order
        </h2>

        {/* subtle gold divider */}
        <div
          className="h-[2px] w-48 mx-auto my-4 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.9), transparent)" }}
        />

        {/* Input group */}
        <div className="relative max-w-2xl mx-auto mt-6">
          {/* soft emerald aura */}
          <div
            className="absolute -inset-1 rounded-2xl blur-xl opacity-70"
            style={{ background: "radial-gradient(50% 60% at 50% 0%, rgba(16,94,66,0.35), transparent 70%)" }}
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
                  : { backgroundColor: GOLD, boxShadow: "0 0 20px rgba(212,175,55,0.35)" }
              }
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          <p className="mt-2 text-sm text-white/60">
            Tip: Your reference looks like <span className="font-semibold text-white/80">ABC123</span>
          </p>
        </div>

        {/* Results area */}
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
                      <p className="text-xl font-bold" style={{ color: GOLD }}>{selected.ref}</p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-sm border ${statusChip(selected.status)}`}>
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
              No order found for that reference. Please check your code and try again.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
