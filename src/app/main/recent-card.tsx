import { useState } from "react";

import { CountBadge } from "./count-badge";
import { TimerBadge } from "./timer-badge";

import * as BackgroundSVG from "@/assets/card-background";
import { ShareSVG } from "@/assets/share";

interface RecentCardProps {
  keyword: string;
  count: number;
  openDatetime: string;
}

// 어두운 배경 이미지의 인덱스 추출 for 상이한 키워드 색상
const BACKGROUNDS = [...Object.values(BackgroundSVG).sort()];
const DARK_BACKGROUNDS = [2, 4, 10, 11];

export const RecentCard = ({
  keyword,
  count,
  openDatetime,
}: RecentCardProps) => {
  const [idx, setIdx] = useState<number>(Math.floor(Math.random() * 11));

  return (
    <div className="flex cursor-move flex-col items-center gap-4 rounded-4 bg-white p-4">
      <div
        className="flex aspect-square w-full flex-col justify-between rounded-3 bg-cover bg-no-repeat p-[18px] opacity-[.88]"
        style={{
          backgroundImage: `url(${BACKGROUNDS[idx]})`,
        }}
      >
        <div className="flex justify-between">
          <h2
            className={`text-h2 text-gray-700 ${
              DARK_BACKGROUNDS.includes(idx) ? "text-white" : "text-gray-700"
            }`}
          >
            {keyword}
          </h2>
          <CountBadge count={count} />
        </div>
        <TimerBadge openDatetime={openDatetime} />
      </div>
      <div className="flex w-full items-start justify-center gap-2">
        {new Date(openDatetime).getTime() - Date.now() > 0 ? (
          <>
            <button className="aspect-square rounded-2 bg-gray-300 p-[15px]">
              <ShareSVG />
            </button>
            <button
              className="grow-1 flex w-full items-center justify-center rounded-2 bg-[#242B37] px-[52px] py-4 text-white"
              onClick={() => console.log("클릭됨")}
            >
              게시물 보기
            </button>
          </>
        ) : (
          <button
            className="grow-1 flex w-full items-center justify-center rounded-2 bg-[#242B37] px-[52px] py-4 text-white"
            onClick={() => console.log("클릭됨")}
          >
            칭찬구슬 보러가기
          </button>
        )}
      </div>
    </div>
  );
};
