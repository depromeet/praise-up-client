import clsx from "clsx";
import { ChangeEvent, Dispatch, SetStateAction, memo, useState } from "react";

import { InformationSVG } from "@/assets/icons/information";
import { ImageContainer } from "@/components/common/image-container";
import { ImageInput } from "@/components/common/image-input";
import { Input } from "@/components/common/input";
import { Textarea } from "@/components/common/textarea";

interface NicknameFormProps {
  nickname: string;
  image: string;
  setNickname: Dispatch<SetStateAction<string>>;
  setRequired: Dispatch<SetStateAction<boolean>>;
}

interface ImageFormProps {
  nickname: string;
  image: string;
  changeImage: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface ContentFormProps {
  height?: string;
  setHeight?: Dispatch<SetStateAction<string>>;
}

export const NicknameForm = memo(function NicknameForm({
  nickname,
  image,
  setNickname,
  setRequired,
}: NicknameFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-h4 text-primary">닉네임 설정</h4>
      <Input
        placeholder="닉네임을 설정해주세요"
        limit={4}
        value={nickname}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNickname(e.target.value)
        }
        onBlur={() => setRequired(nickname.length > 0 && image.length > 0)}
      />
    </div>
  );
});

export const ImageForm = memo(function ImageForm({
  nickname,
  image,
  changeImage,
}: ImageFormProps) {
  return (
    <div
      className={clsx(
        (!nickname || !image) && "mb-[60px]",
        "flex flex-col gap-4",
      )}
    >
      <h4 className="text-h4 text-primary">칭찬 반응 이미지</h4>
      {image.length > 0 ? (
        <ImageContainer src={image} onChange={changeImage} />
      ) : (
        <ImageInput onChange={changeImage} />
      )}
    </div>
  );
});

export const ContentForm = ({ height, setHeight }: ContentFormProps) => {
  const [content, setContent] = useState<string>(
    sessionStorage.getItem("comment_content") ?? "",
  );

  return (
    <div className="mb-14 flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h4 className="text-h4 text-primary">칭찬 메시지</h4>
        <Textarea
          limit={40}
          value={content}
          currentLength={content.length}
          placeholder="전달하고 싶은 칭찬 메시지를 작성해주세요 (선택)"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          onBlur={() => sessionStorage.setItem("comment_content", content)}
          height={height}
          setHeight={setHeight}
        />
      </div>
      <div className="flex gap-[4px] ">
        <InformationSVG />
        <span className="text-b3-long text-gray-600">
          욕설, 비속어나 부적절한 단어의 경우 서비스 사용이 제한되거나 관리자에
          의해 삭제될 수 있어요.
        </span>
      </div>
    </div>
  );
};
