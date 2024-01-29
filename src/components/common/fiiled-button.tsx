import clsx from "clsx";
import { PropsWithChildren } from "react";

export type ButtonProps = {
  text?: string;
  colorSchema?: string;
  isFull?: boolean;
  isFullStyle?: boolean;
  isOnBoarding?: boolean;
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
        "flex w-full items-center justify-center rounded-2 transition-all duration-300 disabled:bg-gray-400 disabled:text-gray-500",
        className,
        {
          "text-b2-strong bg-[#242B37] text-white py-16px":
            colorSchema === "primary",
          "text-b3-strong h-40px bg-transparent text-blue-500 py-10px":
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
