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
  const { isOverflow } = useWindowScrollY({ point: 0.3, scrollRef });

  useEffect(() => {
    console.log(isOverflow);
  }, [isOverflow]);

  return (
    <button
      {...props}
      className={clsx(
        "fixed bottom-[36px] right-[20px] flex items-center justify-center gap-1 rounded-[100px] bg-white px-2.5 py-2 shadow",
        className,
      )}
    >
      <div className="h-[24px] w-[24px]">
        <img src={icon} />
      </div>

      <p
        className={clsx(
          "visible text-sm font-semibold text-gray-800",
          isOverflow && "invisible",
        )}
      >
        {text}
      </p>
    </button>
  );
};
