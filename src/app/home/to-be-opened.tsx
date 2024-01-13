import { useEffect, useState } from "react";

import { CardSwiper } from "@/components/app/home/card-swiper";
import { EmptyCard } from "@/components/app/home/empty-card";
import { RecentCard } from "@/components/app/home/recent-card";
import tempData from "@/data/main-temp-data.json";

interface InputDataType {
  id: string;
  keyword: string;
  count: string;
}

interface DataType extends InputDataType {
  openDatetime: string;
}

export const ToBeOpened = () => {
  /* 예제 시간 */
  const [data, setData] = useState<Array<DataType>>([]);
  const date1 = new Date();
  const date2 = new Date();
  const [isEmpty, setIsEmpty] = useState(true);

  // test data: before & after date
  const testDate = [
    new Date(date1.setDate(date2.getDate() + 1)).toISOString(),
    new Date(date2.setDate(date1.getDate() - 1)).toISOString(),
  ];

  useEffect(() => {
    if (!isEmpty) return;
    console.log(tempData.data);
    setData(
      tempData.data.map((data: InputDataType, i: number) => {
        return { ...data, openDatetime: testDate[i] };
      }) as Array<DataType>,
    );
  }, []);

  useEffect(() => {
    setIsEmpty(data.length === 0);
  }, [data]);

  return (
    <div className="mb-4 flex flex-col gap-5">
      <h2 className="text-h2 text-gray-900">공개 예정 칭찬게시물</h2>

      {isEmpty && (
        <EmptyCard
          text="오늘의 게시물을 작성하지 않았어요"
          subText="상단의 버튼을 눌러 게시물을 작성해보세요"
        />
      )}
      <CardSwiper>
        {data?.map((data, i) => <RecentCard key={i} {...data} />)}
      </CardSwiper>
    </div>
  );
};
