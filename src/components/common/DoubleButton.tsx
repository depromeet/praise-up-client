interface ButtonProps {
  positiveText: string;
  negativeText: string;
  positiveClick?: React.MouseEventHandler<HTMLButtonElement>;
  negativeClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const DoubleButton = ({
  positiveText,
  negativeText,
  positiveClick,
  negativeClick,
}: ButtonProps) => {
  return (
    <div className="w-360px flex h-146px flex-col gap-y-2 px-20px pb-32px pt-12px">
      <button
        type="button"
        className="flex h-54px w-full items-center justify-center rounded-2 border bg-[#242B37] py-16px font-semibold text-white"
        onClick={positiveClick}
      >
        {positiveText}
      </button>
      <button
        type="button"
        className="flex h-54px w-full items-center justify-center rounded-2 bg-white py-16px font-semibold text-blue-500"
        onClick={negativeClick}
      >
        {negativeText}
      </button>
    </div>
  );
};
