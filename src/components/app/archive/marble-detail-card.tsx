import { useContext } from "react";

import Overflow from "@/assets/icons/overflow.svg?react";
import { ConfirmContext } from "@/components/common/confirm/confirm-context";

export const MarbleDetailCard = () => {
  const { confirm } = useContext(ConfirmContext);

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
    <div className="mx-[20px] flex flex-col justify-center gap-4 self-stretch rounded-2xl bg-marble-detail bg-cover px-4 pb-5 pt-4 text-primary">
      <div className="relative box-border w-full rounded-xl bg-black after:block after:pb-[calc(100%)]">
        <button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={onClickMenu}
          className="absolute right-[16px] top-[14px] h-[24px] w-[24px]"
        >
          <Overflow />
        </button>
      </div>
      <p>
        오늘도 요리한 당신 정말 대단하다
        <br />
        앞으로도 그렇게 열심히 요리길만 걷기를
      </p>
      <p className="flex items-center justify-start gap-1 font-semibold">
        <span className="text-teritary">from.</span>
        <span>태롱이</span>
      </p>
    </div>
  );
};
