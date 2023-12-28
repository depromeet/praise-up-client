import clsx from "clsx";

export type ButtonProps = {
  text: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const FilledButton = ({ text, className, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "flex h-54px w-full items-center justify-center rounded-2 border bg-[#242B37] py-16px",
        className ? className : "bg-[#242B37] text-white",
      )}
      {...props}
    >
      {text}
    </button>
  );
};
