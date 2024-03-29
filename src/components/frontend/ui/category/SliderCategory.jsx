"use client";
import {
  Navigation,
  Scrollbar,
  A11y,
  Keyboard,
  Parallax,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import CategoryProductCard from "./CategoryProductCard";

const SliderCategory = ({ products }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Scrollbar, A11y, Keyboard, Parallax, Autoplay]}
        slidesPerView={2}
        spaceBetween={2}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
        speed={700}
        parallax={true}
        loop={true}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
          reverseDirection: true,
        }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        onSwiper={() => {}}
        onSlideChange={() => {}}
      >
        {products?.map((product) => (
          <SwiperSlide
            key={product?._id}
            className="group bg-white transition-all duration-1000 rounded-md min-h-[280px] border hover:border-secondary"
          >
            <CategoryProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SliderCategory;
