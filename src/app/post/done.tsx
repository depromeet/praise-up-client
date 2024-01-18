import { useNavigate } from "react-router-dom";

import Close from "@/assets/icons/close.svg?react";
import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { DoneContainer } from "@/components/app/post/done/DoneContainer";
import { Appbar } from "@/components/common/appbar";
import { ButtonProvider } from "@/components/common/button-provider";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";

export const Done = () => {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <Appbar
        left={
          <Close className="cursor-pointer" onClick={() => navigate("/main")} />
        }
      />
      <ArticleWrapper>
        <Header
          text="게시글 작성이 완료되었어요!\n게시글을 공유해 칭찬 구슬을 모아보세요"
          className="!text-h3 text-center"
        />
        <DoneContainer />
      </ArticleWrapper>
      <ButtonProvider>
        <ButtonProvider.Primary>링크 공유하고 칭찬 받기</ButtonProvider.Primary>
        <ButtonProvider.White>다음에 할게요</ButtonProvider.White>
      </ButtonProvider>
    </DefaultLayout>
  );
};
