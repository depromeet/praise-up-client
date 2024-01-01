import { useEffect, useState } from "react";

import { MarbleGridItem } from "@/components/app/marbleGridItem";
import { DefaultLayout } from "@/components/layout/default";
import tempData from "@/data/tempData.json";

interface IMarble {
  id: number;
  imageUrl: string;
  user: string;
  content: string;
}

export const MarbleGrid = () => {
  const [marbleList, setMarbleList] = useState<IMarble[]>();

  useEffect(() => {
    // TODO: server Data
    if (!tempData.data.length) return;

    setMarbleList(tempData.data);
  }, []);

  return (
    <div className="relative mx-auto box-border w-full max-w-[480px] px-[20px]">
      <div className="h-16">Temp Header</div>
      <div className="mb-[60px] mt-[16px] flex flex-col gap-[36px]">
        <div className="flex flex-col gap-0.5 text-lg text-gray-800">
          <p>해당 게시물에 대해</p>
          <p>
            <span className="font-semibold">999개</span>의 칭찬구슬이 모였어요!
          </p>
        </div>
        <div>
          <div>toggle button area</div>
          <div className="mt-[16px] grid grid-cols-2 gap-[8px]">
            {marbleList?.map((marble) => <MarbleGridItem key={marble.id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
