"use client";
import {
  Navigation,
  Scrollbar,
  A11y,
  Autoplay,
  Keyboard,
  Parallax,
} from "swiper/modules";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import Link from "next/link";
import Image from "next/image";

const Slider = ({ bannerData }) => {
  return (
    <div className="relative rounded-none lg:rounded-2xl overflow-hidden">
      <Swiper
        modules={[Navigation, Scrollbar, A11y, Autoplay, Keyboard, Parallax]}
        slidesPerView={1}
        speed={1000}
        parallax={true}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        keyboard={{ enabled: true }}
        onSwiper={() => {}}
        onSlideChange={() => {}}
      >
        <div data-swiper-parallax-duration="2000">
          {bannerData?.map((slider) => (
            <SwiperSlide key={slider._id}>
              <Link href={slider?.banner_path}>
                <Image
                  width={1080}
                  height={500}
                  loading="lazy"
                  src={slider?.banner_image}
                  className="w-full h-[25vh] md:h-[40vh] lg:h-[50vh] object-fill"
                  alt={"banner image"}
                />
              </Link>
            </SwiperSlide>
          ))}
        </div>
        <div>
          <button className="prev w-7 h-12 absolute top-1/2 left-3 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-600 rounded-tr rounded-br flex items-center justify-center transition-all duration-300">
            <span>
              <FcPrevious className="text-3xl lg:text-4xl p-1 font-light text-white" />
            </span>
          </button>
          <button className="next w-7 h-12 absolute top-1/2 -right-4 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-600 rounded-tl rounded-bl flex items-center justify-center transition-all duration-300">
            <span>
              <FcNext className="text-3xl lg:text-4xl p-1 font-light" />
            </span>
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
