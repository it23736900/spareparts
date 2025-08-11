// src/pages/Profile.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getUser, updateUser } from "../utils/auth";

const COLORS = {
  gold: "#FFD700",
  deep: "#0B1C1F",
  panel: "rgba(255,255,255,0.06)",
  stroke: "rgba(255,255,255,0.10)",
  textDim: "rgba(255,255,255,0.70)",
  textSub: "rgba(255,255,255,0.55)",
};

export default function Profile() {
  const [admin, setAdmin] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [dirty, setDirty] = useState(false);
  const [flip, setFlip] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    const u =
      getUser?.() || {
        fullName: "Admin (Nicol)",
        role: "Admin",
        email: "admin@nicol.lk",
        phone: "+94 7X XXX XXXX",
        memberSince: "Jan 2024",
        lastLogin: "2 hours ago",
        avatarUrl: "",
      };
    setAdmin(u);
    setAvatar(u.avatarUrl || "");
  }, []);

  if (!admin) return null;

  const pick = () => fileRef.current?.click();

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/image\/(png|jpe?g|webp)/i.test(f.type)) return alert("Use JPG/PNG/WEBP");
    if (f.size > 2 * 1024 * 1024) return alert("Max 2MB");
    const dataUrl = await readAsDataURL(f);
    const resized = await downscaleImage(dataUrl, 540);
    setAvatar(resized);
    setDirty(true);
  };

  const onSave = async () => {
    await Promise.resolve(updateUser?.({ ...admin, avatarUrl: avatar }));
    setDirty(false);
  };

  const onCancel = () => {
    setAvatar(admin.avatarUrl || "");
    setDirty(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="min-h-screen text-white">
      {/* background */}
      <div
        className="fixed inset-0 -z-10 animate-[bgShift_18s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(1200px 600px at -10% -10%, #16423A 0%, transparent 60%), radial-gradient(1200px 800px at 120% 120%, #0E3A2F 0%, transparent 60%), linear-gradient(135deg, #0B1C1F 0%, #102526 55%, #0B1C1F 100%)",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(600px 240px at 50% 0%, rgba(255,215,0,0.08), transparent 70%)",
        }}
      />
      <style>{`
        @keyframes bgShift {
          0% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(-8deg); }
          100% { filter: hue-rotate(0deg); }
        }
      `}</style>

      {/* header */}
      <div className="max-w-6xl px-5 pt-10 mx-auto">
        <div
          className="flex items-center justify-between px-5 py-4 border rounded-2xl backdrop-blur-xl"
          style={{ background: COLORS.panel, borderColor: COLORS.stroke }}
        >
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 border rounded-lg"
              style={{ borderColor: COLORS.stroke }}
            >
              Cancel
            </button>
            <button
              disabled={!dirty}
              onClick={onSave}
              className="px-4 py-2 font-semibold rounded-lg disabled:opacity-50"
              style={{ background: COLORS.gold, color: COLORS.deep }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="max-w-6xl px-5 py-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[380px,1fr] gap-6">
          {/* profile card */}
          <div style={{ perspective: 1200 }}>
            <motion.div
              onClick={() => setFlip((v) => !v)}
              className="relative border shadow-lg cursor-pointer rounded-2xl backdrop-blur-xl"
              style={{
                background: COLORS.panel,
                borderColor: COLORS.stroke,
                transformStyle: "preserve-3d",
                minHeight: 420,
              }}
              animate={{ rotateY: flip ? 180 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* front */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6" style={{ backfaceVisibility: "hidden" }}>
                <img
                  src={avatar || "/favicon.ico"}
                  alt="admin avatar"
                  className="object-cover w-40 h-40 border-2 rounded-full"
                  style={{
                    borderColor: "rgba(255,215,0,0.65)",
                    boxShadow: "0 0 32px rgba(255,215,0,0.22)",
                  }}
                />
                <div className="mt-4 text-xl font-semibold">{admin.fullName}</div>
                <div
                  className="px-3 py-1 mt-2 text-xs font-medium rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #0f9b0f, #00b09b)",
                    color: "#fff",
                  }}
                >
                  {admin.role || "Admin"}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    pick();
                  }}
                  className="px-4 py-2 mt-5 border rounded-lg"
                  style={{ borderColor: COLORS.stroke }}
                >
                  Change Photo
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
              </div>

              {/* back */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-6"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <div className="mb-2 text-lg font-semibold">Profile Actions</div>
                <div className="flex gap-3">
                  <button
                    disabled={!dirty}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSave();
                    }}
                    className="px-4 py-2 font-semibold rounded-lg disabled:opacity-50"
                    style={{ background: COLORS.gold, color: COLORS.deep }}
                  >
                    Save
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFlip(false);
                    }}
                    className="px-4 py-2 border rounded-lg"
                    style={{ borderColor: COLORS.stroke }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* details */}
          <div className="p-6 border rounded-2xl backdrop-blur-xl" style={{ background: COLORS.panel, borderColor: COLORS.stroke }}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Info label="Email" value={admin.email} />
              <Info label="Phone" value={admin.phone} />
              <Info label="Member Since" value={admin.memberSince} />
              <Info label="Last Login" value={admin.lastLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="px-3 py-2 border rounded-xl"
      style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
    >
      <div className="text-[11px] mb-0.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.55)" }}>
        {label}
      </div>
      <div className="text-sm">{value || "-"}</div>
    </motion.div>
  );
}

function readAsDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function downscaleImage(dataUrl, max = 540) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };
    img.src = dataUrl;
  });
}
