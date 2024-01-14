import { Children } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "@/style/swiper/mainSwiper.css";

import { Pagination } from "swiper/modules";

interface SliderProps {
  children: React.ReactNode;
}

export const CardSwiper = ({ children }: SliderProps) => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className=" h-full w-full"
        id="card-swiper"
      >
        {Children.map(children, (child, i) => (
          <SwiperSlide key={i}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
