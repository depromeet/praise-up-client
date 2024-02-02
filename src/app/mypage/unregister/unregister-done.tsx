import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import FirstImg from "@/assets/images/on-boarding/first.svg?react";
import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { ButtonProvider } from "@/components/common/button-provider";
import { Header } from "@/components/common/header";

export const MyPageUnregisterDone = () => {
  const nav = useNavigate();

  return (
    <Fragment>
      <ArticleWrapper className="flex flex-col items-center justify-center gap-[140px]">
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-y-[39px]">
          <Header
            text="praise up을\n이용해주셔서 감사합니다"
            className="!text-h3 w-full text-center"
          />
          <FirstImg width={193} height={161} className="-z-10 w-full" />
        </div>
      </ArticleWrapper>
      <ButtonProvider isOnBoarding={true} className="!bg-transparent">
        <ButtonProvider.Primary
          onClick={() => {
            nav("/");
          }}
        >
          처음으로 돌아가기
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
};
