import { Children } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/pagination";
import "@/style/swiper/main.scss";

interface SliderProps {
  children: React.ReactNode;
}

export const CardSwiper = ({ children }: SliderProps) => {
  return (
    <div className="main-swiper">
      <Swiper
        spaceBetween={8}
        pagination={{
          dynamicBullets: (children as SliderProps[]).length > 5 ? true : false,
        }}
        modules={[Pagination]}
      >
        {Children.map(children, (child, i) => (
          <SwiperSlide key={i}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
