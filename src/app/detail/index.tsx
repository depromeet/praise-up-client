import clsx from "clsx";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { TimerCardView } from "@/components/app/detail/timer-card-view";
import { Appbar } from "@/components/common/appbar";
import { ButtonProvider } from "@/components/common/button-provider";
import { PostCardView } from "@/components/common/post-card-view";
import { DefaultLayout } from "@/components/layout/default";
import { toast } from "@/helpers/toast";
import { useApiGetOnePost } from "@/hooks/api/detail/useApiGetOnePost";
import Confetti from "@/hooks/useConfetti";
import { UseCurrentLinkCopy } from "@/hooks/useCurrentLinkCopy";
import { useTimer } from "@/hooks/useTimer";

export const DetailPage = () => {
  const { postId } = useParams();
  const { data } = useApiGetOnePost(postId);
  const [openTime, setOpenTime] = useState<Date>(new Date());
  const {
    state: { backgroundUrl },
  } = useLocation() as { state: { backgroundUrl: string } };
  const navigate = useNavigate();
  const { timeLeft, diff } = useTimer(openTime);

  useEffect(() => {
    const [date, time] = data.postCreatedTime.split("T");
    const [year, month, day] = date.split("-");
    const [hour, minute, _] = time.split(":");

    const openTime = new Date(+year, +month - 1, +day, +hour, +minute + 30);
    setOpenTime(openTime);
  }, [data]);

  if (!postId) return;

  const handleShare = () => {
    void UseCurrentLinkCopy(+postId);
    toast("링크가 복사되었어요");
  };

  return (
    <DefaultLayout
      appbar={
        <Appbar
          left={
            <button onClick={() => navigate(-1)}>
              <ChevronLeftEdgeSVG />
            </button>
          }
        />
      }
    >
      <div className="flex flex-col gap-9">
        <h2 className="text-h2">공개 예정 칭찬게시물</h2>
        {diff <= 0 && <Confetti />}
        <div
          className={clsx(
            diff <= 0 && "animate-[fadeOutUp_1s]",
            "flex flex-col gap-3",
          )}
        >
          <TimerCardView diff={diff} timeLeft={timeLeft} />
          <div className="perspective-1000 animate-fadeInUp bg-transparent ">
            <div className="[transform-style: preserve-3d] relative">
              <PostCardView {...{ ...data, postId: +postId }} isReadyCard>
                <PostCardView.Title />
                <PostCardView.Preview imageUrl={backgroundUrl} />
              </PostCardView>
              <PostCardView {...{ ...data, postId: +postId }}>
                <PostCardView.Title />
                <PostCardView.Image />
              </PostCardView>
            </div>
          </div>
        </div>
      </div>
      <ButtonProvider>
        {diff < 0 ? (
          <ButtonProvider.Primary
            onClick={() => navigate("/archive", { state: { postId } })}
          >
            칭찬 구슬 보러가기
          </ButtonProvider.Primary>
        ) : (
          <ButtonProvider.Primary onClick={() => handleShare()}>
            링크 공유하고 칭찬 받기
          </ButtonProvider.Primary>
        )}
      </ButtonProvider>
    </DefaultLayout>
  );
};
