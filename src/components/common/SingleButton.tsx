import { ButtonProps, FilledButton } from "./FilledButton";

type SingleButtonProps = {
  mainButton: ButtonProps;
};

/** 싱글 버튼 컴포넌트, 메인 버튼(mainButton)을 필요로 합니다. */
export const SingleButton = ({ mainButton }: SingleButtonProps) => {
  return (
    <div className="w-360px h-98px px-20px pb-32px pt-12px">
      <FilledButton {...mainButton} />
    </div>
  );
};
