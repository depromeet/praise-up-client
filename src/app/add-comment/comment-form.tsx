import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LayeredBackground } from "@/components/app/add-comment/layered-background";
import { MessageForm } from "@/components/app/add-comment/message-form";
import { RequiredForm } from "@/components/app/add-comment/required-form";
import { ButtonProvider } from "@/components/common/button-provider";
import { Header } from "@/components/common/header";
import { ImageCropper } from "@/components/common/image-cropper";
import { DefaultLayout } from "@/components/layout/default";
import useImageCompress from "@/hooks/useImageCompress";

const DUMMY_DATA = {
  id: "1",
  keyword: "센스있는",
  username: "지영",
};

export const CommentFormPage = () => {
  const navigate = useNavigate();

  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [openCrop, setOpenCrop] = useState(false);
  const { compressImage } = useImageCompress();
  const [required, setRequired] = useState(false);

  useEffect(() => {
    setRequired(text.length > 0 && image.length > 0);
  }, [text, image]);

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

  return (
    <DefaultLayout>
      {openCrop ? (
        <ImageCropper
          src={image}
          openCrop={setOpenCrop}
          scaleImage={setImage}
        />
      ) : (
        <>
          <LayeredBackground>
            <Header
              text={`{${DUMMY_DATA.keyword}} 순간을 올린\\n {${DUMMY_DATA.username}} 님에게 칭찬 남기기`}
            />

            <div className="flex w-full flex-col gap-7">
              <RequiredForm
                text={text}
                setText={setText}
                image={image}
                changeImage={changeImage}
              />
              {required && (
                <MessageForm message={message} setMessage={setMessage} />
              )}
            </div>
          </LayeredBackground>

          <ButtonProvider isFull={true}>
            <ButtonProvider.Primary
              disabled={!required}
              onClick={() => navigate("/clap/up")}
            >
              칭찬 보내기
            </ButtonProvider.Primary>
          </ButtonProvider>
        </>
      )}
    </DefaultLayout>
  );
};
