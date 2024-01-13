import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ShareSVG } from "@/assets/icons/share";
import { ButtonProvider } from "@/components/common/button-provider";
import { useTimer } from "@/hooks/useTimer";

interface LinkAndGoButtonProps {
  id: string;
  openDatetime: string;
  backgroundUrl: string;
}

export const LinkAndGoButton = ({
  id,
  openDatetime,
  backgroundUrl,
}: LinkAndGoButtonProps) => {
  const navigate = useNavigate();
  const [isReveal, setIsReveal] = useState<boolean>(
    new Date(openDatetime).getTime() - Date.now() > 0,
  );

  const { diff } = useTimer(openDatetime);

  useEffect(() => {
    setIsReveal(diff >= 0);
  }, [diff]);

  return (
    <div className="flex w-full items-start justify-center gap-2">
      {isReveal ? (
        <>
          <button
            className="aspect-square rounded-2 bg-gray-300 p-[15px]"
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
          >
            <ShareSVG />
          </button>
          <ButtonProvider.Primary
            className="flex items-center justify-center "
            onClick={() => navigate(`seal/${id}`, { state: { backgroundUrl } })}
          >
            게시물 보기
          </ButtonProvider.Primary>
        </>
      ) : (
        <ButtonProvider.Primary
          className="flex items-center justify-center"
          onClick={() => navigate(`seal/${123}`, { state: { backgroundUrl } })}
        >
          칭찬구슬 보러가기
        </ButtonProvider.Primary>
      )}
    </div>
  );
};
