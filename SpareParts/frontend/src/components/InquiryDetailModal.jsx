import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

/* gold + emerald theme */
const GOLD = "#D4AF37";

export default function InquiryDetailModal({ inquiry, open, onClose, onAddNote }) {
  const [note, setNote] = useState("");

  if (!open || !inquiry) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    onAddNote?.(inquiry.id, note);
    setNote("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="w-full max-w-3xl p-6 rounded-2xl border bg-[#0B1F19] border-white/10 shadow-xl relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md bg-white/5 border border-white/10"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-2 text-white/90">
          Inquiry Details – <span style={{ color: GOLD }}>{inquiry.ref}</span>
        </h2>
        <p className="text-sm text-gray-300 mb-6">
          Submitted on {new Date(inquiry.createdAt).toLocaleString()}
        </p>

        {/* Inquiry info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Info label="Name" value={inquiry.name} />
          <Info label="Email" value={inquiry.email} />
          <Info label="Brand" value={inquiry.brand} />
          <Info label="Part" value={inquiry.item} />
          <Info label="Status" value={inquiry.status} />
        </div>

        {/* Notes Log */}
        <h3 className="text-lg font-semibold mb-2 text-white/90">Notes Log</h3>
        <div className="max-h-48 overflow-y-auto border rounded-lg p-3 mb-4 bg-white/5 border-white/10 space-y-2">
          {inquiry.notes?.length ? (
            inquiry.notes.map((n, i) => (
              <div
                key={i}
                className="p-2 rounded-md bg-white/5 border border-white/10 text-sm"
              >
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{n.agent}</span>
                  <span>{new Date(n.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-white/85">{n.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No notes yet.</p>
          )}
        </div>

        {/* Add new note */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition text-white flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* helper for displaying a label/value pair */
function Info({ label, value }) {
  return (
    <div className="text-sm">
      <p className="text-gray-400">{label}</p>
      <p className="font-medium text-white/90">{value || "-"}</p>
    </div>
  );
}
