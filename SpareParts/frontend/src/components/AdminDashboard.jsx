// src/components/AdminDashboard.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaShippingFast,
  FaHistory,
  FaChartBar,
  FaSignOutAlt,
  FaSearch,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* =========================================
   THEME — deeper metallic emerald + gold
   ========================================= */
const GOLD = "#D4AF37";
const GOLD_SOFT = "#F7E98E";
const GOLD_DEEP = "#B9922F";
const EMERALD = "#17A77A";
const CYAN = "#00F5C8";

/* Page bg (darker metallic deep green, not black) */
const BG_APP_DEEP = `
  radial-gradient(110% 70% at 50% -20%, rgba(5,24,20,0.75) 0%, rgba(0,0,0,0) 62%),
  radial-gradient(90% 70% at 120% 120%, rgba(7,28,23,0.65) 0%, rgba(0,0,0,0) 60%),
  linear-gradient(180deg, #05110E 0%, #091914 54%, #0B1F19 100%)
`;

/* Panels slightly darker for premium contrast */
const PANEL = "linear-gradient(180deg, rgba(3,10,9,0.94), rgba(4,12,11,0.93))";

/* Sidebar: extra dark metallic green, glassy & transparent (like Navbar) */
const SIDEBAR_METALLIC = `
  linear-gradient(
    135deg,
    rgba(2,8,6,0.98) 0%,
    rgba(6,18,15,0.97) 45%,
    rgba(2,8,6,0.98) 100%
  )
`;

/* Pipeline stages */
const STAGES = ["Submitted", "In Review", "Quoted", "Paid", "Dispatched", "Delivered"];
const STAGE_COLORS = {
  Submitted: GOLD_SOFT,
  "In Review": "#FFD45A",
  Quoted: "#FFC94A",
  Paid: GOLD,
  Dispatched: GOLD_DEEP,
  Delivered: "#E3D38A",
};

/* Mock data (swap for your API) */
const MOCK_INQUIRIES = [
  { ref: "ET-1001", name: "Kavindu", email: "k@ex.lk", brand: "Range Rover", item: "Front Grille", status: "Submitted",   createdAt: "2025-08-18" },
  { ref: "ET-1002", name: "Ishara",  email: "i@ex.lk", brand: "BMW",         item: "Brake Calipers", status: "In Review", createdAt: "2025-08-18" },
  { ref: "ET-1003", name: "Nuwan",   email: "n@ex.lk", brand: "Mercedes",    item: "ECU",            status: "Quoted",    createdAt: "2025-08-19" },
  { ref: "ET-1004", name: "Sahan",   email: "s@ex.lk", brand: "Audi",        item: "MMI Screen",     status: "Paid",      createdAt: "2025-08-20" },
  { ref: "ET-1005", name: "Dilini",  email: "d@ex.lk", brand: "Volvo",       item: "Headlights",     status: "Dispatched",createdAt: "2025-08-21" },
  { ref: "ET-1006", name: "Amaya",   email: "a@ex.lk", brand: "Jaguar",      item: "Mirror Assy",    status: "Delivered", createdAt: "2025-08-21" },
  { ref: "ET-1007", name: "Ramesh",  email: "r@ex.lk", brand: "VW",          item: "ABS Sensor",     status: "Submitted", createdAt: "2025-08-22" },
];

/* =========================================
   Advanced Line Chart (dual-series)
   ========================================= */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function catmullRom2bezier(points, tension = 0.5) {
  if (points.length < 2) return "";
  const d = [];
  d.push(`M ${points[0][0]} ${points[0][1]}`);
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const t = tension;

    const cp1x = p1[0] + ((p2[0] - p0[0]) / 6) * t;
    const cp1y = p1[1] + ((p2[1] - p0[1]) / 6) * t;
    const cp2x = p2[0] - ((p3[0] - p1[0]) / 6) * t;
    const cp2y = p2[1] - ((p3[1] - p1[1]) / 6) * t;

    d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`);
  }
  return d.join(" ");
}

function useNearestIndex(points) {
  return (mouseX) => {
    let idx = 0, min = Infinity;
    points.forEach(([px], i) => {
      const dist = Math.abs(mouseX - px);
      if (dist < min) { min = dist; idx = i; }
    });
    return idx;
  };
}

function LineChartAdvanced({
  series = [
    { name: "Inquiries", color: `url(#gold-line)`, rawColor: GOLD, data: [6, 9, 7, 11, 14, 10, 13] },
    { name: "Resolved",  color: `url(#emerald-line)`, rawColor: CYAN, data: [2, 3, 4, 6, 8, 7, 9] },
  ],
  width = 720,
  height = 300,
}) {
  const padding = { l: 48, r: 22, t: 30, b: 34 };
  const iw = width - padding.l - padding.r;
  const ih = height - padding.t - padding.b;

  const maxVal = Math.max(1, ...series.flatMap((s) => s.data));
  const stepX = iw / (DAYS.length - 1);
  const scaleX = (i) => padding.l + i * stepX;
  const scaleY = (v) => padding.t + (1 - v / maxVal) * ih;

  const allPoints = series.map((s) => s.data.map((v, i) => [scaleX(i), scaleY(v)]));
  const [hover, setHover] = useState(null);
  const svgRef = useRef(null);

  const getNearest = useNearestIndex(allPoints[0]);
  const onMove = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const idx = getNearest(x);
    setHover({ idx, x: scaleX(idx) });
  };
  const onLeave = () => setHover(null);

  // Y ticks
  const yTicks = 4;
  const yVals = Array.from({ length: yTicks + 1 }, (_, k) => Math.round((maxVal * k) / yTicks));

  return (
    <svg
      ref={svgRef}
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="rounded-xl"
      style={{ background: PANEL, border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <defs>
        <linearGradient id="gold-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFE36E" />
          <stop offset="55%" stopColor={GOLD} />
          <stop offset="100%" stopColor="#FFC94A" />
        </linearGradient>
        <linearGradient id="gold-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(212,175,55,0.22)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0.06)" />
        </linearGradient>

        <linearGradient id="emerald-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#41FFD7" />
          <stop offset="100%" stopColor={CYAN} />
        </linearGradient>
        <linearGradient id="emerald-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,245,200,0.18)" />
          <stop offset="100%" stopColor="rgba(0,245,200,0.05)" />
        </linearGradient>
      </defs>

      {/* Grid */}
      {yVals.map((yv, i) => {
        const y = scaleY(yv);
        return (
          <line
            key={i}
            x1={padding.l}
            x2={width - padding.r}
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axes labels */}
      {yVals.map((yv, i) => (
        <text
          key={i}
          x={padding.l - 10}
          y={scaleY(yv)}
          fontSize="10"
          fill="rgba(230,230,224,.75)"
          textAnchor="end"
          alignmentBaseline="middle"
        >
          {yv}
        </text>
      ))}
      {DAYS.map((d, i) => (
        <text
          key={d}
          x={scaleX(i)}
          y={height - padding.b + 16}
          fontSize="11"
          fill="rgba(230,230,224,.75)"
          textAnchor="middle"
        >
          {d}
        </text>
      ))}

      {/* Areas + glow + lines */}
      {allPoints.map((pts, sIdx) => {
        const path = catmullRom2bezier(pts, 0.85);
        const baseY = scaleY(0);
        const areaPath = `M ${pts[0][0]} ${baseY} L ${pts[0][0]} ${pts[0][1]} ${path.replace(/^M[^C]+/, "")} L ${pts[pts.length - 1][0]} ${baseY} Z`;
        const lineColor = series[sIdx].color;
        const areaId = sIdx === 0 ? "gold-area" : "emerald-area";

        return (
          <g key={sIdx}>
            <path d={areaPath} fill={`url(#${areaId})`} />
            <path d={path} fill="none" stroke="rgba(212,175,55,0.28)" strokeWidth="10" style={{ filter: "blur(8px)" }} />
            <path d={path} fill="none" stroke={lineColor} strokeWidth="3" />
            {pts.map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="4.2" fill={series[sIdx].rawColor} />
                <circle cx={cx} cy={cy} r="8.5" fill={`${series[sIdx].rawColor}2A`} />
              </g>
            ))}
          </g>
        );
      })}

      {/* Legend */}
      <g transform={`translate(${padding.l}, ${padding.t - 10})`}>
        {series.map((s, i) => (
          <g key={s.name} transform={`translate(${i * 140}, 0)`}>
            <rect width="16" height="6" rx="2" fill={i === 0 ? GOLD : CYAN} />
            <text x="24" y="6" fontSize="12" fill="#E6E6E0" alignmentBaseline="middle">
              {s.name}
            </text>
          </g>
        ))}
      </g>

      {/* Tooltip */}
      {hover && (
        <>
          <line
            x1={hover.x}
            x2={hover.x}
            y1={padding.t}
            y2={height - padding.b}
            stroke="rgba(255,255,255,.25)"
            strokeDasharray="4 4"
          />
          <g transform={`translate(${Math.min(hover.x + 10, width - 160)}, ${padding.t + 8})`}>
            <rect width="150" height="62" rx="10" fill="rgba(3,10,9,0.96)" stroke="rgba(255,255,255,0.08)" />
            <text x="10" y="18" fontSize="12" fill="#E6E6E0">{DAYS[hover.idx]}</text>
            {series.map((s, i) => (
              <text key={i} x="10" y={36 + i * 14} fontSize="12" fill={s.rawColor}>
                {s.name}: {s.data[hover.idx]}
              </text>
            ))}
          </g>
        </>
      )}
    </svg>
  );
}

/* Donut + Stage bars */
function DonutChart({ series }) {
  const size = 240;
  const stroke = 22;
  const r = (size - stroke) / 2;
  const c = Math.PI * 2 * r;
  const sum = series.reduce((s, x) => s + x.value, 0) || 1;

  let offset = 0;
  return (
    <svg width="100%" viewBox={`0 0 ${size} ${size}`} className="rounded-xl" style={{ background: PANEL, border: "1px solid rgba(255,255,255,0.06)" }}>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={stroke} />
        {series.map((seg, i) => {
          const frac = seg.value / sum;
          const len = c * frac;
          const dasharray = `${len} ${c - len}`;
          const dashoffset = -offset;
          offset += len;
          return (
            <circle
              key={i}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={dasharray}
              strokeDashoffset={dashoffset}
            />
          );
        })}
        <text x="0" y="-4" textAnchor="middle" fontSize="18" fontWeight="800" fill="#E6E6E0">Pipeline</text>
        <text x="0" y="18" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,.75)">{sum} total</text>
      </g>
    </svg>
  );
}

function StageBars({ counts }) {
  const max = Math.max(1, ...Object.values(counts));
  return (
    <div className="space-y-3">
      {STAGES.map((s) => {
        const v = counts[s] || 0;
        const pct = Math.round((v / max) * 100);
        const color = STAGE_COLORS[s] || GOLD;
        return (
          <div key={s}>
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="text-white/85">{s}</span>
              <span className="text-white/70">{v}</span>
            </div>
            <div className="h-3 overflow-hidden border rounded-full" style={{ borderColor: "rgba(255,255,255,.07)", background: "rgba(255,255,255,.045)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${GOLD_SOFT}99, ${GOLD})`,
                  boxShadow: `0 0 14px ${GOLD}40 inset`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================
   Sidebar (no thick separators, premium glow)
   ========================================= */
function AdminSidebar({ active, onChange, onLogout }) {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { key: "tracking", label: "Tracking", icon: <FaShippingFast /> },
    { key: "history", label: "Inquiry History", icon: <FaHistory /> },
    { key: "reports", label: "Reports", icon: <FaChartBar /> },
  ];

  return (
    <aside
      className="fixed top-0 left-0 z-40 flex flex-col h-screen w-72"
      style={{
        background: SIDEBAR_METALLIC,
        borderRight: "1px solid rgba(212,175,55,0.10)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04), 0 28px 90px rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div className="p-6">
        <div className="text-2xl font-bold tracking-wide uppercase select-none luxury-gold">
          EuroTech Admin
        </div>
      </div>

      <nav className="flex-1 px-4 pb-4 space-y-3">
        {items.map((it) => {
          const isActive = active === it.key;
          return (
            <motion.button
              key={it.key}
              onClick={() => onChange(it.key)}
              whileHover={{ y: -2, boxShadow: "0 0 26px rgba(212,175,55,0.18)" }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative flex items-center w-full gap-4 px-5 py-4 text-left group rounded-xl"
              style={{
                color: "#E9EDEB",
                background: isActive ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                className="absolute left-2 top-2 bottom-2 w-[3px] rounded-full transition-all"
                style={{
                  background: isActive ? GOLD : "transparent",
                  boxShadow: isActive ? "0 0 10px rgba(212,175,55,0.55)" : "none",
                }}
              />
              <span
                className="grid transition rounded-lg place-items-center w-9 h-9"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {it.icon}
              </span>
              <span className="font-semibold tracking-wide">{it.label}</span>
              <span
                className="absolute inset-0 transition opacity-0 pointer-events-none group-hover:opacity-100 rounded-xl"
                style={{ boxShadow: "0 0 24px rgba(212,175,55,0.18) inset" }}
              />
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4">
        <motion.button
          whileHover={{ y: -1 }}
          onClick={onLogout}
          className="relative flex items-center w-full gap-3 px-5 py-4 text-left rounded-xl"
          style={{
            color: "#E9EDEB",
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span className="grid border rounded-lg place-items-center w-9 h-9 bg-white/5 border-white/10">
            <FaSignOutAlt />
          </span>
          <span className="tracking-wide text-md">Logout</span>
        </motion.button>
      </div>
    </aside>
  );
}

/* =========================================
   Pages
   ========================================= */
function DashboardPage({ inquiries }) {
  const kpis = useMemo(() => {
    const total = inquiries.length;
    const latest = inquiries.reduce((m, x) => (x.createdAt > m ? x.createdAt : m), "");
    const newLatest = inquiries.filter((i) => i.createdAt === latest).length;
    const customers = new Set(inquiries.map((i) => i.email)).size;
    const open = inquiries.filter((i) => !["Delivered", "Cancelled", "Closed"].includes(i.status)).length;
    return [
      { title: "New Inquiries (Latest Day)", value: newLatest, icon: "🆕" },
      { title: "Registered Customers", value: customers, icon: "👥" },
      { title: "Total Inquiries", value: total, icon: "📨" },
      { title: "Open Pipeline", value: open, icon: "🚚" },
    ];
  }, [inquiries]);

  const series = [
    { name: "Inquiries", color: "url(#gold-line)", rawColor: GOLD, data: [6, 9, 7, 11, 14, 10, 13] },
    { name: "Resolved",  color: "url(#emerald-line)", rawColor: CYAN, data: [2, 3, 4, 6, 8, 7, 9] },
  ];

  const stageCounts = useMemo(() => {
    const map = Object.fromEntries(STAGES.map((s) => [s, 0]));
    inquiries.forEach((i) => (map[i.status] = (map[i.status] || 0) + 1));
    return map;
  }, [inquiries]);

  const donutSeries = STAGES.map((s) => ({
    label: s,
    value: stageCounts[s] || 0,
    color: s === "Paid" ? GOLD : s === "Dispatched" ? GOLD_DEEP : s === "Submitted" ? GOLD_SOFT : EMERALD,
  })).filter((s) => s.value > 0);

  return (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            className="p-6 border rounded-xl backdrop-blur-md"
            style={{
              background: PANEL,
              borderColor: "rgba(255,255,255,0.08)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <div className="mb-2 text-3xl">{k.icon}</div>
            <p className="text-sm text-gray-300">{k.title}</p>
            <h3 className="text-2xl font-semibold" style={{ color: GOLD_SOFT }}>{k.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 mt-8 xl:grid-cols-3">
        <div className="p-5 border rounded-xl" style={{ background: PANEL, borderColor: "rgba(255,255,255,0.08)" }}>
          <h4 className="mb-3 text-lg font-semibold text-white/90">Weekly Performance</h4>
          <LineChartAdvanced series={series} />
        </div>
        <div className="p-5 border rounded-xl" style={{ background: PANEL, borderColor: "rgba(255,255,255,0.08)" }}>
          <h4 className="mb-3 text-lg font-semibold text-white/90">Pipeline Breakdown</h4>
          <DonutChart
            series={
              donutSeries.length
                ? donutSeries
                : [{ label: "None", value: 1, color: "rgba(255,255,255,.25)" }]
            }
          />
          <div className="grid grid-cols-2 mt-3 text-sm gap-x-4 gap-y-1">
            {donutSeries.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: s.color }} />
                <span className="text-white/85">{s.label}</span>
                <span className="ml-auto text-white/75">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 border rounded-xl" style={{ background: PANEL, borderColor: "rgba(255,255,255,0.08)" }}>
          <h4 className="mb-3 text-lg font-semibold text-white/90">Stage Progress</h4>
          <StageBars counts={stageCounts} />
        </div>
      </div>
    </>
  );
}

function TrackingPage({ inquiries, onUpdateStatus }) {
  const [q, setQ] = useState("");
  const [savedRef, setSavedRef] = useState(null);
  const filtered = inquiries.filter((i) => i.ref.toLowerCase().includes(q.toLowerCase()));

  const save = (ref, newStatus) => {
    onUpdateStatus?.(ref, newStatus);
    setSavedRef(ref);
    setTimeout(() => setSavedRef(null), 1100);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute -translate-y-1/2 left-3 top-1/2 text-white/60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by reference..."
            className="w-full py-3 pl-10 pr-3 text-white border rounded-lg outline-none bg-white/5 border-white/10 placeholder-white/50"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        </div>
      </div>

      <div className="overflow-x-auto border rounded-xl" style={{ borderColor: "rgba(255,255,255,0.08)", background: PANEL }}>
        <table className="min-w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-left text-white/75">
              <th className="p-3">Ref</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Brand / Item</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.ref} className="transition border-t border-white/10 hover:bg-white/5">
                <td className="p-3 font-semibold text-white/90">{r.ref}</td>
                <td className="p-3">
                  {r.name} <span className="text-white/60">({r.email})</span>
                </td>
                <td className="p-3">{r.brand} — {r.item}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={r.status}
                      onChange={(e) => save(r.ref, e.target.value)}
                      className="px-2 py-1 text-white border rounded-md outline-none bg-white/5 border-white/10"
                      style={{ color: STAGE_COLORS[r.status] || GOLD, background: "rgba(255,255,255,0.04)" }}
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s} className="bg-[#0B1F19]" style={{ color: STAGE_COLORS[s] || GOLD }}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {savedRef === r.ref && (
                      <span className="flex items-center text-xs text-yellow-300">
                        <FaCheckCircle className="mr-1" /> Saved
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3">{r.createdAt}</td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-white/75">
                  No matches.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HistoryPage({ inquiries }) {
  const [page, setPage] = useState(1);
  const perPage = 15;
  const totalPages = Math.max(1, Math.ceil(inquiries.length / perPage));
  const slice = inquiries.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border rounded-xl" style={{ borderColor: "rgba(255,255,255,0.08)", background: PANEL }}>
        <table className="min-w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-left text-white/75">
              <th className="p-3">Ref</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Brand / Item</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((r) => (
              <tr key={r.ref} className="transition border-t border-white/10 hover:bg-white/5">
                <td className="p-3 font-semibold text-white/90">{r.ref}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.brand} — {r.item}</td>
                <td className="p-3" style={{ color: STAGE_COLORS[r.status] || GOLD }}>{r.status}</td>
                <td className="p-3">{r.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pager */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white/85 disabled:opacity-40"
          disabled={page === 1}
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          Prev
        </button>
        <span className="text-sm text-white/80">Page {page} / {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white/85 disabled:opacity-40"
          disabled={page === totalPages}
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function ReportsPage({ inquiries }) {
  const stageCounts = useMemo(() => {
    const map = Object.fromEntries(STAGES.map((s) => [s, 0]));
    inquiries.forEach((i) => (map[i.status] = (map[i.status] || 0) + 1));
    return map;
  }, [inquiries]);

  const donutSeries = STAGES.map((s) => ({
    label: s,
    value: stageCounts[s] || 0,
    color: s === "Paid" ? GOLD : s === "Dispatched" ? GOLD_DEEP : s === "Submitted" ? GOLD_SOFT : EMERALD,
  })).filter((s) => s.value > 0);

  const lineSeries = [
    { name: "Inquiries", color: "url(#gold-line)", rawColor: GOLD, data: [6, 9, 7, 11, 14, 10, 13] },
    { name: "Resolved",  color: "url(#emerald-line)", rawColor: CYAN, data: [2, 3, 4, 6, 8, 7, 9] },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="p-5 border rounded-xl" style={{ background: PANEL, borderColor: "rgba(255,255,255,0.08)" }}>
        <h4 className="mb-3 text-lg font-semibold text-white/90">Inquiry Trend</h4>
        <LineChartAdvanced series={lineSeries} />
      </div>
      <div className="p-5 border rounded-xl" style={{ background: PANEL, borderColor: "rgba(255,255,255,0.08)" }}>
        <h4 className="mb-3 text-lg font-semibold text-white/90">Stage Breakdown</h4>
        <StageBars counts={stageCounts} />
      </div>
      <div className="p-5 border rounded-xl" style={{ background: PANEL, borderColor: "rgba(255,255,255,0.08)" }}>
        <h4 className="mb-3 text-lg font-semibold text-white/90">Pipeline Donut</h4>
        <DonutChart
          series={
            donutSeries.length
              ? donutSeries
              : [{ label: "None", value: 1, color: "rgba(255,255,255,.25)" }]
          }
        />
      </div>
    </div>
  );
}

/* =========================================
   Root
   ========================================= */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("dashboard");
  const [inquiries, setInquiries] = useState(MOCK_INQUIRIES);

  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("sparePartsUser"));
      if (!savedUser || savedUser.role !== "admin") {
        navigate("/");
      } else {
        setUser(savedUser);
      }
    } catch {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sparePartsUser");
    navigate("/");
  };

  const updateStatus = (ref, status) => {
    setInquiries((prev) => prev.map((i) => (i.ref === ref ? { ...i, status } : i)));
  };

  const content = (() => {
    switch (active) {
      case "dashboard":
        return <DashboardPage inquiries={inquiries} />;
      case "tracking":
        return <TrackingPage inquiries={inquiries} onUpdateStatus={updateStatus} />;
      case "history":
        return <HistoryPage inquiries={inquiries} />;
      case "reports":
        return <ReportsPage inquiries={inquiries} />;
      default:
        return null;
    }
  })();

  return (
    <div className="relative flex min-h-screen overflow-hidden text-white">
      {/* Metallic emerald background */}
      <div className="fixed inset-0 -z-10" style={{ background: BG_APP_DEEP }} />
      {/* Soft vignette + scanlines (already defined in index.css) */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, rgba(16,94,66,0.12), transparent 60%)",
        }}
      />
      <div className="fixed inset-0 pointer-events-none -z-10 animate-scanlines" style={{ opacity: 0.06 }} />

      <AdminSidebar active={active} onChange={setActive} onLogout={handleLogout} />

      <main className="flex-1 p-6 ml-0 md:p-10 md:ml-72">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl text-white/95">
            {active === "dashboard" && "Dashboard"}
            {active === "tracking" && "Tracking"}
            {active === "history" && "Inquiry History"}
            {active === "reports" && "Reports"}
          </h1>
          <p className="mt-1 text-gray-300">Welcome{user?.username ? `, ${user.username}` : ""}. Admin control center.</p>
        </div>

        {/* Body */}
        <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
          {content}
        </motion.div>

        {/* Footer */}
        <footer className="mt-12 text-sm text-center text-gray-400">© 2025 EuroTech Admin Console</footer>
      </main>
    </div>
  );
};

export default AdminDashboard;
