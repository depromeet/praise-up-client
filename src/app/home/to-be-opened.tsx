import { CardSwiper } from "@/components/app/home/card-swiper";
import { EmptyCard } from "@/components/app/home/empty-card";
import { RecentCard } from "@/components/app/home/recent-card";
import { ContentDataType } from "@/hooks/api/main/useApiGetReadPosts";
import { useApiGetUnreadPosts } from "@/hooks/api/main/useApiGetUnreadPosts";

export const ToBeOpened = () => {
  const { data } = useApiGetUnreadPosts();
  console.log(data);

  return (
    <div className="mb-4 flex flex-col gap-5">
      <h2 className="text-h2 text-gray-900">공개 예정 칭찬게시물</h2>
      {!(data as ContentDataType[])?.length ? (
        <EmptyCard
          text="오늘의 게시물을 작성하지 않았어요"
          subText="상단의 버튼을 눌러 게시물을 작성해보세요"
        />
      ) : (
        <CardSwiper>
          {(data as ContentDataType[])?.map((content, idx) => (
            <RecentCard key={idx} {...content} id={"5"} />
          ))}
        </CardSwiper>
      )}
    </div>
  );
};
