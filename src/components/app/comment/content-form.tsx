import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { InformationSVG } from "@/assets/icons/information";
import { Textarea } from "@/components/common/textarea";

interface ContentFormProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}
export const ContentForm = ({ content, setContent }: ContentFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h4 className="text-h4 text-primary">칭찬 메시지</h4>
        <Textarea
          limit={40}
          value={content}
          currentLength={content.length}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
      </div>
      <div className="flex gap-[7px] break-keep">
        <InformationSVG />
        <span className="text-cap-compact text-gray-600">
          욕설, 비속어나 부적절한 단어의 경우 서비스 사용이 제한되거나 관리자에
          의해 삭제될 수 있어요.
        </span>
      </div>
    </div>
  );
};
