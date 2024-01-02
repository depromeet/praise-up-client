import { Fragment, useRef } from "react";

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
  const hiddenRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    if (hiddenRef.current) {
      hiddenRef.current.focus();
      // console.log(event.target);
      // event.target.focus();
    }
  };

  return (
    <Fragment>
      <div className="flex h-102px w-full flex-col rounded-4 bg-slate-100 px-18px py-16px">
        <textarea
          className="text-b3-compact h-50px w-full resize-none bg-transparent caret-[#338AFF] focus:outline-none"
          title="텍스트 입력"
          maxLength={LIMIT}
          onClick={handleClick}
          onChange={(event) => {
            if (event.target.value.length > limit) {
              return;
            }
            onChange(event);
          }}
          {...props}
        ></textarea>
        <span className="text-num-b3 w-full text-right text-gray-600">{`${currentLength}/${LIMIT}`}</span>
      </div>
    </Fragment>
  );
};
