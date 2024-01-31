import clsx from "clsx";
import { useContext, useState } from "react";

import { MenuIconSVG } from "@/assets/icons/menu-icon";
import { ConfirmContext } from "@/components/common/confirm/confirm-context";
import { useApiDeletePost } from "@/hooks/api/detail/useApiDeletePost";
import { TMarbleCard } from "@/types/archive";

type Props = {
  cardData: TMarbleCard;
};

export const MarbleCard = ({ cardData }: Props) => {
  const { confirm } = useContext(ConfirmContext);
  const { mutate: deletePost } = useApiDeletePost();
  const [isShowDeleteBtn, setIsShowDeleteBtn] = useState<boolean>(false);

  const onClickMenu = async () => {
    if (!cardData) return;
    setIsShowDeleteBtn(false);

    const result = await confirm({
      message: {
        title: "칭찬게시물을 삭제할까요?",
        description: "게시물과 쌓인 반응이 모두 삭제돼요.",
      },
      confirm: {
        text: "삭제",
      },
      cancel: {
        text: "취소",
      },
    });

    // TODO: Error handling
    if (!result) return;
    deletePost(cardData.postId);
  };

  if (!cardData) return null;
  const { content, imageUrl, keyword, postCreatedDate, userNickname } =
    cardData;

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-gray-100 p-4 pt-5">
      <div className="relative flex justify-between">
        <div className="flex flex-col gap-0.5 text-lg text-gray-700">
          <p>{userNickname}님이 칭찬 받을</p>
          <p>
            <span className="font-semibold text-gray-800">{keyword}</span>
            <span> 순간</span>
          </p>
        </div>
        <button
          className="h-6 w-6"
          onClick={() => setIsShowDeleteBtn(!isShowDeleteBtn)}
        >
          <MenuIconSVG />
        </button>

        {isShowDeleteBtn && (
          <button
            className="absolute right-0 top-[30px] z-10 h-fit w-fit rounded-3 bg-white px-4 py-3 text-secondary"
            onClick={onClickMenu}
          >
            삭제하기
          </button>
        )}
      </div>

      <div
        className={clsx(
          "after:block after:pb-[calc(100%)]",
          "relative box-border w-full rounded-xl",
        )}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute flex h-full w-full flex-col justify-end gap-2 p-18px text-white">
          <p
            dangerouslySetInnerHTML={{
              __html: content.replace(/\\n/g, "<br/>"),
            }}
          />
          <p className="text-sm">
            {postCreatedDate.split("-").join(".").slice(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
