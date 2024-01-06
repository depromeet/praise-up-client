import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { ButtonProvider } from "@/components/common/button-provider";
import { Header } from "@/components/common/header";
import { ImageContainer } from "@/components/common/image-container";
import { ImageCropper } from "@/components/common/image-cropper";
import { ImageInput } from "@/components/common/image-input";
import { Textarea } from "@/components/common/textarea";
import { DefaultLayout } from "@/components/layout/default";
import useImageCompress from "@/hooks/useImageCompress";

type postProps = {
  keyword?: string;
};

export const Post = ({ keyword = "센스있는" }: postProps) => {
  const [image, setImage] = useState<string>("");
  const [text, setText] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const navigate = useNavigate();
  const { compressImage } = useImageCompress();

  /** 이미지 변경 이벤트 */
  const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      const compressedImage = compressImage(event.target.files[0]);
      compressedImage
        .then((res) => {
          reader.readAsDataURL(res as Blob);
          reader.onload = () => {
            setImage(reader.result as string);
            setOpenCrop(true);
          };
        })
        .catch((error) => {
          console.log(error);
        });
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
    console.log("최종 제출 파일 크기 :", file.size);
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
            <Header text={`오늘 칭찬받을 ${keyword}\\n순간을 공유해주세요`} />
            {image.length > 0 ? (
              <ImageContainer src={image} onChange={changeImage} />
            ) : (
              <ImageInput onChange={changeImage} />
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
