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

export const OnBoarding = () => {
  const [chapter, setChapter] = useState(0);
  const [angle, setAngle] = useState(0);

  const FirstOnBoarding = () => {
    return (
      <Fragment>
        <ArticleWrapper className="flex flex-col items-center justify-center gap-y-[135px]">
          <Header
            text="praise up에 오신 것을\n환영해요"
            className="!text-h3 text-center"
          />
          <FirstImg width={193} height={161} />
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
          <Header
            text="칭찬 게시물을 작성하고\n칭찬 구슬을 모아보세요"
            className="!text-h3 text-center"
          />
          <TwiceImg width={360} height={401} />
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
        <ArticleWrapper className="flex flex-col items-center justify-center gap-y-[135px]">
          <Header
            text="다음 날 자정에 게시물에 달린\n 칭찬 구슬을 확인하세요"
            className="!text-h3 text-center"
          />
          <ThirdImg width={327} height={280} />
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
          <Header
            text="첫 번째 칭찬 게시물을\n작성하러 가볼까요?"
            className="!text-h3 text-center"
          />
          <FourthImg width={320} height={324} />
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
    <DefaultLayout className="overflow-x-hidden">
      <Background angle={angle} />
      {chapter === 0 && <FirstOnBoarding />}
      {chapter === 1 && <TwiceOnBoarding />}
      {chapter === 2 && <ThirdOnBoarding />}
      {chapter === 3 && <FourthOnBoarding />}
    </DefaultLayout>
  );
};
