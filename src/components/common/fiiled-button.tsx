import clsx from "clsx";
import { PropsWithChildren } from "react";

export type ButtonProps = {
  text?: string;
  colorSchema?: string;
  isFull?: boolean;
  isFullStyle?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const FilledButton = ({
  colorSchema,
  className,
  isFull,
  isFullStyle,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type="button"
      className={clsx(
        "flex h-54px w-full items-center justify-center rounded-2 py-16px disabled:bg-gray-400 disabled:text-gray-500",
        {
          "text-b2-strong bg-[#242B37] text-white": colorSchema === "primary",
          "text-b3-strong h-40px bg-white text-blue-500":
            colorSchema === "white",
          "rounded-none": isFull && isFullStyle,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
