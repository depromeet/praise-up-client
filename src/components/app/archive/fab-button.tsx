import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

import { useWindowScrollY } from "@/hooks/useWindowScrollY";

type Props = {
  icon: string;
  text: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const FABButton = ({ icon, text, className, ...props }: Props) => {
  const { isOverflow } = useWindowScrollY({ point: 1 });

  if (!text.length) return;
  return (
    <button
      {...props}
      style={{
        boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.06)",
      }}
      className={clsx(
        "fixed bottom-[36px] right-[20px] flex w-fit justify-center overflow-hidden rounded-[100px] bg-white p-2.5",
        className,
        !isOverflow && "py-2",
      )}
    >
      <div
        style={
          !isOverflow
            ? {
                paddingRight: text === "리스트뷰" ? 53 : 41,
              }
            : {}
        }
        className={clsx(
          text === "리스트뷰"
            ? 'after:content-["리스트뷰"]'
            : 'after:content-["구슬뷰"]',
          "after:absolute after:-right-3 after:top-[2px] after:h-fit after:opacity-0 after:duration-300",
          "relative inline-block overflow-hidden text-sm font-semibold text-gray-800 transition-all duration-300",
          !isOverflow && "after:right-0 after:opacity-100",
        )}
      >
        <div className="h-[24px] w-[24px]">
          <img src={icon} />
        </div>
      </div>
    </button>
  );
};
