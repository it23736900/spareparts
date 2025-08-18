// src/components/WorldMapShowcase.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath, geoInterpolate } from "d3-geo";
import { feature } from "topojson-client";
import { select as d3select } from "d3-selection";
import { zoom as d3zoom, zoomIdentity } from "d3-zoom";
import IntroParagraph from "./IntroParagraph";

const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const FLAG_UK = "https://flagcdn.com/w80/gb.png";
const FLAG_SL = "https://flagcdn.com/w80/lk.png";

const UK = [-3, 54];
const SL = [80.7718, 7.8731];

function buildGreatCirclePath(projection, fromLonLat, toLonLat, steps = 120) {
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
  const id = `clip-${Math.abs(Math.round(x))}-${Math.abs(Math.round(y))}`;
  const pinPath = `
    M 0 ${r}
    C ${r*0.55} ${r*0.55}, ${r*0.9} ${r*0.1}, 0 -${r}
    C -${r*0.9} ${r*0.1}, -${r*0.55} ${r*0.55}, 0 ${r}
    L 0 ${r + tail}
    Z
  `;

  return (
    <g transform={`translate(${x}, ${y})`} className="pin-bob">
      <defs>
        <clipPath id={id}><circle cx="0" cy="0" r={r - 1} /></clipPath>
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
      <circle cx="0" cy="0" r={r - 1} fill="none" stroke="#0ee9a7" strokeOpacity="0.25" strokeWidth="0.8" />
    </g>
  );
}

export default function WorldMapShowcase({
  scale = 180,
  translateX = 300,   // ← you asked me to remember these
  translateY = 325,
}) {
  const [world, setWorld] = useState(null);

  const projection = useMemo(
    () => geoEqualEarth().scale(scale).translate([translateX, translateY]),
    [scale, translateX, translateY]
  );
  const pathGen = useMemo(() => geoPath(projection), [projection]);

  const svgRef = useRef(null);
  const gRef = useRef(null);
  const routePathRef = useRef(null);
  const zoomRef = useRef(null); // store the zoom behavior so buttons can use it

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetch(WORLD_URL);
      const topo = await res.json();
      const countries = feature(topo, topo.objects.countries);
      if (alive) setWorld(countries);
    })();
    return () => { alive = false; };
  }, []);

  // === Zoom & pan: only zoom on Ctrl+wheel; normal wheel scroll = page scroll ===
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;
    const svg = d3select(svgRef.current);
    const g = d3select(gRef.current);

    const z = d3zoom()
      .scaleExtent([0.9, 3.5])
      .filter((event) => {
        // Allow panning with left mouse drag
        if (event.type === "mousedown") return event.button === 0 && !event.ctrlKey && !event.metaKey;
        // Allow zoom ONLY when holding Ctrl (or Cmd on Mac) while wheeling
        if (event.type === "wheel") return event.ctrlKey || event.metaKey;
        // Allow pinch-zoom on touch
        if (event.type === "touchstart" || event.type === "touchmove") return true;
        return true;
      })
      .on("zoom", (e) => {
        g.attr("transform", e.transform);
      });

    zoomRef.current = z;
    svg.call(z).call(z.transform, zoomIdentity);
  }, []);

  const W = 1200, H = 650;

  // Build main route (UK -> SL)
  const routeD = useMemo(
    () => buildGreatCirclePath(projection, UK, SL, 140),
    [projection]
  );

  // Projected pins
  const ukXY = projection(UK);
  const slXY = projection(SL);

  // Zoom control handlers (for the UI buttons)
  const zoomBy = (k) => {
    if (!zoomRef.current || !svgRef.current) return;
    const svg = d3select(svgRef.current);
    svg.transition().duration(220).call(zoomRef.current.scaleBy, k);
  };
  const resetZoom = () => {
    if (!zoomRef.current || !svgRef.current) return;
    const svg = d3select(svgRef.current);
    svg.transition().duration(220).call(zoomRef.current.transform, zoomIdentity);
  };

  return (
    <section className="relative w-full overflow-hidden bg-transparent">
      <div className="relative mx-auto w-full max-w-[1200px] h-[650px]">

        {/* Zoom UI (top-left over the map) */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          <button
            onClick={() => zoomBy(1.2)}
            className="rounded-md bg-[#0b1c1f]/80 border border-emerald-500/40 px-2 py-1 text-white text-sm"
            title="Zoom in"
          >＋</button>
          <button
            onClick={() => zoomBy(1/1.2)}
            className="rounded-md bg-[#0b1c1f]/80 border border-emerald-500/40 px-2 py-1 text-white text-sm"
            title="Zoom out"
          >−</button>
          <button
            onClick={resetZoom}
            className="rounded-md bg-[#0b1c1f]/80 border border-emerald-500/40 px-2 py-1 text-white text-xs"
            title="Reset"
          >reset</button>
        </div>

        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" style={{ background: "transparent" }}>
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor="#18e0a8" />
              <stop offset="55%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#18e0a8" />
            </linearGradient>
            <filter id="routeHalo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
              <feColorMatrix in="blur" type="matrix"
                values="0 0 0 0 0.1  0 0 0 0 0.66  0 0 0 0 0.49  0 0 0 0.7 0"/>
              <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <marker id="route-arrow" viewBox="0 0 10 8" refX="8" refY="4" markerWidth="10" markerHeight="8" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L10,4 L0,8 Z" fill="#D4AF37" />
            </marker>
          </defs>

          {/* everything inside gRef so zoom/pan transforms it */}
          <g ref={gRef}>
            {/* Countries */}
            {world && world.features.map((feat) => (
              <path
                key={feat.id}
                d={pathGen(feat)}
                style={{
                  fill: "#0b3536",
                  stroke: "#17A77A",
                  strokeWidth: 0.6,
                  filter: "drop-shadow(0 0 3px rgba(23,167,122,0.55))",
                }}
              />
            ))}

            {/* Main route (great-circle) */}
            <path
              ref={routePathRef}
              d={routeD}
              stroke="url(#routeGrad)"
              strokeWidth="3"
              fill="none"
              className="route-dash-anim"
              style={{ filter: "url(#routeHalo)" }}
              markerEnd="url(#route-arrow)"
            />
            {/* Optional travelling blob (kept subtle). Remove this <path> if you don't want it. */}
            <path
              d={routeD}
              stroke="#D4AF37"
              strokeWidth="4.2"
              fill="none"
              className="route-travel-anim"
              style={{ opacity: 0.9, strokeLinecap: "round", filter: "drop-shadow(0 0 14px rgba(212,175,55,1))" }}
            />

            {/* Flag pins */}
            {ukXY && <FlagPin x={ukXY[0]} y={ukXY[1]} size={30} flagUrl={FLAG_UK} />}
            {slXY && <FlagPin x={slXY[0]} y={slXY[1]} size={30} flagUrl={FLAG_SL} />}
          </g>
        </svg>

        {/* Right panel */}
        <div className="absolute top-0 h-full w-[44%] max-w-[560px] p-6 md:p-8" style={{ right: "-18px" }}>
          <div
            className="h-full overflow-y-auto rounded-2xl p-6 md:p-7"
            style={{
              background: "linear-gradient(180deg, rgba(6,20,23,0.56), rgba(6,20,23,0.38))",
              border: "1px solid rgba(23,167,122,.25)",
              backdropFilter: "blur(6px)",
            }}
          >
            <h2 className="mb-3 text-2xl font-bold md:text-3xl" style={{ color: "#17A77A" }}>
              Global Sourcing, Local Confidence
            </h2>
            <div className="mb-6 text-[#cde6e0] leading-relaxed">
              <IntroParagraph />
            </div>
            <ul className="space-y-3 text-[#b8d3cd]">
              <li className="flex gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ background: "#17A77A" }} /><span>Stock for leading brands, especially <span className="font-semibold text-white">Range Rover</span>.</span></li>
              <li className="flex gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ background: "#17A77A" }} /><span>Fast, island-wide delivery with tracked dispatches.</span></li>
              <li className="flex gap-3"><span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ background: "#17A77A" }} /><span>Direct UK sourcing ensures quality and authenticity.</span></li>
            </ul>
            <p className="mt-5 text-xs text-[#7fa89f]">Zoom: hold <strong>Ctrl</strong> and use the mouse wheel. Pan: drag the map.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
