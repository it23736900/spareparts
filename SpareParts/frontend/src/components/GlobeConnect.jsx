import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";
import Globe from "react-globe.gl";

const ARC_COLORS = ["#FFE36E", "#00F5C8"];

// Keep whole sphere visible based on the shortest side
const fitAltitude = (minSidePx) => {
  if (minSidePx < 340) return 3.0;
  if (minSidePx < 420) return 2.85;
  if (minSidePx < 520) return 2.7;
  if (minSidePx < 640) return 2.6;
  return 2.5;
};

export default function GlobeConnect({ className = "" }) {
  const wrapRef = useRef(null);
  const globeRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const places = useMemo(
    () => [
      { name: "United Kingdom", lat: 51.5074, lng: -0.1278 },
      { name: "Sri Lanka", lat: 6.9271, lng: 79.8612 }
    ],
    []
  );

  const arcs = useMemo(
    () => [
      { startLat: places[0].lat, startLng: places[0].lng, endLat: places[1].lat, endLng: places[1].lng, color: ARC_COLORS },
      { startLat: places[1].lat, startLng: places[1].lng, endLat: places[0].lat, endLng: places[0].lng, color: ARC_COLORS }
    ],
    [places]
  );

  // Controls + renderer
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;

    const controls = g.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    // Transparent so background shows through
    const r = g.renderer();
    r.setClearColor(0x000000, 0); // fully transparent
    r.setClearAlpha?.(0);
    r.domElement.style.background = "transparent";
    g.scene().fog = null;
    r.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  }, []);

  // Resize → sync width/height + camera
  useEffect(() => {
    const wrap = wrapRef.current;
    const g = globeRef.current;
    if (!wrap || !g) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const w = Math.max(1, width | 0);
      const h = Math.max(1, height | 0);
      setSize({ w, h });
      g.pointOfView({ lat: 25, lng: 25, altitude: fitAltitude(Math.min(w, h)) }, 200);
    });
    ro.observe(wrap);

    // Initial run
    const rect = wrap.getBoundingClientRect();
    const w = Math.max(1, rect.width | 0);
    const h = Math.max(1, rect.height | 0);
    setSize({ w, h });
    g.pointOfView({ lat: 25, lng: 25, altitude: fitAltitude(Math.min(w, h)) }, 0);

    return () => ro.disconnect();
  }, []);

  return (
    <div
      className={`relative w-full h-full bg-app ${className}`}
      ref={wrapRef}
    >
      <Suspense fallback={<div className="grid place-items-center h-full text-white/70">Loading globe…</div>}>
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          rendererConfig={{ alpha: true, antialias: true, premultipliedAlpha: true }}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl={null} // no space background

          labelsData={places}
          labelText="name"
          labelLat="lat"
          labelLng="lng"
          labelSize={() => 1.2}
          labelDotRadius={() => 0.55}
          labelColor={() => "rgba(255,255,255,0.9)"}
          labelResolution={2}

          ringsData={places}
          ringLat="lat"
          ringLng="lng"
          ringColor={() => "rgba(255,227,110,0.9)"}
          ringMaxRadius={2.0}
          ringPropagationSpeed={1}
          ringRepeatPeriod={1200}

          arcsData={arcs}
          arcColor={(d) => d.color}
          arcAltitude={() => 0.2}
          arcStroke={0.9}
          arcDashLength={() => 0.55}
          arcDashGap={() => 0.2}
          arcDashAnimateTime={() => 4000}
        />
      </Suspense>
    </div>
  );
}
