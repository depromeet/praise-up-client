import clsx from "clsx";
import { ButtonHTMLAttributes, RefObject, useEffect } from "react";

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

  return (
    <button
      {...props}
      className={clsx(
        "fixed bottom-[36px] right-[20px] flex w-fit items-center justify-center gap-1 overflow-hidden rounded-[100px] bg-white px-2.5 py-2 shadow",
        className,
      )}
    >
      <div className="h-[24px] w-[24px]">
        <img src={icon} />
      </div>
      <p
        className={clsx(
          "text-sm font-semibold text-gray-800 transition-all",
          isOverflow && "hidden",
        )}
      >
        {text}
      </p>
    </button>
  );
};
