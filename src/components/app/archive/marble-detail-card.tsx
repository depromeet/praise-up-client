import { useContext } from "react";

import Overflow from "@/assets/icons/overflow.svg?react";
import { ConfirmContext } from "@/components/common/confirm/confirm-context";
import { TMarble } from "@/types/archive";

type Props = {
  marble: TMarble;
};

export const MarbleDetailCard = ({ marble }: Props) => {
  const { confirm } = useContext(ConfirmContext);
  const { nickname, content, imageUrl } = marble;

  const onClickMenu = async () => {
    const result = await confirm(
      {
        title: "칭찬반응을 삭제할까요?",
        description: "삭제된 칭찬반응은 복구할 수 없어요.",
      },
      {
        text: "삭제",
      },
      {
        text: "취소",
      },
    );

    // TODO: delete action
    // TODO: Error handling
    console.log(result);
  };

  // TODO: Add image save button
  return (
    <div className="bg-archive-marble-detail mx-[20px] flex flex-col justify-center gap-4 self-stretch rounded-2xl bg-cover px-4 pb-5 pt-4 text-primary">
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
        }}
        className="relative box-border w-full rounded-xl after:block after:pb-[calc(100%)]"
      >
        <button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={onClickMenu}
          className="absolute right-[16px] top-[14px] h-[24px] w-[24px]"
        >
          <Overflow />
        </button>
      </div>
      <p className="whitespace-pre-wrap">{content}</p>
      <p className="flex items-center justify-start gap-1 font-semibold">
        <span className="text-teritary">from.</span>
        <span>{nickname}</span>
      </p>
    </div>
  );
};
