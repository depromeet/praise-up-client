type ButtonProps = {
  text: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const SingleButton = ({ text, ...props }: ButtonProps) => {
  return (
    <div className="w-360px h-98px px-20px pb-32px pt-12px">
      <button
        type="button"
        className="flex h-54px w-full items-center justify-center rounded-2 border bg-[#242B37] py-16px font-semibold text-white"
        {...props}
      >
        {text}
      </button>
    </div>
  );
};
