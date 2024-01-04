import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { PostHeader } from "@/components/app/post/common/PostHeader";
import { ImageContainer } from "@/components/app/post/write/ImageContainer";
import { ImageCropper } from "@/components/app/post/write/ImageCropper";
import { PostImage } from "@/components/app/post/write/PostImage";
import { Textarea } from "@/components/app/post/write/Textarea";
import { ButtonProvider } from "@/components/common/button-provider";
import { DefaultLayout } from "@/components/layout/default";

type postProps = {
  keyword?: string;
};

export const Post = ({ keyword = "센스있는" }: postProps) => {
  const [image, setImage] = useState<string>("");
  const [text, setText] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const navigate = useNavigate();

  /** 이미지 변경 이벤트 */
  const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setImage(reader.result as string);
        setOpenCrop(true);
      };
    }
  };

  /** 텍스트 변경 이벤트 */
  const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  /** 게시글 작성 이벤트 */
  // TODO: 백엔드 API 싱크 맞춘 후, 진행
  const createPost = () => {
    const file = new File([image], "image.jpeg", {
      type: "image/jpeg",
    });
    navigate("/post/done");
  };

  return (
    <DefaultLayout>
      {openCrop ? (
        <ImageCropper
          src={image}
          openCrop={setOpenCrop}
          scaleImage={setImage}
        />
      ) : (
        <Fragment>
          <ArticleWrapper>
            <PostHeader
              text={`오늘 칭찬받을 ${keyword}\\n순간을 공유해주세요`}
              emphasis={keyword}
            />
            {image.length > 0 ? (
              <ImageContainer src={image} onChange={changeImage} />
            ) : (
              <PostImage onChange={changeImage} />
            )}
          </ArticleWrapper>
          {image.length > 0 && (
            <Textarea
              limit={40}
              placeholder="칭찬받을 순간에 대한 경험을 공유해주세요 (선택)"
              onChange={changeText}
              value={text}
              currentLength={text.length}
            />
          )}
          <ButtonProvider isFull={true}>
            <ButtonProvider.Primary
              disabled={!(image.length > 0)}
              onClick={createPost}
            >
              게시물 업로드 하기
            </ButtonProvider.Primary>
          </ButtonProvider>
        </Fragment>
      )}
    </DefaultLayout>
  );
};
