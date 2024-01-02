import { useState } from "react";

import { MarbleGridItem } from "@/components/app/marbleGridItem";
import { Switch } from "@/components/common/Switch";
import { TMarble } from "@/types/archive";

type Props = {
  marbleList: TMarble[];
};

export const MarbleGrid = ({ marbleList }: Props) => {
  const [isFilteredViewedMarble, setIsFilteredViewedMarble] =
    useState<boolean>(false);

  if (!marbleList.length) return null;
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
          <div className="flex items-center justify-end gap-[6px]">
            <p className="text-sm text-gray-500">안 읽은 구슬만 보기</p>
            <button onClick={() => setIsFilteredViewedMarble((prev) => !prev)}>
              <Switch isOn={isFilteredViewedMarble} />
            </button>
          </div>

          <div className="mt-[16px] grid grid-cols-2 gap-[8px]">
            {marbleList?.map((marble) => <MarbleGridItem key={marble.id} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
