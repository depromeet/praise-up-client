import { ChangeEvent } from "react";

interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  limit: number;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ limit, value, onChange, ...props }: TextInputProps) => {
  return (
    <div className=" flex items-center justify-between rounded-3 border border-gray-300 bg-white px-[18px] py-4 focus-within:border-blue-500">
      <input
        className="text-b3-compact w-full overflow-hidden text-ellipsis bg-transparent focus:outline-none"
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.value.length > limit) return;
          onChange(e);
        }}
        {...props}
      />
      <span className="text-num-b3 tabular-nums">
        {value.length ?? 0}/{limit}
      </span>
    </div>
  );
};
