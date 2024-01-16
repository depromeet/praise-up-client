import { Children } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/pagination";
import "@/style/swiper/main.scss";

import { Pagination } from "swiper/modules";

interface SliderProps {
  children: React.ReactNode;
}

export const CardSwiper = ({ children }: SliderProps) => {
  return (
    <div className="main-swiper">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="h-full w-full"
      >
        {Children.map(children, (child, i) => (
          <SwiperSlide key={i}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
