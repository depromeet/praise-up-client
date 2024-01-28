import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NotFound } from "@/app/error/404";
import { Carousel } from "@/components/app/on-boarding/clap/carousel";
import { Background } from "@/components/app/post/keyword/background";
import { ButtonProvider } from "@/components/common/button-provider";
import { DefaultLayout } from "@/components/layout/default";
import { useApiGetOnePost } from "@/hooks/api/detail/useApiGetOnePost";
import { useDecodeURI } from "@/hooks/useDecodeURI";
import { setMetaTags } from "@/utils/setMetaTag";

export const OnBoardingClap = () => {
  const [angle, setAngle] = useState(0);
  const navigate = useNavigate();
  const postId = useDecodeURI("postId");
  const {
    data: { userNickname },
  } = useApiGetOnePost(postId);

  useEffect(() => {
    setMetaTags({
      title: `${userNickname}님에게 익명으로 칭찬 남기기`,
      description: "praise up | 칭찬 기반 sns 서비스",
    });

    return setMetaTags({});
  }, []);

  if (!postId) return <NotFound />;

  return (
    <DefaultLayout
      appbar={false}
      noXPadding={true}
      noYPadding={true}
      className="overflow-x-hidden"
    >
      <Background angle={angle} />
      <Carousel setAngle={setAngle} userNickname={userNickname} />
      <ButtonProvider className="z-10 !bg-transparent px-40px">
        <ButtonProvider.Primary
          onClick={() => navigate("/clap", { state: { postId } })}
        >
          시작하기
        </ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
};
