import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SliderControls } from "./Slider";

export default function ProductsCarousel({ title, link, imgs, lastInd }) {
  const [activeInd, setActiveInd] = useState(0);

  const swiperProps = {
    spaceBetween: 40,
    slidesPerView: 1,
    breakpoints: {
      480: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
    scrollbar: { hide: false },
    modules: [Navigation, Scrollbar],
    navigation: { nextEl: "#next-slide", prevEl: "#prev-slide" },
    onTransitionEnd: (e) => setActiveInd(e.realIndex),
  };

  return (
    <div className="w-full bg-white px-4 md:px-8 space-y-10 relative">
      <div
        href={link}
        className="font-bold text-[18px] sm:text-[22px] py-4 text-center sm:text-left"
      >
        {title}
      </div>
      <Swiper {...swiperProps} className="swiper-container">
        {imgs.map((src, i) => (
          <SwiperSlide key={i} className="swiper-slide ">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg ">
              <img
                src={src}
                alt={"product" + i}
                className="w-full h-72 sm:h-60 object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
        <SliderControls
          lastInd={lastInd}
          activeInd={activeInd}
          className="!px-0 slider-controls-disabled "
        />
      </Swiper>
    </div>
  );
}
