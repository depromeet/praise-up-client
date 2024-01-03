import { RecentCard } from "@/components/app/home/recent-card";
import { Carousel } from "@/components/common/carousel";

export const ToBeOpened = () => {
  /* 예제 시간 */
  const date1 = new Date();
  const date2 = new Date();

  const testBefore = new Date(date1.setDate(date1.getDate() - 1)).toISOString();
  const testAfter = new Date(
    date2.setSeconds(date2.getSeconds() + 10),
  ).toISOString();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-h2 text-gray-900">공계 예정 칭찬게시물</h2>
      <Carousel>
        <RecentCard
          id="1"
          keyword="신나는"
          count={48}
          openDatetime={testAfter}
        />
        <RecentCard
          id="2"
          keyword="재미있는"
          count={12}
          openDatetime={testBefore}
        />
      </Carousel>
    </div>
  );
};
