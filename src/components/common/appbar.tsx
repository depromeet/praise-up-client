import clsx from "clsx";
import { ReactNode } from "react";

import { LogoSVG } from "@/assets/icons/logo";

type LeftAndContent =
  | { left: ReactNode; content?: string | ReactNode }
  | { left?: undefined; content?: never };

export const Appbar = ({
  left,
  right,
  content,
  className,
  isGrayAppbar,
}: {
  right?: ReactNode;
  className?: string;
  isGrayAppbar?: boolean;
} & LeftAndContent) => {
  // if left is not defined, render logo
  const _left = left ? left : <LogoSVG />;
  const _content = left ? content : null;

  return (
    <div
      className={clsx(
        "sticky top-0 z-20 flex h-64px w-full max-w-[480px] items-center justify-between px-20px py-10px backdrop-blur-[10px]",
        isGrayAppbar ? "bg-gray-100/80" : "bg-white/80",
        className,
      )}
    >
      <div className="flex-1">
        <span className="grid place-content-start">{_left}</span>
      </div>
      {_content && <div className="flex-none">{_content}</div>}
      {right && (
        <div className="flex-1">
          <span className="grid place-content-end">{right}</span>
        </div>
      )}
    </div>
  );
};
