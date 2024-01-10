import CommentDoneSVG from "@/assets/imgs/comment_done.svg?react";
import { ButtonProvider } from "@/components/common/button-provider";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";
import Confetti from "@/hooks/useConfetti";

export const CommentDonePage = () => {
  return (
    <DefaultLayout>
      <Confetti />
      <Header
        className="text-center"
        text={
          "{칭찬 구슬을 보냈어요!}\\n{칭찬게시물을 남겨 칭찬 구슬을 모아보세요}"
        }
      />
      <div className="flex h-full flex-col items-center justify-center">
        <CommentDoneSVG className="align-center" />
      </div>
      <ButtonProvider>
        <ButtonProvider.Primary>
          나의 칭찬 게시물 작성하기
        </ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
};
