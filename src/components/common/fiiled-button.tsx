import clsx from "clsx";
import { Fragment, PropsWithChildren } from "react";

import { ToolTip } from "./tooltip";

export type ButtonProps = {
  text?: string;
  colorSchema?: string;
  isFull?: boolean;
  isOnBoarding?: boolean;
  isGuideExternalBrowser?: boolean;
  tooltip?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const FilledButton = ({
  colorSchema,
  className,
  children,
  tooltip,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Fragment>
      {tooltip ? <ToolTip text={tooltip} /> : null}
      <button
        type="button"
        className={clsx(
          "flex w-full items-center justify-center rounded-2 transition-all duration-300 disabled:bg-gray-400 disabled:text-gray-500",
          className,
          {
            "text-b2-strong bg-[#242B37] text-white py-16px":
              colorSchema === "primary",
            "text-b3-strong h-40px bg-transparent text-blue-500 py-10px":
              colorSchema === "white",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </Fragment>
  );
};
