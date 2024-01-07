import { useRef, useState } from "react";

import Marble from "@/assets/icons/marble.svg";
import { FABButton } from "@/components/app/archive/fabButton";
import { MarbleGridItem } from "@/components/app/archive/marbleGridItem";
import { Switch } from "@/components/common/Switch";
import { TMarble } from "@/types/archive";

type Props = {
  marbleList: TMarble[];
};

export const MarbleGrid = ({ marbleList }: Props) => {
  // TODO: Add body Scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFilteredViewedMarble, setIsFilteredViewedMarble] =
    useState<boolean>(false);

  if (!marbleList.length) return null;
  return (
    <div className="relative mx-auto box-border w-full max-w-[480px] px-5">
      <div className="h-16">Temp Header</div>
      <div className="mb-[60px] mt-4 flex flex-col gap-9">
        <div className="flex flex-col gap-0.5 text-lg text-primary">
          <p>해당 게시물에 대해</p>
          <p>
            <span className="font-semibold">999개</span>의 칭찬구슬이 모였어요!
          </p>
        </div>
        <div>
          <div className="flex items-center justify-end gap-[6px]">
            <p className="text-sm text-gray-700">안 읽은 구슬만 보기</p>
            <button onClick={() => setIsFilteredViewedMarble((prev) => !prev)}>
              <Switch isOn={isFilteredViewedMarble} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 overflow-y-auto">
            {marbleList?.map((marble) => <MarbleGridItem key={marble.id} />)}
          </div>
        </div>
      </div>
      <FABButton icon={Marble} text="구슬뷰" scrollRef={scrollRef} />
    </div>
  );
};
