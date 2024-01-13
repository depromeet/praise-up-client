import { Fragment, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

export const Post = () => {
  const { compressImage } = useImageCompress();
  const [image, setImage] = useState<string>("");
  const [text, setText] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const keyword = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as postProps;

  if (state.keyword) {
    keyword.current = state.keyword;
  } else {
    navigate("/error");
  }

  async function getBlobFromUrl(blobUrl: string) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return blob;
  }

  // TODO: 추후 게시글 작성 API 연동 시에 사용 예정
  // function formatFileSize(bytes) {
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  //   if (bytes == 0) return "0 Byte";
  //   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  //   return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  // }

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
    const blob = getBlobFromUrl(image);
    blob
      .then((res) => {
        const file = new File([res], "image.jpeg", {
          type: "image/jpeg",
        });
        console.log(file);
      })
      .catch((err) => {
        console.log(err);
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
            <Header
              text={`오늘 칭찬받을 {${keyword.current}}\\n 순간을 공유해주세요`}
            />
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
