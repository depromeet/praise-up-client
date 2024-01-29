import { Fragment, useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Back from "@/assets/icons/back.svg?react";
import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { Appbar } from "@/components/common/appbar";
import { ButtonProvider } from "@/components/common/button-provider";
import { ConfirmContext } from "@/components/common/confirm/confirm-context";
import { Header } from "@/components/common/header";
import { ImageContainer } from "@/components/common/image-container";
import { ImageCropper } from "@/components/common/image-cropper";
import { ImageInput } from "@/components/common/image-input";
import { Textarea } from "@/components/common/textarea";
import { DefaultLayout } from "@/components/layout/default";
import { useApiBoard } from "@/hooks/api/post/useApiBoard";
import useImageCompress from "@/hooks/useImageCompress";

export type postProps = {
  keyword?: string;
  keywordId?: number;
};

export const Post = () => {
  const { confirm } = useContext(ConfirmContext);
  const { compressImage } = useImageCompress();
  const [image, setImage] = useState<string>("");
  const [text, setText] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const keywordData = useRef<postProps>({});
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as postProps;
  const { mutate } = useApiBoard();

  if (state.keyword && state.keywordId) {
    const keywordInfo = {
      keyword: state.keyword,
      keywordId: state.keywordId,
    };
    keywordData.current = keywordInfo;
  } else {
    navigate("/error");
  }

  const handleModal = async () => {
    const result = await confirm(
      {
        title: "키워드 선택으로 돌아갈까요?",
        description: "지금 돌아가면 이미지와 텍스트 내용이 삭제돼요.",
      },
      {
        text: "계속 작성",
      },
      {
        text: "돌아가기",
      },
    );

    if (!result) return;
    navigate("/post/keyword");
  };

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
    try {
      void blob.then((res) => {
        const file = new File([res], "image.jpeg", {
          type: "image/jpeg",
        });

        const formData = new FormData();
        formData.append("content", text);
        formData.append("image", file);
        formData.append("keywordId", `${keywordData.current.keywordId}`);
        mutate(formData);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <DefaultLayout
        appbar={
          <Appbar
            left={
              <Back
                className="cursor-pointer"
                onClick={() => {
                  if (image.length || text.length) {
                    void handleModal();
                  } else {
                    navigate("/post/keyword");
                  }
                }}
              />
            }
          />
        }
      >
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
                text={`오늘 칭찬받을 {${keywordData.current.keyword}}\\n 순간을 공유해주세요`}
              />
              {image.length > 0 ? (
                <ImageContainer src={image} onChange={changeImage} />
              ) : (
                <ImageInput
                  onChange={changeImage}
                  placeholder="칭찬 받을 순간을 올려주세요"
                />
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
            <ButtonProvider isFull={true} className="!bg-transparent">
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
    </Fragment>
  );
};
