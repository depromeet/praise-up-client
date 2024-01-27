import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { NotFound } from "@/app/error/404";
import { LogoSVG } from "@/assets/icons/logo";
import { UserSVG } from "@/assets/icons/user";
import Marbles from "@/assets/imgs/marbles.svg?react";
import { ButtonProvider } from "@/components/common/button-provider";
import { PostCardView } from "@/components/common/post-card-view";
import { DefaultLayout } from "@/components/layout/default";
import { useApiGetOnePost } from "@/hooks/api/detail/useApiGetOnePost";

interface PostIdState {
  state: {
    postId: string;
  };
}

const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-[64px] w-full items-center justify-between px-5 py-2.5">
      <button onClick={() => navigate("/")}>
        <LogoSVG />
      </button>
      <UserSVG />
    </div>
  );
};

export const CommentMainPage = () => {
  const navigate = useNavigate();
  const location = useLocation() as PostIdState;
  const postId = location.state.postId;

  const { data } = useApiGetOnePost(postId);

  useEffect(() => {
    sessionStorage.setItem("comment_id", postId);
    sessionStorage.removeItem("comment_nickname");
    sessionStorage.removeItem("comment_content");
    sessionStorage.removeItem("comment_image");
  }, [postId]);

  if (!postId) return <NotFound />;

  return (
    <DefaultLayout appbar={<Appbar />}>
      {/* post area */}
      <section className="flex flex-col justify-between gap-9">
        <h2 className="text-h2">{data.userNickname}님의 칭찬게시물</h2>
        <PostCardView {...{ ...data, isPublic: true }}>
          <PostCardView.Title />
          <PostCardView.Image />
        </PostCardView>
      </section>

      <ButtonProvider className="!bg-transparent">
        <ButtonProvider.Primary
          onClick={() => navigate("/clap/write", { state: data })}
        >
          칭찬 남기기
        </ButtonProvider.Primary>
        <ButtonProvider.White onClick={() => navigate("/")}>
          나도 칭찬 받기
        </ButtonProvider.White>
      </ButtonProvider>

      {/* background 영역 */}
      <div className="absolute bottom-0 left-0 -z-10 m-0 h-auto w-full p-0">
        <div
          className="absolute bottom-0 h-full w-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.50) 0%, rgba(189, 224, 255, 0.50) 50.48%)",
            backgroundSize: "cover",
          }}
        />
        <Marbles />
      </div>
    </DefaultLayout>
  );
};
