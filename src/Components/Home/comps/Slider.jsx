import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { slider_imgs } from "../data";

const swiperProps = {
  loop: true,
  slidesPerView: 1,
  speed: 1000,
  grabCursor: false,
  allowTouchMove: true,
  modules: [Navigation, Autoplay],
  navigation: { nextEl: "#next-slide", prevEl: "#prev-slide" },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
};

export default function Slider() {
  return (
    <Swiper {...swiperProps} className="h-[60vh] relative">
      {slider_imgs.map((src, i) => (
        <SwiperSlide key={i}>
          <img
            src={src}
            className="w-full h-full bg-center object-cover"
            alt={"slider" + i}
          />
        </SwiperSlide>
      ))}
      {/* navigation controls btns */}
      <SliderControls />
    </Swiper>
  );
}

export const SliderControls = ({ className="", lastInd, activeInd }) => {
  return (
    <div
      className={
        "sm:flex hidden w-full px-20 z-50 top-1/2 -translate-y-1/2 justify-between absolute " +
        className
      }
    >
      <button
        id="prev-slide"
        className={activeInd === 0 ? "opacity-35" : "opacity-100"}
      >
        <img src="left-arrow.svg" alt="left" />
      </button>
      <button
        id="next-slide"
        className={
          activeInd && activeInd === lastInd ? "opacity-35" : "opacity-100"
        }
      >
        <img src="right-arrow.svg" alt="right" />
      </button>
    </div>
  );
};
