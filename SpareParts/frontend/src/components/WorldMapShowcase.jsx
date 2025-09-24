import React, { useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath, geoInterpolate } from "d3-geo";
import { feature } from "topojson-client";
import IntroParagraph from "./IntroParagraph";

const WORLD_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
const FLAG_UK = "https://flagcdn.com/w80/gb.png";
const FLAG_SL = "https://flagcdn.com/w80/lk.png";

const ACCENT = "#17A77A";
const UK = [-3, 54];
const SL = [80.7718, 7.8731];

function buildGreatCirclePath(projection, fromLonLat, toLonLat, steps = 90) {
  const interp = geoInterpolate(fromLonLat, toLonLat);
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const p = projection(interp(i / steps));
    d += i === 0 ? `M ${p[0]} ${p[1]}` : ` L ${p[0]} ${p[1]}`;
  }
  return d;
}

function FlagPin({ x, y, size = 24, flagUrl }) {
  const r = size / 2;
  const id = `clip-${Math.round(x)}-${Math.round(y)}`;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        <clipPath id={id}>
          <circle cx="0" cy="0" r={r - 1} />
        </clipPath>
      </defs>
      <circle cx="0" cy="0" r={r + 4} fill="rgba(23,167,122,0.2)" />
      <image
        href={flagUrl}
        x={-r}
        y={-r}
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${id})`}
      />
    </g>
  );
}

export default function WorldMapShowcase() {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const [world, setWorld] = useState(null);
  const wrapRef = useRef(null);
  const [size, setSize] = useState({ w: 1200, h: 600 });

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const h = Math.max(420, Math.min(780, width * 0.52));
      setSize({ w: Math.round(width), h: Math.round(h) });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

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
  const midLon = (UK[0] + SL[0]) / 2;
  const midLat = (UK[1] + SL[1]) / 2;

  const projection = useMemo(() => {
    const scale = (W / 1200) * 190;
    return geoEqualEarth()
      .scale(scale)
      .rotate([-midLon, -midLat, 0])
      .translate([W * 0.68, H * 0.56]);
  }, [W, H, midLon, midLat]);

  const pathGen = useMemo(() => geoPath(projection), [projection]);
  const routeD = useMemo(
    () => buildGreatCirclePath(projection, UK, SL, 90),
    [projection]
  );

  const ukXY = projection(UK);
  const slXY = projection(SL);

  return (
    <section className="relative w-full bg-transparent">
      <style>{`
        @keyframes dash { to { stroke-dashoffset: -1000; } }
        .route-dash-anim { stroke-dasharray: 6 8; animation: dash 18s linear infinite; }
      `}</style>

      <div ref={wrapRef} className="relative w-full" style={{ height: `${H}px` }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        >
          {/* Map */}
          {world &&
            world.features.map((feat) => (
              <path
                key={feat.id}
                d={pathGen(feat)}
                style={{
                  fill: "#0b3536",
                  stroke: ACCENT,
                  strokeWidth: 0.5,
                }}
              />
            ))}

          {/* Route (lighter on mobile, glowing only on desktop) */}
          <path
            d={routeD}
            stroke={isMobile ? "#18e0a8" : "url(#routeGrad)"}
            strokeWidth={isMobile ? 2 : 3}
            fill="none"
            className="route-dash-anim"
          />

          {!isMobile && (
            <path
              d={routeD}
              stroke="#D4AF37"
              strokeWidth="3.2"
              fill="none"
              style={{ strokeLinecap: "round" }}
            />
          )}

          {/* Flags */}
          {ukXY && <FlagPin x={ukXY[0]} y={ukXY[1]} flagUrl={FLAG_UK} />}
          {slXY && <FlagPin x={slXY[0]} y={slXY[1]} flagUrl={FLAG_SL} />}
        </svg>

        {/* Overlay content */}
        <div className="absolute inset-y-0 left-0 flex items-center z-20">
          <div className="px-4 sm:px-6 md:px-8 w-[92vw] sm:w-[72vw] md:w-[52vw] lg:w-[46vw] xl:w-[42vw]">
            <div
              className="rounded-2xl p-5 sm:p-6 md:p-7 backdrop-blur-md"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,20,23,0.60), rgba(6,20,23,0.38))",
                border: "1px solid rgba(23,167,122,.25)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              <h2
                className="mb-4 sm:mb-5 font-extrabold"
                style={{
                  color: ACCENT,
                  fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
                }}
              >
                Global Sourcing, Local Confidence
              </h2>
              <IntroParagraph />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
