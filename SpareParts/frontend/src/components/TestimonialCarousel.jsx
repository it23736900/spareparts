import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';

const testimonials = [
  {
    name: "Sanduni Fernando",
    location: "Nugegoda",
    message: "My 2018 Range Rover Autobiography needed SUV parts that weren’t available locally. They imported spare parts directly for me. Great service, friendly team, and quick delivery across Sri Lanka!",
  },
  {
    name: "Amal Perera",
    location: "Kandy",
    message: "I was surprised by how fast they delivered the parts. Really good tracking and communication too!",
  },
  {
    name: "Nuwan Jayasinghe",
    location: "Colombo",
    message: "Excellent quality and packaging. Definitely recommend for anyone looking for rare parts.",
  },
];

const TestimonialCarousel = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4" id="testimonials">
      <h2
        className="text-4xl font-bold text-center text-white mb-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        What Our Clients Say
      </h2>

      <div data-aos="fade-up" data-aos-delay="200">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full"
        >
          {testimonials.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white/5 text-white p-6 rounded-xl border border-white/10 shadow-lg h-full flex flex-col justify-between">
                <p className="mb-4 text-base italic">“{review.message}”</p>
                <p className="font-bold text-yellow-400">
                  ⭐ {review.name} <span className="text-sm text-gray-300">({review.location})</span>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
