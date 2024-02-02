import { useNavigate } from "react-router-dom";

import { ShareSVG } from "@/assets/icons/share";
import { ButtonProvider } from "@/components/common/button-provider";
import { toast } from "@/helpers/toast";
import { UseCurrentLinkCopy } from "@/hooks/useCurrentLinkCopy";
import { handleIllust } from "@/utils/handleIllust";

interface LinkAndGoButtonProps {
  postId: number;
  visible: boolean;
  backgroundUrl: string;
}

export const LinkAndGoButton = ({
  postId,
  visible,
  backgroundUrl,
}: LinkAndGoButtonProps) => {
  const navigate = useNavigate();

  const handleShare = () => {
    UseCurrentLinkCopy(postId);
    toast("링크가 복사되었어요");
  };

  return (
    <div className="flex w-full items-start justify-center gap-2">
      {!visible ? (
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
            onClick={() =>
              navigate(`/seal/${postId}`, { state: { backgroundUrl } })
            }
          >
            게시물 보기
          </ButtonProvider.Primary>
        </>
      ) : (
        <ButtonProvider.Primary
          className="flex items-center justify-center"
          onClick={() => {
            handleIllust.remove(postId);
            navigate(`/archive`, { state: { postId } });
          }}
        >
          칭찬구슬 보러가기
        </ButtonProvider.Primary>
      )}
    </div>
  );
};
