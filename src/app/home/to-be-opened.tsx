import { RecentCard } from "@/components/app/home/recent-card";
import { Carousel } from "@/components/common/carousel";
import {
  ContentDataType,
  GetPostType,
  useGetPost,
} from "@/hooks/apis/main/useGetPost";

export const ToBeOpened = () => {
  /* 예제 시간 */
  const date1 = new Date();
  const date2 = new Date();

  const testBefore = new Date(date1.setDate(date1.getDate() - 1)).toISOString();
  const testAfter = new Date(date2.setDate(date2.getDate() + 1)).toISOString();

  const { data } = useGetPost({ unread: true });

  console.log(data);

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-h2 text-gray-900">공개 예정 칭찬게시물</h2>
      <Carousel>
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
      </Carousel>
    </div>
  );
};
