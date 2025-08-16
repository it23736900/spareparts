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
    <section
      id="testimonials"
      className="max-w-6xl px-4 py-12 mx-auto bg-transparent"
    >
      <h2
        className="text-3xl font-extrabold text-center text-white sm:text-4xl"
        data-aos="fade-up"
      >
        What Our Clients Say
      </h2>

      <div
        className="mx-auto mt-4 mb-8 h-[2px] w-28 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
        data-aos="fade-up"
        data-aos-delay="100"
      />

      <div data-aos="fade-up" data-aos-delay="200">
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 5200, disableOnInteraction: false }}
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
                  relative h-full min-h-[240px] sm:min-h-[260px]
                  flex flex-col p-6 rounded-2xl
                  bg-[#07140F]  /* solid dark green */
                  border border-[#D4AF37]/70  /* gold border */
                  shadow-[0_0_30px_-12px_rgba(212,175,55,0.35)]
                  hover:shadow-[0_0_50px_-10px_rgba(212,175,55,0.55)]
                  transition-shadow duration-300
                "
              >
                <div className="relative mb-3 text-4xl leading-none text-[#D4AF37]/80 select-none">
                  “
                </div>

                <p className="relative text-base italic leading-relaxed text-white/90">
                  {t.message}
                </p>

                <div className="relative flex items-center gap-3 mt-6">
                  <span className="block h-[1px] w-8 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                  <span className="text-sm font-semibold text-[#D4AF37]">
                    {t.name}
                  </span>
                  <span className="text-sm text-white/70">({t.location})</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
