import { forwardRef, useContext, useEffect, useState } from "react";

import Overflow from "@/assets/icons/overflow.svg?react";
import { ConfirmContext } from "@/components/common/confirm/confirm-context";
import { useApiMarbleComments } from "@/hooks/api/archive/useApiMarbleComments";
import { TMarble } from "@/types/archive";

type Props = {
  marble: TMarble;
  onDeleteMarble: () => void;
};

const urlToBase64 = (url: string) => {
  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result ?? "") as string);
      reader.readAsDataURL(xhr.response as Blob);
    };
    xhr.onerror = () => reject(new Error("Error on converting image"));
    xhr.responseType = "blob";
    xhr.open("GET", url);
    xhr.send();
  });
};

export const MarbleDetailCard = forwardRef<HTMLDivElement, Props>(
  ({ marble, onDeleteMarble }, ref) => {
    const { mutate: deleteComment } = useApiMarbleComments();
    const [src, setSrc] = useState<string>("");

    const { confirm } = useContext(ConfirmContext);
    const { nickname, content, imageUrl, commentId } = marble;

    const [isShowDeleteBtn, setIsShowDeleteBtn] = useState<boolean>(false);

    const onClickMenu = async () => {
      setIsShowDeleteBtn(false);

      const result = await confirm(
        {
          title: "칭찬반응을 삭제할까요?",
          description: "삭제된 칭찬반응은 복구할 수 없어요",
        },
        {
          text: "삭제",
        },
        {
          text: "취소",
        },
      );

      // TODO: Error handling
      if (!result) return;
      onDeleteComment();
    };

    const onDeleteComment = () => {
      deleteComment(commentId, {
        onSuccess: () => {
          onDeleteMarble();
        },
        onError: () => {
          alert("에러가 발생했습니다.");
        },
      });
    };

    useEffect(() => {
      void (async () => {
        try {
          setSrc(await urlToBase64(imageUrl));
        } catch (error) {
          setSrc(imageUrl);
        }
      })();
    }, [imageUrl]);

    // TODO: Add image save button
    return (
      <div
        className="bg-archive-marble-detail mx-[20px] flex flex-col justify-center gap-4 self-stretch rounded-2xl bg-cover px-4 pb-5 pt-4 text-primary"
        style={{
          boxShadow: "0px 0px 20px 0px rgba(36, 43, 55, 0.10)",
        }}
        ref={ref}
      >
        <div className="relative">
          <img
            src={src}
            alt="marble thumbnail"
            className="box-border w-full rounded-xl after:block after:pb-[calc(100%)]"
          />
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => setIsShowDeleteBtn(!isShowDeleteBtn)}
            className="absolute right-[16px] top-[14px] h-[24px] w-[24px]"
          >
            <Overflow />
          </button>

          {isShowDeleteBtn && (
            <button
              className="absolute right-[16px] top-[44px] h-fit w-fit rounded-3 bg-white px-4 py-3 text-secondary"
              onClick={onClickMenu}
            >
              삭제하기
            </button>
          )}
        </div>
        <p
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: content.replace(/\\n/g, "<br/>"),
          }}
        />
        <p className="flex items-center justify-start gap-1 font-semibold">
          <span className="text-teritary">from.</span>
          <span>{nickname}</span>
        </p>
      </div>
    );
  },
);

MarbleDetailCard.displayName = "MarbleDetailCard";
