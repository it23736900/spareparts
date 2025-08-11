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

  // Controls & renderer setup
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;

    const controls = g.controls();
    controls.enableZoom = false;   // no zoom → fixed size
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    // Make canvas background transparent (so it blends with the section)
    g.renderer().setClearColor(0x000000, 0); // alpha = 0
    g.renderer().domElement.style.background = "transparent";
    g.scene().fog = null;
    g.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  }, []);

  // Resize → set width/height + fit camera
  useEffect(() => {
    const wrap = wrapRef.current;
    const g = globeRef.current;
    if (!wrap || !g) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.max(1, width | 0), h: Math.max(1, height | 0) });
      const minSide = Math.min(width, height);
      g.pointOfView({ lat: 25, lng: 25, altitude: fitAltitude(minSide) }, 200);
    });
    ro.observe(wrap);

    // run once immediately
    const rect = wrap.getBoundingClientRect();
    setSize({ w: Math.max(1, rect.width | 0), h: Math.max(1, rect.height | 0) });
    g.pointOfView({ lat: 25, lng: 25, altitude: fitAltitude(Math.min(rect.width, rect.height)) }, 0);

    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<div className="grid place-items-center h-full text-white/70">Loading globe…</div>}>
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          rendererConfig={{ alpha: true, antialias: true }}  // ← allow transparency
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl={null}

          // labels
          labelsData={places}
          labelText="name"
          labelLat="lat"
          labelLng="lng"
          labelSize={() => 1.2}
          labelDotRadius={() => 0.55}
          labelColor={() => "rgba(255,255,255,0.9)"}
          labelResolution={2}

          // rings
          ringsData={places}
          ringLat="lat"
          ringLng="lng"
          ringColor={() => "rgba(255,227,110,0.9)"}
          ringMaxRadius={2.0}
          ringPropagationSpeed={1}
          ringRepeatPeriod={1200}

          // arcs
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
