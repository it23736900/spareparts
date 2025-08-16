// src/components/BrandLogos.jsx
import React, { useRef, useState, useLayoutEffect, useEffect, useMemo } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

/* === Theme (darker green + thin gold, premium) === */
const GOLD = "#D4AF37";
const COLORS = {
  // FRONT: metallic gradient (slightly brighter than back)
  cardFrontGradient: `
    linear-gradient(
      135deg,
      rgba(6,18,15,0.98) 0%,
      rgba(12,36,28,0.96) 45%,
      rgba(6,18,15,0.98) 100%
    )
  `,
  // BACK: darker solid green
  cardBackSolid: "#08110F",
  // fine border + soft gold glow
  border: "rgba(212,175,55,0.28)",
  shadow: "0 18px 40px -16px rgba(0,0,0,0.55)",
  text: "#E8ECEA",
};

/* Cloudinary */
const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const img = (id) => cld.image(id).format("auto").quality("auto").resize(auto().width(500));

/* Data */
const allBrands = [
  { title: "Range Rover", imageId: "Land-Rover_dfugi3", description: "Built for both rugged performance and refined luxury, Range Rover represents the very best of British automotive excellence. To keep these powerful machines running at their peak, we supply Range Rover parts for SUVs, directly imported from the UK." },
  { title: "BMW", imageId: "BMW_if2qdm", description: "Synonymous with precision German engineering and driving pleasure, BMW offers a perfect blend of sportiness and luxury. We supply genuine used BMW spare parts, directly imported from the UK." },
  { title: "Mercedes-Benz", imageId: "mercedesbenz_nvbkqv", description: "Celebrated worldwide for its luxury, innovation, and safety, Mercedes-Benz defines automotive excellence. We import authentic Mercedes-Benz European spare parts from the UK." },
  { title: "Audi", imageId: "audi_yahk7u", description: "With modern design and advanced technology, Audi stands for progressive German engineering. We help maintain that standard by importing Audi spares directly." },
  { title: "Volvo", imageId: "Volvo_iykd5e", description: "Renowned for its Scandinavian safety, comfort, and reliability, Volvo vehicles are built to protect. We source used Volvo spare parts directly from the UK." },
  { title: "Volkswagen", imageId: "vw_kxbbn3", description: "Combining timeless design with everyday practicality, Volkswagen is a symbol of German reliability. We import authentic Volkswagen spares from the UK." },
  { title: "Porsche", imageId: "porsche_husop5", description: "Blending racing heritage with luxury, Porsche creates truly thrilling driving experiences. We supply used Porsche spare parts directly sourced from the UK." },
  { title: "MG", imageId: "MG_jetn1d", description: "A British classic reborn with contemporary style, MG vehicles offer charm and affordability. We import used MG spares directly from the UK." },
  { title: "Ford", imageId: "Untitled_design_12_pi7wbj", description: "Known for versatility and durability, Ford’s include cars, SUVs, and pickup trucks. We supply authentic Ford spare parts from trusted UK partners." },
  { title: "Jaguar", imageId: "Untitled_design_15_bgbbwf", description: "Combining British elegance with powerful performance, Jaguar creates distinctive luxury vehicles. We import Jaguar spare parts from the UK." },
  { title: "Renault", imageId: "Untitled_design_16_kbhzqz", description: "A trusted European brand known for efficiency and style, Renault makes cars that suit city and family life alike. We import Renault spare parts from the UK." },
  { title: "Peugeot", imageId: "Untitled_design_13_voryto", description: "With French flair and comfort, Peugeot vehicles bring European sophistication to everyday driving. We keep them in top shape with UK-imported parts." },
  { title: "Mini Cooper", imageId: "Untitled_design_17_yrnkrf", description: "Iconic, compact, and full of character, Mini Cooper remains a symbol of British design and fun driving. We import used Mini Cooper parts from the UK." },
];

/* Utils */
const mod = (n, m) => ((n % m) + m) % m;

/* Marquee hook (endless horizontal + manual drag + wheel) */
function useMarqueeRow({ speedPxPerSec = 40, reverse = false }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const firstCycleFirstRef = useRef(null);
  const secondCycleFirstRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const widthRef = useRef(1);
  const offsetRef = useRef(0);
  const dragging = useRef(false);
  const mayDrag = useRef(false);
  const wasDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const rafRef = useRef(0);
  const DRAG_THRESHOLD = 6;

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
        offsetRef.current = mod(offsetRef.current + dir * speedPxPerSec * dt, width);
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, reverse, speedPxPerSec]);

  // Manual drag (mouse/touch)
  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest('[data-no-drag], button, a, input, textarea, select')) return;
    mayDrag.current = true; dragging.current = false; wasDragging.current = false;
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragStartOffset.current = offsetRef.current;
    setPaused(true);
  };
  const onPointerMove = (e) => {
    if (!mayDrag.current) return;
    const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const dx = cx - dragStartX.current;
    const absDx = Math.abs(dx);
    const width = widthRef.current;
    if (!dragging.current && absDx >= DRAG_THRESHOLD) {
      dragging.current = true; wasDragging.current = true;
      wrapRef.current?.setPointerCapture?.(e.pointerId);
      if (wrapRef.current) wrapRef.current.style.cursor = "grabbing";
    }
    if (dragging.current && width > 0) {
      offsetRef.current = mod(dragStartOffset.current - dx, width);
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    }
  };
  const endDrag = (e) => {
    if (dragging.current) {
      try { wrapRef.current?.releasePointerCapture?.(e.pointerId); } catch {}
      if (wrapRef.current) wrapRef.current.style.cursor = "";
    }
    dragging.current = false; mayDrag.current = false;
    setTimeout(() => setPaused(false), 400); // resume after a moment
  };

  // Horizontal wheel support
  const onWheel = (e) => {
    if (!trackRef.current || widthRef.current <= 0) return;
    // Use deltaY for vertical wheels to nudge horizontally
    const delta = (e.deltaX || e.deltaY) * 0.8;
    if (!delta) return;
    setPaused(true);
    offsetRef.current = mod(offsetRef.current + delta, widthRef.current);
    trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    // resume later
    clearTimeout(onWheel._t);
    onWheel._t = setTimeout(() => setPaused(false), 500);
  };

  return { wrapRef, trackRef, firstCycleFirstRef, secondCycleFirstRef,
           setPaused, onPointerDown, onPointerMove, endDrag, onWheel };
}

/* Component */
const BrandLogos = ({ onInquire = (b) => alert(`Inquire: ${b}`) }) => {
  const mid = Math.ceil(allBrands.length / 2);
  const topBrands = allBrands.slice(0, mid);
  const bottomBrands = allBrands.slice(mid);

  const rowTop = useMarqueeRow({ speedPxPerSec: 40, reverse: false });
  const rowBottom = useMarqueeRow({ speedPxPerSec: 40, reverse: true });

  const InquireBtn = ({ brand }) => (
    <button
      data-no-drag
      type="button"
      onClick={() => onInquire({ brand })}
      className="mt-4 self-center text-[12px] sm:text-[13px] font-semibold px-4 py-2 rounded-full transition-transform"
      style={{
        color: "#FFD95A",
        background: "linear-gradient(135deg, rgba(5,15,12,0.98) 0%, rgba(12,36,28,0.96) 45%, rgba(5,15,12,0.98) 100%)",
        border: `1.5px solid ${GOLD}`,
        boxShadow: "0 0 14px rgba(212,175,55,0.35)",
      }}
      onMouseEnter={(e)=> e.currentTarget.style.boxShadow = "0 0 24px rgba(212,175,55,0.6)"}
      onMouseLeave={(e)=> e.currentTarget.style.boxShadow = "0 0 14px rgba(212,175,55,0.35)"}
      aria-label={`Inquire now about ${brand}`}
    >
      Inquire Now
    </button>
  );

  const Card = (brand, i, rowKey) => (
    <div
      key={`${rowKey}-${i}-${brand.title}`}
      className="w-[340px] h-[340px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px]
                 flex-shrink-0 group [perspective:1000px] select-none
                 transition-transform duration-300 hover:scale-[1.04] hover:z-10"
      onMouseEnter={() => (rowKey === "top" ? rowTop.setPaused(true) : rowBottom.setPaused(true))}
      onMouseLeave={() => (rowKey === "top" ? rowTop.setPaused(false) : rowBottom.setPaused(false))}
      style={{ padding: "2px" }}
    >
      <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* FRONT (metallic gradient) */}
        <div
          className="absolute inset-0 rounded-[22px] flex flex-col items-center justify-center p-6 border [backface-visibility:hidden]"
          style={{
            background: COLORS.cardFrontGradient,
            borderColor: COLORS.border,
            boxShadow: `${COLORS.shadow}, 0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 18px rgba(212,175,55,0.10)`,
          }}
        >
          <AdvancedImage
            cldImg={img(brand.imageId)}
            style={{
              width: "clamp(260px, 30vw, 340px)",
              height: "clamp(260px, 30vw, 340px)",
            }}
            className="object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-2xl"
            alt={brand.title}
          />

          <p className="mt-3 text-center text-[18px] font-semibold" style={{ color: "#FFD95A" }}>
            {brand.title}
          </p>
        </div>

<div
  className="absolute inset-0 rounded-[22px] flex flex-col border [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden" 
  style={{
    background: COLORS.cardBackSolid,  // ✅ solid metallic dark green
    borderColor: COLORS.border,
    boxShadow: `${COLORS.shadow}, 0 0 14px rgba(212,175,55,0.12)`,
    padding: "24px",   // ⬅️ margin inside card (space for text)
  }}
>
  {/* Title */}
  <p
    className="text-[20px] md:text-[22px] font-bold mb-3 text-center"
    style={{ color: "#FFD95A" }}
  >
    {brand.title}
  </p>

  {/* Description fills card with margin around */}
  <div
    className="flex-1 overflow-auto"
    style={{ scrollbarWidth: "none" }}
  >
    <p
      style={{
        fontSize: "clamp(18px, 2.4vw, 20px)",
        lineHeight: 1.5,
        textAlign: "justify",
        color: COLORS.text,
      }}
    >
      {brand.description}
    </p>
  </div>

  {/* Premium Inquiry button at bottom center */}
<div className="flex justify-center pt-6 pb-2">
  <button
    className="px-8 py-3 font-semibold transition-all duration-300"
    style={{
      background: "linear-gradient(145deg, #05120E, #0B1C1F)", 
      border: "1.5px solid #E6C84F",                           
      color: "#E6C84F",                                        
      fontSize: "16px",
      borderRadius: "50px",                                    
      boxShadow: "0 0 6px rgba(230,200,79,0.15)",              
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow =
        "0 0 18px rgba(230,200,79,0.55), inset 0 0 10px rgba(0,0,0,0.4)";
      e.currentTarget.style.transform = "scale(1.05)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 0 6px rgba(230,200,79,0.15)";
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    Inquire Now
  </button>
</div>

</div>


      </div>
    </div>
  );

  /* Row: endless horizontal loop + manual control */
  const Row = ({ brands, rowHook, rowKey }) => {
    const { wrapRef, trackRef, firstCycleFirstRef, secondCycleFirstRef,
            onPointerDown, onPointerMove, endDrag, onWheel } = rowHook;

    // Repeat 3x so you never see ends while looping horizontally (mobile + desktop)
    const tripled = useMemo(() => [...brands, ...brands, ...brands], [brands]);

    return (
      <div
        ref={wrapRef}
        className="py-4 overflow-x-hidden overflow-y-visible select-none cursor-grab"
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
          className="flex gap-6 md:gap-8 w-max will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {tripled.map((b, i) => {
            // markers to measure one logical cycle width
            const refProp =
              i === 0 ? { ref: firstCycleFirstRef }
              : i === brands.length ? { ref: secondCycleFirstRef }
              : {};
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
    <section
      className="relative z-0 px-4 py-20 text-white sm:py-24 font-poppins"
      style={{ overflow: "visible" }}
    >
      <h2
        className="mb-10 text-3xl font-bold text-center md:text-5xl md:mb-12"
        style={{ color: "#FFD95A", textShadow: "0 0 14px rgba(212,175,55,0.25)" }}
      >
        Our Supportive Brands
      </h2>

      <Row brands={topBrands} rowHook={rowTop} rowKey="top" />
      <div className="h-10 sm:h-12" />
      <Row brands={bottomBrands} rowHook={rowBottom} rowKey="bottom" />
    </section>
  );
};

export default BrandLogos;
