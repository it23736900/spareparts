// src/components/BrandLogos.jsx
import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
} from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { useCallback } from "react";
/* =============================================================================
   THEME — Premium Metallic Black + Deep Emerald
   Only visual tokens updated per request. Functionality unchanged.
============================================================================= */

const COLORS = {
  // Darker, richer metallic black with subtle direction to feel "brushed"
  cardFrontSolid:
    "linear-gradient(160deg, #070707 0%, #0B0B0B 40%, #111111 100%)",
  cardBackSolid:
    "linear-gradient(160deg, #060606 0%, #0A0A0A 40%, #101010 100%)",
  // Dark emerald border line — darker than before, still with a soft glow potential
  emeraldBorder: "rgba(0, 96, 64, 0.55)",
  // Heavier shadow to lift the very dark cards
  shadow: "0 18px 40px -16px rgba(0,0,0,0.85)",
  // Accent yellow for the "Genuine UK-Imported Parts" line
  accentYellow: "#FFD95A",
};

/* =============================================================================
   CLOUDINARY — unchanged
============================================================================= */

const cld = new Cloudinary({ cloud: { cloudName: "dznt9s0j8" } });

const img = (id, w = 360) =>
  cld
    .image(id)
    .delivery(format("auto")) // choose best format (WebP/AVIF)
    .delivery(quality("auto")) // optimize quality/size
    .resize(auto().width(w));

/* =============================================================================
   DATA — unchanged
============================================================================= */

const allBrands = [
  {
    title: "Range Rover",
    imageId: "26_obvdzf",
    description:
      "Built for both rugged performance and refined luxury, Range Rover represents the very best of British automotive excellence. To keep these powerful machines running at their peak, we supply Range Rover parts for SUVs, directly imported from the UK.",
  },
  {
    title: "BMW",
    imageId: "28_gd25p1",
    description:
      "Synonymous with precision German engineering and driving pleasure, BMW offers a perfect blend of sportiness and luxury. We supply genuine used BMW spare parts, directly imported from the UK.",
  },
  {
    title: "Mercedes-Benz",
    imageId: "benz_c_crop_w_350_h_350_tfeyhv",
    description:
      "Celebrated worldwide for its luxury, innovation, and safety, Mercedes-Benz defines automotive excellence. We import authentic Mercedes-Benz European spare parts from the UK.",
  },
  {
    title: "Audi",
    imageId: "33_qjuu43",
    description:
      "With modern design and advanced technology, Audi stands for progressive German engineering. We help maintain that standard by importing Audi spares directly.",
  },
  {
    title: "Volvo",
    imageId: "30_otr2zm",
    description:
      "Renowned for its Scandinavian safety, comfort, and reliability, Volvo vehicles are built to protect. We source used Volvo spare parts directly from the UK.",
  },
  {
    title: "Volkswagen",
    imageId: "29_htoepn",
    description:
      "Combining timeless design with everyday practicality, Volkswagen is a symbol of German reliability. We import authentic Volkswagen spares from the UK.",
  },
  {
    title: "Porsche",
    imageId: "25_orvz24",
    description:
      "Blending racing heritage with luxury, Porsche creates truly thrilling driving experiences. We supply used Porsche spare parts directly sourced from the UK.",
  },
  {
    title: "Morris Garages",
    imageId: "32_xq8d63",
    description:
      "A British classic reborn with contemporary style, MG vehicles offer charm and affordability. We import used MG spares directly from the UK.",
  },
  {
    title: "Ford",
    imageId: "Untitled_design_12_pi7wbj_j74ppk",
    description:
      "Known for versatility and durability, Ford’s include cars, SUVs, and pickup trucks. We supply authentic Ford spare parts from trusted UK partners.",
  },
  {
    title: "Jaguar",
    imageId: "Untitled_design_15_bgbbwf_fwdowk",
    description:
      "Combining British elegance with powerful performance, Jaguar creates distinctive luxury vehicles. We import Jaguar spare parts from the UK.",
  },
  {
    title: "Renault",
    imageId: "Untitled_design_16_kbhzqz_liaj9z",
    description:
      "A trusted European brand known for efficiency and style, Renault makes cars that suit city and family life alike. We import Renault spare parts from the UK.",
  },
  {
    title: "Peugeot",
    imageId: "Untitled_design_13_voryto_r41abx",
    description:
      "With French flair and comfort, Peugeot vehicles bring European sophistication to everyday driving. We keep them in top shape with UK-imported parts.",
  },
  {
    title: "Mini Cooper",
    imageId: "Untitled_design_17_yrnkrf_erzcmz",
    description:
      "Iconic, compact, and full of character, Mini Cooper remains a symbol of British design and fun driving. We import used Mini Cooper parts from the UK.",
  },
];

/* =============================================================================
   UTILS — unchanged
============================================================================= */

const mod = (n, m) => ((n % m) + m) % m;

/* =============================================================================
   HOOK — Marquee (infinite, draggable) — unchanged behavior
============================================================================= */

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
      if (
        track &&
        width > 0 &&
        !paused &&
        !dragging.current &&
        !mayDrag.current
      ) {
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
    if (
      e.target.closest(
        "[data-no-drag], button, a, input, textarea, select"
      )
    )
      return;
    mayDrag.current = true;
    dragging.current = false;
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragStartOffset.current = offsetRef.current;
    // Pause while interacting
    setPaused(true);
    wrapRef.current?.setPointerCapture?.(e.pointerId);
    if (wrapRef.current) wrapRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e) => {
    if (!mayDrag.current) return;
    const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const dx = cx - dragStartX.current;
    const width = widthRef.current;
    // Once moved, consider it dragging
    if (!dragging.current && Math.abs(dx) > 2) dragging.current = true;
    if (dragging.current && width > 0) {
      offsetRef.current = mod(dragStartOffset.current - dx, width);
      if (trackRef.current)
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    }
  };

  const endDrag = () => {
    if (wrapRef.current) wrapRef.current.style.cursor = "";
    dragging.current = false;
    mayDrag.current = false;
    // Allow a tiny delay so momentum doesn't feel jumpy
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

/* =============================================================================
   CONSTANTS — Logo box sizing (unchanged)
============================================================================= */

const LOGO_BOX =
  "w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] md:w-[160px] md:h-[160px] lg:w-[170px] lg:h-[170px]";

/* =============================================================================
   COMPONENT — BrandLogos
============================================================================= */

const BrandLogos = ({
  onInquire = (brandTitle) => alert(`Inquire: ${brandTitle}`),
}) => {
  const mid = Math.ceil(allBrands.length / 2);
  const topBrands = allBrands.slice(0, mid);
  const bottomBrands = allBrands.slice(mid);

  const rowTop = useMarqueeRow({ speedPxPerSec: 26, reverse: false });
  const rowBottom = useMarqueeRow({ speedPxPerSec: 26, reverse: true });

const [flippedCard, setFlippedCard] = useState(null);

const handleCardClick = (brandTitle) => {
  setFlippedCard((prev) => (prev === brandTitle ? null : brandTitle));
  if (flippedCard !== brandTitle) {
    rowTop.setPaused(true);
    rowBottom.setPaused(true);
  }
};

const handleCloseFlip = useCallback(() => {
  setFlippedCard(null);
  rowTop.setPaused(false);
  rowBottom.setPaused(false);
}, [rowTop, rowBottom]);

useEffect(() => {
  if (window.innerWidth >= 768) return; // only mobile
  const handleOutsideClick = (e) => {
    if (e.target.closest("button[data-no-close]")) return; // skip Inquire button
    if (!e.target.closest("[aria-label$='card']")) {
      handleCloseFlip();
    }
  };
  document.addEventListener("click", handleOutsideClick);
  return () => document.removeEventListener("click", handleOutsideClick);
}, [handleCloseFlip]);

  /* ---------------------------------------------------------------------------
     Card — visuals updated only (darker black, gradient titles, white body text,
     yellow subline, same green-bordered button). Layout & behavior preserved.
  --------------------------------------------------------------------------- */
  const Card = (brand, i, rowKey) => (
    <div
  key={`${rowKey}-${i}-${brand.title}`}
  className={`w-[min(70vw,280px)] h-[min(70vw,280px)] sm:w-[min(44vw,300px)] sm:h-[min(44vw,300px)] md:w-[min(32vw,320px)] md:h-[min(32vw,320px)] lg:w-[min(24vw,340px)] lg:h-[min(24vw,340px)] xl:w-[min(20vw,360px)] xl:h-[min(20vw,360px)] 2xl:w-[360px] 2xl:h-[360px]
     flex-shrink-0 group [perspective:1000px] select-none
     transition-transform duration-300 hover:scale-[1.03] hover:z-10`}
     onClick={() => {
      if (window.innerWidth < 768) {
        if (flippedCard === brand.title) {
          // already flipped → close + resume
          handleCloseFlip();
        } else {
          // flip new card + pause marquee
          handleCardClick(brand.title);
          rowTop.setPaused(true);
          rowBottom.setPaused(true);
        }
      }
    }}
    
  role="group"
  aria-label={`${brand.title} card`}
>
  
<div
  className={`relative w-full h-full duration-700 [transform-style:preserve-3d]
    ${flippedCard === brand.title ? "[transform:rotateY(180deg)]" : ""} 
    group-hover:[transform:rotateY(180deg)]`}
>


        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-[20px] flex flex-col items-center justify-between p-5 border [backface-visibility:hidden]"
          style={{
            background: COLORS.cardFrontSolid,
            borderColor: COLORS.emeraldBorder,
            // Subtle inner line effect to emphasize the green border
            boxShadow: `${COLORS.shadow}, inset 0 0 0 1px rgba(255,255,255,0.02)`,
          }}
        >
          <div className="flex items-center justify-center flex-1 w-full">
            <div className={`${LOGO_BOX} flex items-center justify-center`}>
              <AdvancedImage
                cldImg={img(brand.imageId, 360)}
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                alt={brand.title}
                style={{
                  width: "100%",
                  height: "100%",
                  // Keep logos readable on darker card
                  filter: "brightness(0.98) contrast(1.06)",
                }}
              />
            </div>
          </div>

          {/* Front Title — gradient white -> #111111 (requested) */}
          <div className="flex items-center justify-center h-6 mt-3">
            <p
              className="text-center text-[16px] sm:text-[17px] font-extrabold tracking-wide"
              style={{
                backgroundImage:
                  "linear-gradient(white, white, #111111)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {brand.title}
            </p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-[20px] flex flex-col border [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden"
          style={{
            background: COLORS.cardBackSolid, // match theme — darker metallic black
            borderColor: COLORS.emeraldBorder, // same darker green border
            boxShadow: `${COLORS.shadow}, inset 0 0 0 1px rgba(255,255,255,0.02)`,
            padding: "18px",
          }}
        >
          {/* Back Title — same gradient style for consistency */}
          <h3
            className="mb-2 text-base font-bold tracking-wide text-center uppercase sm:text-lg md:text-xl"
            style={{
              backgroundImage:
                "linear-gradient(white, white, #111111)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {brand.title}
          </h3>

          {/* Yellow accent subtitle */}
          <p
            className="text-[12px] sm:text-[13px] text-center mb-3 italic"
            style={{ color: COLORS.accentYellow }}
          >
            Genuine UK-Imported Parts
          </p>

          {/* Body copy — white, centered alignment preserved overall; text remains readable */}
          <div
            className="flex-1 pr-1 overflow-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <p
              className="text-[12.5px] sm:text-[13.5px] md:text-[14px] leading-[1.6] md:leading-[1.65] text-center md:text-justify"
              style={{
                color: "rgba(250,250,250,0.92)",
                textAlignLast: "center",
                hyphens: "manual",
                wordBreak: "normal",
                overflowWrap: "anywhere",
                textWrap: "pretty",
              }}
            >
              {brand.description}
            </p>
          </div>

          {/* Button — keep green border style exactly, center aligned */}
          <div className="flex justify-center pt-4 pb-1">
            <button
              data-no-drag
              data-no-close
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInquire(brand.title);
                handleCloseFlip();
              }}
              className="mt-4 px-5 py-2 rounded-full text-sm font-semibold 
             text-[#0B7D4E] border border-[#0B7D4E] 
             shadow-[0_0_6px_rgba(11,125,78,0.6)] 
             hover:text-[#FFD95A] hover:border-[#FFD95A] 
             hover:shadow-[0_0_10px_rgba(255,217,90,0.7)] 
             transition-all duration-300"
              aria-label={`Inquire now about ${brand.title}`}
            >
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  
  
  /* ---------------------------------------------------------------------------
     Row — infinite marquee duplicating content; unchanged
  --------------------------------------------------------------------------- */
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
        className="py-2 overflow-x-hidden cursor-grab"
        style={{ touchAction: "pan-y pinch-zoom" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onWheel={onWheel}
      >
        <div
          ref={trackRef}
          className="flex gap-6 w-max will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {doubled.map((b, i) => {
            const refProp =
              i === 0
                ? { ref: firstCycleFirstRef }
                : i === brands.length
                ? { ref: secondCycleFirstRef }
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
  

  /* ---------------------------------------------------------------------------
     Section — background blend + heading gradient (requested)
  --------------------------------------------------------------------------- */
  return (
    <section
      id="brands"
      className="relative z-0 px-3 py-12 sm:px-4 sm:py-16 md:py-20 font-poppins scroll-mt-24"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #0C1C14 50%, #000000 100%)",
      }}
    >
      {/* Heading uses the exact gradient style requested */}
      <h2
        id="brands-heading"
        className="mb-6 text-2xl font-bold text-center sm:mb-8 md:mb-10 sm:text-3xl md:text-4xl lg:text-5xl"
        style={{
          backgroundImage: "linear-gradient(white, white, #111111)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Brands We Support
      </h2>

      <Row brands={topBrands} rowHook={rowTop} rowKey="top" />
      <div className="h-6 sm:h-8 md:h-10" />
      <Row brands={bottomBrands} rowHook={rowBottom} rowKey="bottom" />

      {/* Local styles for text accents and motion preferences */}
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

        /* Respect reduce-motion */
        @media (prefers-reduced-motion: reduce) {
          [aria-label^='brands-row-'] div[style*='translate3d'] {
            transform: none !important;
          }
          .luxury-gold {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BrandLogos;