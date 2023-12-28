import { ButtonProps, FilledButton } from "./FilledButton";

type DoubleButtonProps = {
  mainButton: ButtonProps;
  subButton: ButtonProps;
};

/** 더블 버튼 컴포넌트, 메인 버튼(mainButton)과 서브 버튼(subButton)을 필요로 합니다. */
export const DoubleButton = ({ mainButton, subButton }: DoubleButtonProps) => {
  return (
    <div className="w-360px flex h-146px flex-col gap-y-2 px-20px pb-32px pt-12px">
      <FilledButton className="bg-[#242B37] text-white" {...mainButton} />
      <FilledButton className="bg-white text-blue-500" {...subButton} />
    </div>
  );
};
