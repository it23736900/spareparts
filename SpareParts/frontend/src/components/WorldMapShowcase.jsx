import React, { useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath, geoInterpolate } from "d3-geo";
import { feature } from "topojson-client";
import IntroParagraph from "./IntroParagraph";

const WORLD_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const FLAG_UK = "https://flagcdn.com/w80/gb.png";
const FLAG_SL = "https://flagcdn.com/w80/lk.png";

const ACCENT = "#17A77A";
const UK = [-3, 54];
const SL = [80.7718, 7.8731];

function buildGreatCirclePath(projection, fromLonLat, toLonLat, steps = 160) {
  const interp = geoInterpolate(fromLonLat, toLonLat);
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const p = projection(interp(i / steps));
    d += i === 0 ? `M ${p[0]} ${p[1]}` : ` L ${p[0]} ${p[1]}`;
  }
  return d;
}

function FlagPin({ x, y, size = 28, flagUrl }) {
  const r = size / 2;
  const tail = r * 0.95;
  const id = `clip-${Math.round(x)}-${Math.round(y)}`;
  const pinPath = `
    M 0 ${r}
    C ${r * 0.55} ${r * 0.55}, ${r * 0.9} ${r * 0.1}, 0 -${r}
    C -${r * 0.9} ${r * 0.1}, -${r * 0.55} ${r * 0.55}, 0 ${r}
    L 0 ${r + tail}
    Z
  `;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        <clipPath id={id}>
          <circle cx="0" cy="0" r={r - 1} />
        </clipPath>
      </defs>
      <circle cx="0" cy={r * 0.1} r={r + 6} fill="rgba(23,167,122,0.18)" />
      <path
        d={pinPath}
        fill="rgba(8,16,22,0.95)"
        stroke="rgba(23,167,122,.35)"
        strokeWidth="1"
        style={{ filter: "drop-shadow(0 0 8px rgba(23,167,122,.35))" }}
      />
      <image
        href={flagUrl}
        x={-r}
        y={-r}
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${id})`}
        style={{ filter: "drop-shadow(0 0 6px rgba(23,167,122,.25))" }}
      />
      <circle
        cx="0"
        cy="0"
        r={r - 1}
        fill="none"
        stroke="#0ee9a7"
        strokeOpacity="0.25"
        strokeWidth="0.8"
      />
    </g>
  );
}

export default function WorldMapShowcase() {
  const [world, setWorld] = useState(null);

  // responsive container size
  const wrapRef = useRef(null);
  const [size, setSize] = useState({ w: 1200, h: 650 });

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const h = Math.max(480, Math.min(820, width * 0.56)); // clamp hero height
      setSize({ w: Math.round(width), h: Math.round(h) });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // fetch world
  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetch(WORLD_URL);
      const topo = await res.json();
      const countries = feature(topo, topo.objects.countries);
      if (alive) setWorld(countries);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const { w: W, h: H } = size;

  // focus UK + SL to the RIGHT side
  const midLon = (UK[0] + SL[0]) / 2;
  const midLat = (UK[1] + SL[1]) / 2;

  const projection = useMemo(() => {
    const scale = (W / 1200) * 210;
    return geoEqualEarth()
      .scale(scale)
      .rotate([-midLon, -midLat, 0])
      .translate([W * 0.68, H * 0.56]);
  }, [W, H, midLon, midLat]);

  const pathGen = useMemo(() => geoPath(projection), [projection]);
  const routeD = useMemo(
    () => buildGreatCirclePath(projection, UK, SL, 160),
    [projection]
  );

  const ukXY = projection(UK);
  const slXY = projection(SL);

  return (
    <section className="relative w-full bg-transparent">
      <style>{`
        /* Slow the flowing dash animation */
        @keyframes dash { to { stroke-dashoffset: -1000; } }
        .route-dash-anim { stroke-dasharray: 6 8; animation: dash 12s linear infinite; opacity: .9 }

        /* Slow the traveling glow/dot animation */
        @keyframes travel { 0% { stroke-dashoffset: 250 } 100% { stroke-dashoffset: -250 } }
        .route-travel-anim { stroke-dasharray: 1 250; animation: travel 5s ease-in-out infinite; }
      `}</style>

      <div
        ref={wrapRef}
        className="relative w-full"
        style={{ height: `${H}px` }}
      >
        {/* Map layer */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          style={{ background: "transparent" }}
        >
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#18e0a8" />
              <stop offset="55%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#18e0a8" />
            </linearGradient>
            <filter id="routeHalo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.1  0 0 0 0 0.66  0 0 0 0 0.49  0 0 0 0.7 0"
              />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width={W} height={H} fill="rgba(2,25,23,0.55)" />

          {world &&
            world.features.map((feat) => (
              <path
                key={feat.id}
                d={pathGen(feat)}
                style={{
                  fill: "#0b3536",
                  stroke: ACCENT,
                  strokeWidth: 0.6,
                  filter: "drop-shadow(0 0 3px rgba(23,167,122,0.55))",
                }}
              />
            ))}

          {/* Dashed flowing route (no arrow now) */}
          <path
            d={routeD}
            stroke="url(#routeGrad)"
            strokeWidth="3"
            fill="none"
            className="route-dash-anim"
            style={{ filter: "url(#routeHalo)" }}
          />
          {/* Traveling glow on top */}
          <path
            d={routeD}
            stroke="#D4AF37"
            strokeWidth="4.2"
            fill="none"
            className="route-travel-anim"
            style={{
              opacity: 0.9,
              strokeLinecap: "round",
              filter: "drop-shadow(0 0 14px rgba(212,175,55,1))",
            }}
          />

          {ukXY && <FlagPin x={ukXY[0]} y={ukXY[1]} size={30} flagUrl={FLAG_UK} />}
          {slXY && <FlagPin x={slXY[0]} y={slXY[1]} size={30} flagUrl={FLAG_SL} />}
        </svg>

        {/* top vignette for text focus */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            boxShadow: "inset 0 120px 160px rgba(0,0,0,0.55)",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0) 35%)",
          }}
        />

        {/* LEFT overlay content */}
        <div className="absolute inset-y-0 left-0 flex items-center z-20">
          <div className="px-4 sm:px-6 md:px-8 w-[92vw] sm:w-[72vw] md:w-[52vw] lg:w-[46vw] xl:w-[42vw]">
            <div
              className="rounded-2xl p-5 sm:p-6 md:p-7 backdrop-blur-md"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,20,23,0.60), rgba(6,20,23,0.38))",
                border: "1px solid rgba(23,167,122,.25)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
              }}
            >
              <h2
                className="mb-4 sm:mb-5 font-extrabold"
                style={{
                  color: ACCENT,
                  fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
                  letterSpacing: "0.02em",
                }}
              >
                Global Sourcing, Local Confidence
              </h2>

              {/* three paragraphs only */}
              <IntroParagraph />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
