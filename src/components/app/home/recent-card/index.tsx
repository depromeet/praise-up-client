import { useEffect, useState } from "react";

import { LinkAndGoButton } from "./link-and-go-button";
import { TimerBadge } from "./timer-badge";

import * as BackgroundSVG from "@/assets/imgs/card-background";
import { CountBadge } from "@/components/app/home/count-badge";
import { handleIllust } from "@/utils/handleIllust";

interface RecentCardProps {
  postId: number;
  keyword: string;
  commentCount: number;
  postCreatedDate: string;
  postCreatedTime: string;
  openDateTime?: Date;
}

// 어두운 배경 이미지의 인덱스 추출 for 상이한 키워드 색상
const BACKGROUNDS = [...Object.values(BackgroundSVG).sort()];
const DARK_BACKGROUNDS = [2, 4, 10, 11];

export const RecentCard = ({
  postId,
  keyword,
  commentCount,
  openDateTime,
}: RecentCardProps) => {
  const illustId = handleIllust.get(postId);

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-4 bg-white p-4">
      <div
        className="flex aspect-square w-full flex-col justify-between rounded-3 bg-cover bg-no-repeat p-[18px] opacity-[.88]"
        style={{
          backgroundImage: `url(${BACKGROUNDS[illustId]})`,
        }}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`text-h2 text-gray-700 ${
              DARK_BACKGROUNDS.includes(illustId)
                ? "text-white"
                : "text-secondary"
            }`}
          >
            {keyword}
          </h2>
          <CountBadge count={commentCount} />
        </div>
        <TimerBadge openDatetime={openDateTime ?? new Date()} />
      </div>
      <LinkAndGoButton
        postId={postId}
        openDateTime={openDateTime ?? new Date()}
        backgroundUrl={BACKGROUNDS[illustId]}
      />
    </div>
  );
};
