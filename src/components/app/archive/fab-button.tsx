import clsx from "clsx";
import { ButtonHTMLAttributes, RefObject, useMemo } from "react";

import { useWindowScrollY } from "@/hooks/useWindowScrollY";

type Props = {
  icon: string;
  text: string;
  className?: string;
  scrollRef: RefObject<HTMLDivElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const FABButton = ({
  icon,
  text,
  className,
  scrollRef,
  ...props
}: Props) => {
  const { isOverflow } = useWindowScrollY({ point: 1, scrollRef });
  const addAfterStyle = useMemo(
    () =>
      text.length &&
      `after:content-['${text}'] after:absolute after:-right-3 after:top-[2px] after:h-fit after:opacity-0 after:duration-300`,
    [text],
  );

  if (!text.length) return;
  return (
    <button
      {...props}
      className={clsx(
        "fixed bottom-[36px] right-[20px] flex w-fit justify-center overflow-hidden rounded-[100px] bg-white px-2.5 py-2 shadow",
        className,
      )}
    >
      <div
        className={clsx(
          addAfterStyle,
          "relative inline-block overflow-hidden text-sm font-semibold text-gray-800 transition-all duration-300",
          isOverflow && "pr-[53px] after:right-0 after:opacity-100",
        )}
      >
        <div className="h-[24px] w-[24px]">
          <img src={icon} />
        </div>
      </div>
    </button>
  );
};
