import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ShareSVG } from "@/assets/icons/share";
import { ButtonProvider } from "@/components/common/button-provider";
import { toast } from "@/helpers/toast";
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

  const handleShare = () => {
    // TODO: 클립보드에 링크 복사하기
    toast("링크가 복사되었어요", { scroll: true });
  };

  return (
    <div className="flex w-full items-start justify-center gap-2">
      {isReveal ? (
        <>
          <button
            className="aspect-square rounded-2 bg-gray-300 p-[15px]"
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onClick={() => handleShare()}
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
