// src/pages/Profile.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getUser, updateUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const GOLD = "#D4AF37";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [preview, setPreview] = useState(user?.avatarUrl || "");
  const fileRef = useRef(null);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      navigate("/"); // or open sign-in modal
      return;
    }
    setUser(u);
    setPreview(u.avatarUrl || "");
  }, [navigate]);

  const pick = () => fileRef.current?.click();

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readAsDataURL(file);
    const resized = await downscaleImage(dataUrl, 512);
    setPreview(resized);
  };

  const onSave = () => {
    if (!preview) return;
    updateUser({ avatarUrl: preview }); // persists + notifies Navbar
    setUser(getUser());
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1C1F] via-[#13272A] to-[#0B1C1F] text-white pt-28 px-6">
      <motion.div
        className="max-w-4xl p-8 mx-auto border bg-white/5 border-white/10 rounded-2xl backdrop-blur-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {/* Header */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={preview || "/favicon.ico"}
              alt="avatar"
              className="object-cover border-2 rounded-full w-28 h-28"
              style={{ borderColor: "rgba(212,175,55,0.65)", boxShadow: "0 0 28px rgba(212,175,55,0.25)" }}
              onError={(e) => { e.currentTarget.src = "/favicon.ico"; }}
            />
            <button
              onClick={pick}
              className="absolute px-3 py-1 text-xs -translate-x-1/2 rounded-full -bottom-2 left-1/2 bg-emerald-700 hover:bg-emerald-600"
            >
              Change Photo
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFile}
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold" style={{ color: GOLD }}>
              {user.username}
            </h1>
            <p className="capitalize text-white/60">Role: {user.role}</p>
          </div>
        </div>

        {/* Info cards (extend as needed) */}
        <div className="grid gap-6 mt-8 md:grid-cols-2">
          <div className="bg-[#0B1C1F]/70 rounded-xl p-4 border border-white/10">
            <p className="text-sm text-white/60">Username</p>
            <p className="text-lg">{user.username}</p>
          </div>
          <div className="bg-[#0B1C1F]/70 rounded-xl p-4 border border-white/10">
            <p className="text-sm text-white/60">Account Type</p>
            <p className="text-lg capitalize">{user.role}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onSave}
            className="px-6 py-3 font-semibold rounded-xl"
            style={{
              color: "#0B1C1F",
              backgroundColor: GOLD,
              boxShadow: "0 0 22px rgba(212,175,55,0.35)",
            }}
          >
            Save Changes
          </button>
          <button
            onClick={() => { setPreview(user.avatarUrl || ""); if (fileRef.current) fileRef.current.value = ""; }}
            className="px-6 py-3 font-semibold border rounded-xl bg-white/10 border-white/10"
          >
            Reset
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* helpers */
function readAsDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function downscaleImage(dataUrl, maxSize = 512) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.src = dataUrl;
  });
}
