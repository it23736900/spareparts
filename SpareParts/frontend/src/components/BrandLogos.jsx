// src/components/BrandLogos.jsx
import React, { useRef, useState, useLayoutEffect, useEffect, useMemo } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

/* === Theme (emerald + gold) === */
const COLORS = {
  cardFrontSolid: "#0B1C1F",
  cardBackSolid: "#0A1716",
  emeraldBorder: "rgba(23,167,122,0.35)",
  goldBorder: "rgba(212,175,55,0.28)",
  shadow: "0 18px 40px -16px rgba(0,0,0,0.55)",
  text: "#E8ECEA",
};

/* Cloudinary */
const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const img = (id, w = 360) =>
  cld.image(id).format("auto").quality("auto").resize(auto().width(w));

/* Data */
const allBrands = [
  { title: "Range Rover", imageId: "Land-Rover_dfugi3", description: "Built for both rugged performance and refined luxury, Range Rover represents the very best of British automotive excellence. To keep these powerful machines running at their peak, we supply Range Rover parts for SUVs, directly imported from the UK." },
  { title: "BMW", imageId: "BMW_if2qdm", description: "Synonymous with precision German engineering and driving pleasure, BMW offers a perfect blend of sportiness and luxury. We supply genuine used BMW spare parts, directly imported from the UK." },
  { title: "Mercedes-Benz", imageId: "mercedesbenz_nvbkqv", description: "Celebrated worldwide for its luxury, innovation, and safety, Mercedes-Benz defines automotive excellence. We import authentic Mercedes-Benz European spare parts from the UK." },
  { title: "Audi", imageId: "audi_yahk7u", description: "With modern design and advanced technology, Audi stands for progressive German engineering. We help maintain that standard by importing Audi spares directly." },
  { title: "Volvo", imageId: "Volvo_iykd5e", description: "Renowned for its Scandinavian safety, comfort, and reliability, Volvo vehicles are built to protect. We source used Volvo spare parts directly from the UK." },
  { title: "Volkswagen", imageId: "vw_kxbbn3", description: "Combining timeless design with everyday practicality, Volkswagen is a symbol of German reliability. We import authentic Volkswagen spares from the UK." },
  { title: "Porsche", imageId: "porsche_husop5", description: "Blending racing heritage with luxury, Porsche creates truly thrilling driving experiences. We supply used Porsche spare parts directly sourced from the UK." },
  { title: "Morris Garages", imageId: "MG_jetn1d", description: "A British classic reborn with contemporary style, MG vehicles offer charm and affordability. We import used MG spares directly from the UK." },
  { title: "Ford", imageId: "Untitled_design_12_pi7wbj", description: "Known for versatility and durability, Ford’s include cars, SUVs, and pickup trucks. We supply authentic Ford spare parts from trusted UK partners." },
  { title: "Jaguar", imageId: "Untitled_design_15_bgbbwf", description: "Combining British elegance with powerful performance, Jaguar creates distinctive luxury vehicles. We import Jaguar spare parts from the UK." },
  { title: "Renault", imageId: "Untitled_design_16_kbhzqz", description: "A trusted European brand known for efficiency and style, Renault makes cars that suit city and family life alike. We import Renault spare parts from the UK." },
  { title: "Peugeot", imageId: "Untitled_design_13_voryto", description: "With French flair and comfort, Peugeot vehicles bring European sophistication to everyday driving. We keep them in top shape with UK-imported parts." },
  { title: "Mini Cooper", imageId: "Untitled_design_17_yrnkrf", description: "Iconic, compact, and full of character, Mini Cooper remains a symbol of British design and fun driving. We import used Mini Cooper parts from the UK." },
];

/* Utils */
const mod = (n, m) => ((n % m) + m) % m;

/* Marquee hook (endless horizontal + manual drag + wheel) */
function useMarqueeRow({ speedPxPerSec = 28, reverse = false }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const firstCycleFirstRef = useRef(null);
  const secondCycleFirstRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const widthRef = useRef(1);
  const offsetRef = useRef(0);
  const dragging = useRef(false);
  const mayDrag = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const rafRef = useRef(0);
  const DRAG_THRESHOLD = 8;

  useLayoutEffect(() => {
    const measure = () => {
      const a = firstCycleFirstRef.current;
      const b = secondCycleFirstRef.current;
      if (!a || !b) return;
      widthRef.current = Math.max(1, b.offsetLeft - a.offsetLeft);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let last = performance.now();
    const dir = reverse ? -1 : 1;
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      const width = widthRef.current;
      const track = trackRef.current;
      if (track && width > 0 && !paused && !dragging.current && !mayDrag.current) {
        const v = speedPxPerSec;
        offsetRef.current = mod(offsetRef.current + dir * v * dt, width);
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, reverse, speedPxPerSec]);

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest('[data-no-drag], button, a, input, textarea, select')) return;
    mayDrag.current = true; dragging.current = false;
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragStartOffset.current = offsetRef.current;
    setPaused(true);
    wrapRef.current?.setPointerCapture?.(e.pointerId);
    if (wrapRef.current) wrapRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e) => {
    if (!mayDrag.current) return;
    const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const dx = cx - dragStartX.current;
    const width = widthRef.current;
    if (dragging.current && width > 0) {
      offsetRef.current = mod(dragStartOffset.current - dx, width);
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    }
  };

  const endDrag = () => {
    if (wrapRef.current) wrapRef.current.style.cursor = "";
    dragging.current = false; mayDrag.current = false;
    setTimeout(() => setPaused(false), 250);
  };

  const onWheel = (e) => {
    if (!trackRef.current || widthRef.current <= 0) return;
    const delta = (e.deltaX || e.deltaY) * 0.7;
    if (!delta) return;
    setPaused(true);
    offsetRef.current = mod(offsetRef.current + delta, widthRef.current);
    trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    clearTimeout(onWheel._t);
    onWheel._t = setTimeout(() => setPaused(false), 300);
  };

  return {
    wrapRef,
    trackRef,
    firstCycleFirstRef,
    secondCycleFirstRef,
    setPaused,
    onPointerDown,
    onPointerMove,
    endDrag,
    onWheel,
  };
}

/* === Fixed logo box for uniform sizing === */
const LOGO_BOX =
  "w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] md:w-[160px] md:h-[160px] lg:w-[170px] lg:h-[170px]";

/* ——— Component ——— */
const BrandLogos = ({ onInquire = (brandTitle) => alert(`Inquire: ${brandTitle}`) }) => {
  const mid = Math.ceil(allBrands.length / 2);
  const topBrands = allBrands.slice(0, mid);
  const bottomBrands = allBrands.slice(mid);

  const rowTop = useMarqueeRow({ speedPxPerSec: 26, reverse: false });
  const rowBottom = useMarqueeRow({ speedPxPerSec: 26, reverse: true });

  const Card = (brand, i, rowKey) => (
    <div
      key={`${rowKey}-${i}-${brand.title}`}
      className="w-[min(64vw,320px)] h-[min(64vw,320px)] sm:w-[min(44vw,300px)] sm:h-[min(44vw,300px)] md:w-[min(32vw,320px)] md:h-[min(32vw,320px)] lg:w-[min(24vw,340px)] lg:h-[min(24vw,340px)] xl:w-[min(20vw,360px)] xl:h-[min(20vw,360px)] 2xl:w-[360px] 2xl:h-[360px]
                 flex-shrink-0 group [perspective:1000px] select-none
                 transition-transform duration-300 hover:scale-[1.03] hover:z-10"
      onMouseEnter={() => (rowKey === "top" ? rowTop.setPaused(true) : rowBottom.setPaused(true))}
      onMouseLeave={() => (rowKey === "top" ? rowTop.setPaused(false) : rowBottom.setPaused(false))}
      style={{ padding: "2px" }}
      role="group"
      aria-label={`${brand.title} card`}
    >
      <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-[20px] flex flex-col items-center justify-between p-5 border [backface-visibility:hidden]"
          style={{
            background: COLORS.cardFrontSolid,
            borderColor: COLORS.emeraldBorder,
            boxShadow: `${COLORS.shadow}, inset 0 0 0 1px rgba(255,255,255,0.02)`,
          }}
        >
          <div className="flex-1 w-full flex items-center justify-center">
            <div className={`${LOGO_BOX} flex items-center justify-center`}>
              <AdvancedImage
                cldImg={img(brand.imageId, 360)}
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                alt={brand.title}
                style={{
                  width: "100%",
                  height: "100%",
                  filter: "brightness(0.9) saturate(0.2) contrast(1.1)",
                }}
              />
            </div>
          </div>
          <div className="mt-3 h-6 flex items-center justify-center">
            <p className="text-center text-[16px] sm:text-[17px] font-extrabold text-[#E8ECEA] tracking-wide">
              {brand.title}
            </p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-[20px] flex flex-col border [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden"
          style={{
            background: COLORS.cardFrontSolid,
            borderColor: COLORS.emeraldBorder,
            boxShadow: `${COLORS.shadow}, inset 0 0 0 1px rgba(255,255,255,0.02)`,
            padding: "18px",
          }}
        >
          {/* Brand title — smaller, white, and NO underline */}
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#E8ECEA] text-center mb-2 tracking-wide uppercase">
            {brand.title}
          </h3>

          {/* Tagline */}
          <p className="text-[12px] sm:text-[13px] text-emerald-300 text-center mb-3 italic">
            Genuine UK-Imported Parts
          </p>

          {/* Description — smaller, justified, no odd hyphen splits */}
          <div className="flex-1 overflow-auto pr-1" style={{ scrollbarWidth: "none" }}>
            <p
              className="text-[12.5px] sm:text-[13.5px] md:text-[14px] text-[#E8ECEA]/90 leading-[1.6] md:leading-[1.65] text-justify"
              style={{
                textAlignLast: "left",
                hyphens: "manual",        // avoid automatic weird splits
                wordBreak: "normal",
                overflowWrap: "anywhere",
                textWrap: "pretty",       // nicer wrapping in modern browsers
              }}
            >
              {brand.description}
            </p>
          </div>

          {/* Inquire button — emerald outline & text */}
          <div className="flex justify-center pt-4 pb-1">
            <button
              data-no-drag
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInquire(brand.title);
              }}
              className="px-5 py-2 rounded-full text-[13px] sm:text-sm font-semibold border border-emerald-400 text-emerald-400
                         hover:bg-emerald-400/10 hover:shadow-[0_0_12px_rgba(23,167,122,0.5)]
                         focus:outline-none focus:ring-2 focus:ring-emerald-400/40
                         transition-all"
              aria-label={`Inquire now about ${brand.title}`}
            >
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Row = ({ brands, rowHook, rowKey }) => {
    const {
      wrapRef,
      trackRef,
      firstCycleFirstRef,
      secondCycleFirstRef,
      onPointerDown,
      onPointerMove,
      endDrag,
      onWheel,
    } = rowHook;

    const doubled = useMemo(() => [...brands, ...brands], [brands]);

    return (
      <div
        ref={wrapRef}
        className="py-2 overflow-x-hidden overflow-y-visible select-none cursor-grab"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onWheel={onWheel}
      >
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 md:gap-7 w-max will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {doubled.map((b, i) => {
            const refProp =
              i === 0 ? { ref: firstCycleFirstRef } : i === brands.length ? { ref: secondCycleFirstRef } : {};
            return (
              <div key={`${rowKey}-${i}`} {...refProp}>
                {Card(b, i, rowKey)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="brands" className="relative z-0 px-3 sm:px-4 py-12 sm:py-16 md:py-20 text-white font-poppins scroll-mt-24">
      <h2 id="brands-heading" className="mb-6 sm:mb-8 md:mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        Brands We <span className="luxury-gold">Support</span>
      </h2>

      <Row brands={topBrands} rowHook={rowTop} rowKey="top" />
      <div className="h-6 sm:h-8 md:h-10" />
      <Row brands={bottomBrands} rowHook={rowBottom} rowKey="bottom" />

      <style>{`
        .luxury-gold {
          background: linear-gradient(90deg, #FFD95A, #E8B923, #FFD95A);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s linear infinite;
        }
        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-label^='brands-row-'] div[style*='translate3d'] { transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default BrandLogos;
