import { CardSwiper } from "@/components/app/home/card-swiper";
import { EmptyCard } from "@/components/app/home/empty-card";
import { RecentCard } from "@/components/app/home/recent-card";
import {
  ContentDataType,
  GetPostType,
  useGetPost,
} from "@/hooks/apis/main/useGetPost";

export const ToBeOpened = () => {
  const { data } = useGetPost({ unread: true });

  return (
    <div className="mb-4 flex flex-col gap-5">
      <h2 className="text-h2 text-gray-900">공개 예정 칭찬게시물</h2>
      {data?.pages[0].content.length === 0 && (
        <EmptyCard
          text="오늘의 게시물을 작성하지 않았어요"
          subText="상단의 버튼을 눌러 게시물을 작성해보세요"
        />
      )}
      <CardSwiper>
        {data?.pages
          .reduce(
            (contents: ContentDataType[], currPage: GetPostType) => [
              ...contents,
              ...(currPage.content as ContentDataType[]),
            ],
            [],
          )
          .map((content, idx) =>
            // TODO: remove temp condition and id props
            // Now, get 2 recent data instead of real unread data
            idx < 2 ? <RecentCard key={idx} {...content} id={"5"} /> : null,
          )}
      </CardSwiper>
    </div>
  );
};
