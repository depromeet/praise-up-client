import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { NotFound } from "@/app/error/404";
import { UserSVG } from "@/assets/icons/user";
import { Background } from "@/components/app/post/keyword/background";
import { Appbar } from "@/components/common/appbar";
import { ButtonProvider } from "@/components/common/button-provider";
import { PostCardView } from "@/components/common/post-card-view";
import { DefaultLayout } from "@/components/layout/default";
import { useApiGetOnePost } from "@/hooks/api/detail/useApiGetOnePost";

interface PostIdState {
  state: {
    postId: string;
  };
}

export const CommentMainPage = () => {
  const navigate = useNavigate();
  const location = useLocation() as PostIdState;
  const postId = location.state.postId;

  const { data } = useApiGetOnePost(postId);

  useEffect(() => {
    sessionStorage.setItem("comment_id", postId);
  }, [postId]);

  if (!postId) return <NotFound />;

  return (
    <DefaultLayout appbar={<Appbar right={<UserSVG />} />}>
      {/* post area */}
      <section className="flex flex-col justify-between gap-9">
        <h2 className="text-h2">{data.userNickname}님의 칭찬게시물</h2>
        <PostCardView {...{ ...data, isPublic: true }}>
          <PostCardView.Title />
          <PostCardView.Image />
        </PostCardView>
      </section>

      <ButtonProvider className="!bg-transparent">
        <ButtonProvider.Primary onClick={() => navigate("/clap/write")}>
          칭찬 남기기
        </ButtonProvider.Primary>
        <ButtonProvider.White onClick={() => navigate("/")}>
          나도 칭찬 받기
        </ButtonProvider.White>
      </ButtonProvider>

      {/* background 영역 */}
      <Background angle={0} />
    </DefaultLayout>
  );
};
