import { ChangeEvent } from "react";

interface TextInputProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, "type"> {
  limit: number;
  currentLength: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  limit,
  currentLength,
  onChange,
  ...props
}: TextInputProps) => {
  return (
    <div className=" flex items-center justify-between rounded-3 border border-gray-300 bg-white px-[18px] py-4 focus-within:border-blue-500">
      <input
        className="text-b3-compact w-full overflow-hidden text-ellipsis bg-transparent focus:outline-none"
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.value.length > limit) return;
          onChange(e);
        }}
        {...props}
      />
      <span className="text-num-b3 tabular-nums">
        {currentLength}/{limit}
      </span>
    </div>
  );
};
