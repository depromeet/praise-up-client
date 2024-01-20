import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { TimerCardView } from "./timer-card-view";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { Appbar } from "@/components/common/appbar";
import { ButtonProvider } from "@/components/common/button-provider";
import { PostCardView } from "@/components/common/post-card-view";
import { DefaultLayout } from "@/components/layout/default";
import { toast } from "@/helpers/toast";
import { useApiGetOnePost } from "@/hooks/api/unpublished-post/useApiGetOnePost";
import { UseCurrentLinkCopy } from "@/hooks/useCurrentLinkCopy";

export const UnpublishedPostPage = () => {
  const { id } = useParams();
  const { data } = useApiGetOnePost(id);
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

  const handleShare = () => {
    if (!id) return;
    void UseCurrentLinkCopy(+id);
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
              <PostCardView {...data} isReadyCard>
                <PostCardView.Title />
                <PostCardView.Preview imageUrl={backgroundUrl} />
              </PostCardView>
              <PostCardView {...data}>
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
