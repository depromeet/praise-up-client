import { useState } from "react";

import { Button } from "./button";
import { CountBadge } from "./count-badge";

import * as BackgroundSVG from "@/assets/card-background";
import { ShareSVG } from "@/assets/share";
import { useTimer } from "@/hooks/useTimer";

type PostCardType = {
  keyword: string;
  count: number;
  openDatetime: Date;
};

// 배경 이미지와 어두운 배경 이미지의 인덱스(키워드 색상이 상이)
const BACKGROUNDS = [...Object.values(BackgroundSVG).sort()];
const DARK_BACKGROUNDS = [2, 4];

export const RecentCard = (props: PostCardType) => {
  const [idx, setIdx] = useState<number>(Math.floor(Math.random() * 11));
  const { hour, min, sec } = useTimer(props.openDatetime);

  return (
    <div className="flex flex-col items-center gap-4 rounded-4 bg-white p-4">
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
            {props.keyword}
          </h2>
          <CountBadge count={props.count} />
        </div>
        <div className="flex items-center justify-center gap-0.5 rounded-3 bg-[#ffffffcc] px-6 py-4 text-gray-800 backdrop-blur-[10px] ">
          <span className="text-num-b2-strong">
            {hour}:{min}:{sec}
          </span>
          <span className="text-b3-compact">이후 반응을 볼 수 있어요</span>
        </div>
      </div>
      <div className="flex w-full items-start justify-center gap-2">
        <button className="aspect-square rounded-2 bg-gray-300 p-[15px]">
          <ShareSVG />
        </button>
        <button
          className="grow-1 flex w-full items-center justify-center rounded-2 bg-[#242B37] px-[52px] py-4 text-white"
          onClick={() => console.log("클릭됨")}
        >
          게시물 보기
        </button>
      </div>
    </div>
  );
};
