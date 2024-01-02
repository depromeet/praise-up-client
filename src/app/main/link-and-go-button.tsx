import { useState, useEffect } from "react";

import { ShareSVG } from "@/assets/share";
import { useTimer } from "@/hooks/useTimer";

interface LinkAndGoButtonProps {
  openDatetime: string;
}

export const LinkAndGoButton = ({ openDatetime }: LinkAndGoButtonProps) => {
  const [isReveal, setIsReveal] = useState<boolean>(
    new Date(openDatetime).getTime() - Date.now() > 0,
  );

  const { diff } = useTimer(openDatetime);

  useEffect(() => {
    setIsReveal(diff > 0);
  }, [diff]);

  return (
    <div className="flex w-full items-start justify-center gap-2">
      {isReveal ? (
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
  );
};
