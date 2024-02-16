import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { NotFound } from "@/app/error/404";
import CloseSVG from "@/assets/icons/close.svg?react";
import Marble1SVG from "@/assets/imgs/marble1.svg?react";
import Marble2SVG from "@/assets/imgs/marble2.svg?react";
import { Background } from "@/components/app/comment/background";
import {
  ContentForm,
  ImageForm,
  NicknameForm,
} from "@/components/app/comment/form-field";
import { Appbar } from "@/components/common/appbar";
import { ButtonProvider } from "@/components/common/button-provider";
import { ConfirmContext } from "@/components/common/confirm/confirm-context";
import { Header } from "@/components/common/header";
import { ImageCropper } from "@/components/common/image-cropper";
import { DefaultLayout } from "@/components/layout/default";
import { GetOnePostType } from "@/hooks/api/detail/useApiGetOnePost";
import useImageCompress from "@/hooks/useImageCompress";
import { UseScrollToBottom } from "@/hooks/useScrollToBottom";

export const CommentFormPage = () => {
  const data = useLocation().state as GetOnePostType;
  const [nickname, setNickname] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [openCrop, setOpenCrop] = useState(false);
  const [height, setHeight] = useState("");
  const { compressImage } = useImageCompress();
  const [required, setRequired] = useState(false);
  const navigate = useNavigate();
  const { confirm } = useContext(ConfirmContext);
  const [marbleIdx] = useState(Math.floor(Math.random() * 2));

  UseScrollToBottom(!openCrop && required, true);

  useEffect(() => {
    setNickname(sessionStorage.getItem("comment_nickname") ?? "");
    setImage(sessionStorage.getItem("comment_image") ?? "");
  }, []);

  useEffect(() => {
    if (!nickname.length) return;
    setRequired(true);
  }, [image]);

  const handleModal = async () => {
    if (nickname.length !== 0 || image.length !== 0) {
      const result = await confirm({
        message: {
          title: "칭찬 반응 작성을 그만둘까요?",
          description: "지금 돌아가면 이미지와 텍스트 내용이 삭제돼요",
        },
        confirm: {
          text: "그만두기",
        },
        cancel: {
          text: "계속 작성",
        },
      });

      if (!result) return;
    }
    navigate(-1);
  };

  /** 이미지 변경 이벤트 */
  const changeImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
            console.log(error); // eslint rule
          });
      }
    },
    [],
  );

  const saveForm = () => {
    try {
      sessionStorage.setItem("comment_nickname", nickname);
      sessionStorage.setItem("comment_image", image);
    } catch (err) {
      return <NotFound />;
    }
    navigate("/clap/up");
  };

  return (
    <DefaultLayout
      // 버튼 따라오지 않는 이슈 수정
      // className="overflow-x-hidden"
      appbar={
        !openCrop && (
          <Appbar
            left={<CloseSVG onClick={handleModal} />}
            content={
              <div className="font-semibold text-primary">칭찬 반응 남기기</div>
            }
          />
        )
      }
    >
      <Background />
      {openCrop ? (
        <ImageCropper
          src={image}
          openCrop={setOpenCrop}
          scaleImage={setImage}
        />
      ) : (
        <>
          <Header
            text={`{${data.keyword}} 순간을 올린\\n {${data.userNickname}} 님에게 칭찬 남기기`}
            className="mb-9"
          />
          <div className="absolute right-5 top-[70px]">
            {{ 0: <Marble1SVG />, 1: <Marble2SVG /> }[marbleIdx]}
          </div>

          <div className="flex w-full flex-col gap-7">
            <>
              <NicknameForm
                nickname={nickname}
                image={image}
                setNickname={setNickname}
                setRequired={setRequired}
              />
              <ImageForm
                changeImage={changeImage}
                nickname={nickname}
                image={image}
              />
              {required && (
                <ContentForm height={height} setHeight={setHeight} />
              )}
            </>
          </div>

          <ButtonProvider isFull={true}>
            <ButtonProvider.Primary
              disabled={!required}
              onClick={() => saveForm()}
            >
              칭찬 보내기
            </ButtonProvider.Primary>
          </ButtonProvider>
        </>
      )}
    </DefaultLayout>
  );
};
