// src/components/TestimonialCarousel.jsx
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    name: "Sanduni Fernando",
    location: "Nugegoda",
    message:
      "My 2018 Range Rover Autobiography needed SUV parts that weren’t available locally. They imported spare parts directly for me. Great service, friendly team, and quick delivery across Sri Lanka!",
  },
  {
    name: "Amal Perera",
    location: "Kandy",
    message:
      "I was surprised by how fast they delivered the parts. Really good tracking and communication too!",
  },
  {
    name: "Nuwan Jayasinghe",
    location: "Colombo",
    message:
      "Excellent quality and packaging. Definitely recommend for anyone looking for rare parts.",
  },
];

export default function TestimonialCarousel() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const DARK_GREEN = "#014421";

  return (
    <section
      id="testimonials"
      className="relative py-16 sm:py-20"
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0A1A15 50%, #050505 100%)",
      }}
    >
      <div className="max-w-6xl px-4 mx-auto">
        {/* Title */}
        <h2
          className="mb-12 text-3xl font-extrabold text-center text-transparent sm:text-4xl bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(white, white, #111111)",
          }}
          data-aos="fade-up"
        >
          What Our Clients Say
        </h2>

      
        {/* Carousel */}
        <div data-aos="fade-up" data-aos-delay="200">
          <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{ delay: 6500, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 28 },
              1024: { slidesPerView: 2, spaceBetween: 32 },
            }}
            className="w-full"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="h-full">
                <div
                  className="
                    relative rounded-2xl p-6
                    h-full min-h-[240px] sm:min-h-[260px]
                    transition-all
                    shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]
                  "
                  style={{
                    background: "linear-gradient(135deg, #0B1C1F 0%, #07110F 100%)",
                    border: `1px solid ${DARK_GREEN}`,
                    boxShadow: `0 0 15px rgba(1, 68, 33, 0.35)`,
                  }}
                >
                  {/* Quote icon */}
                  <div className="mb-3 text-4xl leading-none select-none text-emerald-400/90">
                    “
                  </div>

                  {/* Message */}
                  <p className="text-[15px] leading-relaxed text-gray-200 font-light">
                    {t.message}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-6">
                    <span className="block h-[1px] w-8 bg-emerald-500/70" />
                    <span className="text-sm font-semibold text-[#FFD95A]">
                      {t.name}
                    </span>
                    <span className="text-sm text-gray-400">({t.location})</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
