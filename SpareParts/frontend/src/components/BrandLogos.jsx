// src/components/BrandLogos.jsx
import React, { useRef, useState, useLayoutEffect, useEffect, useMemo } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";

/* Surfaces tuned for dark theme */
const COLORS = {
  cardFront: "#0E1B1F",
  cardBack:  "#0C171B",
  border: "rgba(255,255,255,0.06)",
  shadow: "0 0 40px -22px rgba(16,94,66,0.35)",
};

/* Cloudinary */
const cld = new Cloudinary({ cloud: { cloudName: "dnk3tgxht" } });
const img = (id) => cld.image(id).format("auto").quality("auto").resize(auto().width(400));

/* Data */
const allBrands = [
  { title: "Range Rover", imageId: "Land-Rover_dfugi3", description: "Built for both rugged performance and refined luxury, Range Rover represents the very best of British automotive excellence. To keep these powerful machines running at their peak, we supply Range Rover parts for SUV’s, directly imported from the UK." },
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

/* Marquee hook */
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

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest('[data-no-drag], button, a, input, textarea, select')) return;
    mayDrag.current = true; dragging.current = false; wasDragging.current = false;
    dragStartX.current = e.clientX; dragStartOffset.current = offsetRef.current;
  };
  const onPointerMove = (e) => {
    if (!mayDrag.current) return;
    const dx = e.clientX - dragStartX.current;
    const absDx = Math.abs(dx);
    const width = widthRef.current;
    if (!dragging.current && absDx >= DRAG_THRESHOLD) {
      dragging.current = true; wasDragging.current = true;
      wrapRef.current?.setPointerCapture?.(e.pointerId);
      if (wrapRef.current) wrapRef.current.style.cursor = "grabbing";
      setPaused(true);
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
      setPaused(false);
    }
    dragging.current = false; mayDrag.current = false;
  };
  const onClickCapture = (e) => {
    if (wasDragging.current) { e.preventDefault(); e.stopPropagation(); wasDragging.current = false; }
  };

  return { wrapRef, trackRef, firstCycleFirstRef, secondCycleFirstRef,
           setPaused, onPointerDown, onPointerMove, endDrag, onClickCapture };
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
      className="mt-3 self-center text-[11px] sm:text-xs font-semibold px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full
                 bg-emerald-900/70 hover:bg-emerald-900/85 active:bg-emerald-900
                 border border-emerald-500/30 text-white shadow-[0_0_16px_rgba(16,94,66,0.45)]
                 hover:shadow-[0_0_24px_rgba(16,94,66,0.65)] focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
      aria-label={`Inquire now about ${brand}`}
    >
      Inquire Now
    </button>
  );

  const Card = (brand, i, rowKey) => (
    <div
      key={`${rowKey}-${i}-${brand.title}`}
      className="w-[240px] h-[240px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px]
                 flex-shrink-0 group [perspective:1000px] select-none
                 transition-transform hover:scale-[1.015] hover:z-10"
      onMouseEnter={() => (rowKey === "top" ? rowTop.setPaused(true) : rowBottom.setPaused(true))}
      onMouseLeave={() => (rowKey === "top" ? rowTop.setPaused(false) : rowBottom.setPaused(false))}
    >
      <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 border [backface-visibility:hidden]"
          style={{ background: COLORS.cardFront, borderColor: COLORS.border, boxShadow: COLORS.shadow }}
        >
          <AdvancedImage
            cldImg={img(brand.imageId)}
            style={{ width: "150px", height: "150px" }}
            className="object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-xl"
            alt={brand.title}
          />
          <p className="text-base font-semibold text-center mt-2">{brand.title}</p>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col justify-between p-5 md:p-6 text-center border [transform:rotateY(180deg)] [backface-visibility:hidden]"
          style={{ background: COLORS.cardBack, borderColor: COLORS.border, boxShadow: COLORS.shadow }}
        >
          <div className="px-1 flex-1 flex flex-col">
            <p className="text-emerald-300 font-semibold mb-2 text-[15px] md:text-[16px]">{brand.title}</p>
            <div className="relative flex-1">
              <p
                className="text-gray-200 leading-relaxed text-[12px] md:text-[13px] overflow-hidden"
                style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 5 }}
              >
                {brand.description}
              </p>
              <div
                className="pointer-events-none absolute bottom-0 left-0 w-full h-6"
                style={{ background: `linear-gradient(to top, ${COLORS.cardBack}, transparent)` }}
              />
            </div>
          </div>
          <InquireBtn brand={brand.title} />
        </div>
      </div>
    </div>
  );

  const Row = ({ brands, rowHook, rowKey }) => {
    const { wrapRef, trackRef, firstCycleFirstRef, secondCycleFirstRef,
            onPointerDown, onPointerMove, endDrag, onClickCapture } = rowHook;
    const doubled = useMemo(() => [...brands, ...brands], [brands]);

    return (
      <div
        ref={wrapRef}
        className="overflow-hidden select-none cursor-grab"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        <div
          ref={trackRef}
          className="flex w-max will-change-transform gap-4 md:gap-6"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {doubled.map((b, i) => {
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
    <section className="bg-page -mt-px py-16 sm:py-20 px-4 text-white font-poppins">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-10">
        Our Supportive Brands
      </h2>

      <Row brands={topBrands} rowHook={rowTop} rowKey="top" />
      <div className="h-8 sm:h-10" />
      <Row brands={bottomBrands} rowHook={rowBottom} rowKey="bottom" />
    </section>
  );
};

export default BrandLogos;