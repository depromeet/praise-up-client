interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  limit: number;
  value: string;
}

export const Input = ({ limit, value, ...props }: TextInputProps) => {
  return (
    <div className=" flex items-center justify-between rounded-3 border border-gray-300 bg-white px-[18px] py-4 caret-[#338AFF] focus-within:border-[#338AFF]">
      <input
        className="text-b3-compact w-full overflow-hidden text-ellipsis bg-transparent placeholder:text-gray-600 focus:outline-none"
        type="text"
        value={value}
        maxLength={limit}
        {...props}
      />
      <span className="text-num-b3 tabular-nums text-gray-600">
        {value.length ?? 0}/{limit}
      </span>
    </div>
  );
};
