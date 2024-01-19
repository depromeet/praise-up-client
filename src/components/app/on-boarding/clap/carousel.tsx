import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import FirstImg from "@/assets/images/on-boarding/clap/first.svg";
import ThirdImg from "@/assets/images/on-boarding/clap/third.svg";
import TwiceImg from "@/assets/images/on-boarding/clap/twice.svg";
import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { Header } from "@/components/common/header";

import "@/style/swiper/on-boarding.scss";

type carouselProps = {
  setAngle: React.Dispatch<React.SetStateAction<number>>;
};

export const Carousel = ({ setAngle }: carouselProps) => {
  return (
    <Swiper
      slidesPerView={1}
      pagination={true}
      modules={[Pagination]}
      className="!absolute h-full w-full text-center"
      id="onboarding-swiper"
      onSlideChange={(event) => {
        if (event.swipeDirection === "next") {
          setAngle((prevAngle) => prevAngle + 90);
        } else {
          setAngle((prevAngle) => prevAngle - 90);
        }
      }}
    >
      <SwiperSlide>
        <ArticleWrapper
          style={{
            backgroundImage: `url(${FirstImg})`,
            backgroundSize: "cover",
          }}
          className="z-0 h-full w-full"
        >
          <Header
            text="지영님의 게시물에\n칭찬 구슬을 남기러 오셨군요!"
            className="!text-h3 z-10 mt-20 text-center"
          />
        </ArticleWrapper>
      </SwiperSlide>
      <SwiperSlide>
        <ArticleWrapper
          style={{
            backgroundImage: `url(${TwiceImg})`,
            backgroundSize: "contain",
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="z-0 h-full w-full"
        >
          <Header
            text="priase up에 오신 것을\n환영해요"
            className="!text-h3 z-10 mt-20 text-center"
          />
        </ArticleWrapper>
      </SwiperSlide>
      <SwiperSlide>
        <ArticleWrapper
          style={{
            backgroundImage: `url(${ThirdImg})`,
            backgroundSize: "contain",
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            backgroundRepeat: "no-repeat",
            backgroundOrigin: "content-box",
          }}
          className="z-0 h-full w-full px-[46px]"
        >
          <Header
            text="이미지로 칭찬 메세지를 남기고\n칭찬 구슬을 보내보세요!"
            className="!text-h3 z-10 mt-20 text-center"
          />
        </ArticleWrapper>
      </SwiperSlide>
    </Swiper>
  );
};
