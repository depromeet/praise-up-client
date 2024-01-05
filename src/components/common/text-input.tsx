import { ChangeEvent, useEffect, useState } from "react";

interface TextInputProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, "type"> {
  value: string;
  setValue: (value: string) => void;
  limit: number;
}

export const TextInput = ({
  value,
  setValue,
  limit,
  ...props
}: TextInputProps) => {
  const [count, setCount] = useState<number>(0);

  // 한글 초과 입력시 발생하는 글자 바로 제거
  useEffect(() => {
    setCount(value ? value.length : 0);
    if (value && value.length > limit) setValue(value.slice(0, limit));
    console.log(count);
  }, [value]);

  return (
    <div className=" flex items-center justify-between rounded-3 border border-gray-300 bg-white px-[18px] py-4 focus-within:border-blue-500">
      <input
        className="text-b3-compact w-full overflow-hidden text-ellipsis bg-transparent focus:outline-none"
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        {...props}
      />
      <span className="text-num-b3 tabular-nums">
        {count}/{limit}
      </span>
    </div>
  );
};
