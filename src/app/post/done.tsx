import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { PostHeader } from "@/components/app/post/common/PostHeader";
import { DoneContainer } from "@/components/app/post/done/DoneContainer";
import { ButtonProvider } from "@/components/common/button-provider";
import { DefaultLayout } from "@/components/layout/default";

export const Done = () => {
  return (
    <DefaultLayout>
      <ArticleWrapper>
        <PostHeader
          text="게시글 작성이 완료되었어요!\n게시글을 공유해 칭찬 구슬을 모아보세요"
          className="!text-h3 text-center"
        />
        <DoneContainer />
      </ArticleWrapper>
      <ButtonProvider>
        <ButtonProvider.Primary>링크 공유하고 칭찬 받기</ButtonProvider.Primary>
        <ButtonProvider.White>다음에 할게요</ButtonProvider.White>
      </ButtonProvider>
    </DefaultLayout>
  );
};
