import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ThirdImg from "@/assets/images/on-boarding/clap/third.svg";
import TwiceImg from "@/assets/images/on-boarding/clap/twice.svg";
import FirstImg from "@/assets/images/on-boarding/twice.svg";
import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { Header } from "@/components/common/header";

import "@/style/swiper/on-boarding.scss";

type carouselProps = {
  setAngle: React.Dispatch<React.SetStateAction<number>>;
  userNickname: string;
};

/** TODO: 추후 코드 리팩토링 진행 필요 */
export const Carousel = ({ setAngle, userNickname }: carouselProps) => {
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
        <ArticleWrapper className="absolute z-0 flex h-full w-full flex-col justify-center">
          {/* <FirstImg width={352} height={281} className="w-full" /> */}
          <div className="flex h-[30%] items-center justify-center">
            <img
              src={FirstImg}
              className="h-[281px] w-[352px]"
              alt="첫번째 캐러셀 이미지"
            />
          </div>
          <Header
            text={`${userNickname}님의 게시물에\\n칭찬 구슬을 남기러 오셨군요!`}
            className="!text-h3 z-10 mt-3 text-center"
          />
        </ArticleWrapper>
      </SwiperSlide>
      <SwiperSlide>
        <ArticleWrapper className="z-0 flex h-full w-full flex-col justify-center">
          {/* <TwiceImg className="w-auto" width={357} height={360} /> */}
          <div className="flex h-[30%] items-center justify-center">
            <img
              src={TwiceImg}
              className="mb-10 h-[360px] w-[357px] px-17px"
              alt="두번째 캐러셀 이미지"
            />
          </div>
          <Header
            text={`${userNickname}님이 칭찬 받을\\n오늘의 순간을 확인해보세요`}
            className="!text-h3 z-10 mt-3 text-center"
          />
        </ArticleWrapper>
      </SwiperSlide>
      <SwiperSlide>
        <ArticleWrapper className="z-0 flex h-full w-full flex-col justify-center">
          {/* <ThirdImg width={267} height={306} className="w-auto" /> */}
          <div className="flex h-[30%] items-center justify-center">
            <img
              src={ThirdImg}
              className="h-[306px] w-[267px]"
              alt="세번째 캐러셀 이미지"
            />
          </div>
          <Header
            text="칭찬을 담은 이미지와 메시지를\n 전달해보세요!"
            className="!text-h3 z-10 mt-3 text-center"
          />
        </ArticleWrapper>
      </SwiperSlide>
    </Swiper>
  );
};
