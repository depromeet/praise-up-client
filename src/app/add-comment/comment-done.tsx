import { CSSProperties } from "react";
// import CommentDoneSVG from "@/assets/imgs/comment_done.svg?react";
import { useNavigate } from "react-router-dom";

import CloseSVG from "@/assets/icons/close.svg?react";
import CommentDonePNG from "@/assets/imgs/comment_done.png";
import { ButtonProvider } from "@/components/common/button-provider";
import { Header } from "@/components/common/header";
import Confetti from "@/hooks/useConfetti";

export const CommentDoneView = ({
  transition,
}: {
  transition: CSSProperties | null;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="absolute left-[100%] top-0 z-20 flex min-h-[100dvh] w-screen max-w-[480px] flex-1 flex-col justify-center bg-white px-4 pt-4 shadow"
      style={transition ?? {}}
    >
      {transition && <Confetti />}
      <div className="flex flex-1 flex-col justify-center gap-[99px]">
        <div className="absolute left-0 top-0 flex h-[64px] w-full bg-white px-5 py-2.5 ">
          <button onClick={() => navigate("/")}>
            <CloseSVG />
          </button>
        </div>
        <Header
          className="text-center"
          text={
            "{칭찬 구슬을 보냈어요!}\\n{칭찬게시물을 남겨 칭찬 구슬을 모아보세요}"
          }
        />
        <div className="flex items-center justify-center">
          {/* <CommentDoneSVG className="align-center" /> */}
          <img src={CommentDonePNG} className="h-[285px] w-[285px]" />
        </div>
      </div>
      <ButtonProvider>
        <ButtonProvider.Primary onClick={() => navigate("/")}>
          나의 칭찬 게시물 작성하기
        </ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
};
