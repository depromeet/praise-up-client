import { Fragment, useState } from "react";

import FirstImg from "@/assets/images/on-boarding/first.svg?react";
import FourthImg from "@/assets/images/on-boarding/fourth.svg?react";
import ThirdImg from "@/assets/images/on-boarding/third.svg?react";
import TwiceImg from "@/assets/images/on-boarding/twice.svg?react";
import { handleKakaoLogin } from "@/components/app/login/kakao/kakao-login";
import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { Background } from "@/components/app/post/keyword/background";
import { ButtonProvider } from "@/components/common/button-provider";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";

/** TODO: 온보딩 화면 공통 컴포넌트로 리팩토링 예정 */
export const OnBoarding = () => {
  const [chapter, setChapter] = useState(0);
  const [angle, setAngle] = useState(0);

  const FirstOnBoarding = () => {
    return (
      <Fragment>
        <ArticleWrapper className="flex flex-col items-center justify-center gap-y-[135px]">
          <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-y-[39px]">
            <FirstImg width={193} height={161} className=" -z-10 w-full" />
            <Header
              text="칭찬으로 소통하는 프레이즈 업에\n오신 것을 환영해요"
              className="!text-h3 w-full text-center"
            />
          </div>
        </ArticleWrapper>
        <ButtonProvider isOnBoarding={true} className="!bg-transparent">
          <ButtonProvider.Primary
            onClick={() => {
              setChapter(1);
              setAngle(90);
            }}
          >
            시작하기
          </ButtonProvider.Primary>
        </ButtonProvider>
      </Fragment>
    );
  };

  const TwiceOnBoarding = () => {
    return (
      <Fragment>
        <ArticleWrapper className="flex flex-col items-center justify-center gap-y-[135px]">
          <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-y-[50px]">
            <div className="flex h-[300px] items-center justify-center">
              <TwiceImg
                width={352}
                height={281}
                className="-z-10 h-auto w-full"
              />
            </div>
            <div className="mb-[66px] flex w-full justify-center">
              <Header
                text="칭찬 받고 싶은 일상을 공유하고\n칭찬을 주고받으세요"
                className="!text-h3 text-center"
              />
            </div>
          </div>
        </ArticleWrapper>
        <ButtonProvider className="!bg-transparent">
          <ButtonProvider.Primary
            onClick={() => {
              setChapter(2);
              setAngle(180);
            }}
          >
            다음
          </ButtonProvider.Primary>
        </ButtonProvider>
      </Fragment>
    );
  };

  const ThirdOnBoarding = () => {
    return (
      <Fragment>
        <ArticleWrapper className="flex flex-col justify-center gap-y-[135px]">
          <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-y-[50px]">
            <div className="flex h-[300px] items-center justify-center">
              <ThirdImg width={327} height={280} className="-z-10 w-full" />
            </div>
            <div className="mb-[66px] flex w-full justify-center">
              <Header
                text="다음 날 자정에 게시물에 달린\n 칭찬 구슬을 확인하세요"
                className="!text-h3 text-center"
              />
            </div>
          </div>
        </ArticleWrapper>
        <ButtonProvider className="!bg-transparent">
          <ButtonProvider.Primary
            onClick={() => {
              setChapter(3);
              setAngle(270);
            }}
          >
            다음
          </ButtonProvider.Primary>
        </ButtonProvider>
      </Fragment>
    );
  };

  const FourthOnBoarding = () => {
    return (
      <Fragment>
        <ArticleWrapper className="flex flex-col items-center justify-center gap-y-[135px]">
          <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-y-[50px]">
            <div className="flex h-[300px] items-center justify-center">
              <FourthImg width={320} height={324} className="-z-10" />
            </div>
            <div className="mb-[66px] flex w-full justify-center">
              <Header
                text="첫 번째 칭찬 게시물을\n작성하러 가볼까요?"
                className="!text-h3 text-center"
              />
            </div>
          </div>
        </ArticleWrapper>
        <ButtonProvider className="!bg-transparent">
          <ButtonProvider.Primary
            onClick={handleKakaoLogin}
            className="bg-[#FEE500] !text-primary"
          >
            카카오 계정으로 계속하기
          </ButtonProvider.Primary>
        </ButtonProvider>
      </Fragment>
    );
  };

  return (
    <DefaultLayout className="overflow-hidden">
      <Background angle={angle} />
      {chapter === 0 && <FirstOnBoarding />}
      {chapter === 1 && <TwiceOnBoarding />}
      {chapter === 2 && <ThirdOnBoarding />}
      {chapter === 3 && <FourthOnBoarding />}
    </DefaultLayout>
  );
};
