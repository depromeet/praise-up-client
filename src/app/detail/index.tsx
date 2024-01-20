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
import { UseCurrentLinkCopy } from "@/hooks/useCurrentLinkCopy";

export const DetailPage = () => {
  const { postId } = useParams();
  const { data } = useApiGetOnePost(postId);
  const [openDateTime, setOpenDateTime] = useState<Date>();
  const {
    state: { backgroundUrl },
  } = useLocation() as { state: { backgroundUrl: string } };
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;
    const [year, month, day] = data.postCreatedDate.split("-");
    const openDateTime = new Date(+year, +month - 1, +day + 1, 24);

    setOpenDateTime(openDateTime);
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
        <div className="flex flex-col gap-3">
          {!data.visible && (
            <TimerCardView openDateTime={openDateTime ?? new Date()} />
          )}
          <div className="perspective-1000 bg-transparent">
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
        <ButtonProvider.Primary onClick={() => handleShare()}>
          링크 공유하고 칭찬 받기
        </ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
};
