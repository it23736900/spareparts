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

const TestimonialCarousel = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-12 px-4" id="testimonials">
      <h2
        className="text-3xl sm:text-4xl font-extrabold text-white text-center"
        data-aos="fade-up"
      >
        What Our Clients Say
      </h2>

      {/* subtle gold divider */}
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
            <SwiperSlide key={i}>
              {/* Card with elegant dark‑green lighting */}
              <div
                className="
                  relative h-full overflow-hidden p-6
                  flex flex-col justify-between rounded-2xl border
                  bg-[#0E2A24]/70 border-[#1B4D43]/40 backdrop-blur
                  
                  /* soft green shadow */
                  shadow-[0_0_50px_-24px_rgba(9,121,77,0.35)]
                  hover:shadow-[0_0_70px_-18px_rgba(9,121,77,0.5)]
                  transition-shadow duration-300

                  /* dark‑green radial aura behind card */
                  before:content-[''] before:absolute before:-inset-6
                  before:-z-10 before:rounded-[1.25rem]
                  before:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,94,66,0.35),transparent_70%)]
                  before:blur-[26px] before:opacity-90
                  hover:before:opacity-100
                "
              >
                {/* soft gold vignette on the face */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_20%_0%,rgba(212,175,55,0.10),transparent)]" />

                <p className="relative mb-5 text-base leading-relaxed text-white/90 italic">
                  <span className="text-[#D4AF37]">“</span>
                  {t.message}
                  <span className="text-[#D4AF37]">”</span>
                </p>

                <div className="relative mt-auto flex items-center gap-3">
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
};

export default TestimonialCarousel;
