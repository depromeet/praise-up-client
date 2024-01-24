import { Fragment } from "react";

type textareaProps = {
  limit: number;
  currentLength: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "type">;

export const Textarea = ({
  limit = 40,
  currentLength = 0,
  onChange,
  ...props
}: textareaProps) => {
  const LIMIT = limit;

  return (
    <Fragment>
      <div className="flex h-102px w-full flex-col rounded-4 bg-white px-18px py-16px outline outline-[#E0E2E6] focus-within:outline focus-within:outline-1 focus-within:outline-[#338AFF]">
        <textarea
          className="text-b3-compact h-50px w-full resize-none bg-transparent caret-[#338AFF] placeholder:text-gray-600 focus:outline-none"
          title="텍스트 입력"
          maxLength={LIMIT}
          onChange={(event) => {
            if (event.target.value.length > limit) return;
            onChange(event);
          }}
          {...props}
        ></textarea>
        <span className="text-num-b3 w-full text-right text-gray-600">{`${currentLength}/${LIMIT}`}</span>
      </div>
    </Fragment>
  );
};
