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

  return (
    <section id="testimonials" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title matches your section heading style */}
        <h2
          className="text-center text-3xl md:text-4xl font-extrabold text-white"
          data-aos="fade-up"
        >
          What Our Clients Say
        </h2>

        {/* Thin gold divider like elsewhere */}
        <div
          className="mx-auto mt-3 mb-8 h-[2px] w-28 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
          data-aos="fade-up"
          data-aos-delay="100"
        />

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
                    group relative overflow-hidden rounded-2xl p-6
                    h-full min-h-[240px] sm:min-h-[260px]
                    bg-card
                    border border-emerald-500/25
                    transition-all
                    will-change-transform
                    shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]
                    hover:-translate-y-[4px]
                    hover:shadow-[0_18px_60px_-24px_rgba(23,167,122,0.45)]
                  "
                >
                  {/* Quote mark in emerald to match services accents */}
                  <div className="mb-3 text-4xl leading-none text-emerald-300/90 select-none">
                    “
                  </div>

                  {/* Body text tones match services (soft teal/white) */}
                  <p className="text-[15px] leading-relaxed text-[#cfe2df]">
                    {t.message}
                  </p>

                  {/* Footer line + name/location styling consistent */}
                  <div className="flex items-center gap-3 mt-6">
                    <span className="block h-[1px] w-8 bg-emerald-400/70" />
                    <span className="text-sm font-semibold luxury-gold">
                      {t.name}
                    </span>
                    <span className="text-sm text-[#cfe2df]/70">
                      ({t.location})
                    </span>
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
