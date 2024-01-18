import { useNavigate } from "react-router-dom";

import Marbles from "@/assets/imgs/marbles.svg?react";
import { ButtonProvider } from "@/components/common/button-provider";
import { PostCardView } from "@/components/common/post-card-view";
import { DefaultLayout } from "@/components/layout/default";
import { useApiGetOnePost } from "@/hooks/api/unpublished-post/useApiGetOnePost";

export const CommentMainPage = () => {
  const navigate = useNavigate();
  // TODO: 실제 postId를 받아오기
  const postId = "5";
  const { data } = useApiGetOnePost(postId);

  return (
    <DefaultLayout>
      {/* post area */}
      <section className="flex flex-col justify-between gap-9">
        <h2 className="text-h2">
          {"대장" /* TODO: change `data.username` */}님의 칭찬게시물
        </h2>
        <PostCardView {...{ ...data, isPublic: true }}>
          <PostCardView.Title />
          <PostCardView.Image />
        </PostCardView>
      </section>

      <ButtonProvider className="!bg-transparent">
        <ButtonProvider.Primary onClick={() => navigate("/clap/write")}>
          칭찬 남기기
        </ButtonProvider.Primary>
        <ButtonProvider.White>나도 칭찬 받기</ButtonProvider.White>
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
