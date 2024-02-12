import { Dispatch, Fragment, SetStateAction } from "react";

type textareaProps = {
  limit: number;
  currentLength: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  height?: string;
  setHeight?: Dispatch<SetStateAction<string>>;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "type">;

export const Textarea = ({
  limit = 40,
  currentLength = 0,
  onChange,
  height,
  setHeight,
  ...props
}: textareaProps) => {
  const LIMIT = limit;

  return (
    <Fragment>
      <div className="min-h-102px flex h-auto w-full flex-col rounded-4 bg-white px-18px py-16px outline outline-1 outline-[#E0E2E6] focus-within:outline focus-within:outline-1 focus-within:outline-[#338AFF]">
        <textarea
          className="text-b3-compact min-h-50px h-auto max-h-[200px] w-full resize-none bg-transparent caret-[#338AFF] placeholder:text-gray-600 focus:outline-none"
          title="텍스트 입력"
          maxLength={LIMIT}
          style={{ height: height }}
          onChange={(event) => {
            if (event.target.value.length > limit) return;
            /** 스크롤의 높이 값과 현재 박스의 크기가 같거나, 스크롤이 생기지 않을 경우에는 auto로 높이를 자동 조정 */
            if (event.target.scrollHeight <= event.target.clientHeight) {
              event.target.style.height = "auto";
            }

            /** 스크롤이 생길 경우, 스크롤의 높이만큼 현재 박스의 높이를 조정 */
            if (event.target.scrollHeight > event.target.clientHeight) {
              event.target.style.height = event.target.scrollHeight + "px";
            }

            setHeight && setHeight(event.target.style.height);
            onChange(event);
          }}
          {...props}
        ></textarea>
        <span className="text-num-b3 w-full text-right text-gray-600">{`${currentLength}/${LIMIT}`}</span>
      </div>
    </Fragment>
  );
};
