import { useLocation, useNavigate } from "react-router-dom";

import Close from "@/assets/icons/close.svg?react";
import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { DoneContainer } from "@/components/app/post/done/DoneContainer";
import { Appbar } from "@/components/common/appbar";
import { ButtonProvider } from "@/components/common/button-provider";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";
import { toast } from "@/helpers/toast";
import { UseCurrentLinkCopy } from "@/hooks/useCurrentLinkCopy";

type postProps = {
  postId: number;
};

export const Done = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as postProps;

  const handleShare = () => {
    // TODO: 클립보드에 링크 복사하기
    void UseCurrentLinkCopy(state.postId);
    toast("링크가 복사되었어요");
  };

  return (
    <DefaultLayout
      appbar={
        <Appbar
          left={
            <Close
              className="cursor-pointer"
              onClick={() => navigate("/main")}
            />
          }
        />
      }
    >
      <ArticleWrapper>
        <Header
          text="게시글 작성이 완료되었어요!\n게시글을 공유해 칭찬 구슬을 모아보세요"
          className="!text-h3 text-center"
        />
        <DoneContainer />
      </ArticleWrapper>
      <ButtonProvider>
        <ButtonProvider.Primary onClick={handleShare}>
          링크 공유하고 칭찬 받기
        </ButtonProvider.Primary>
        <ButtonProvider.White onClick={() => navigate("/main")}>
          다음에 할게요
        </ButtonProvider.White>
      </ButtonProvider>
    </DefaultLayout>
  );
};
