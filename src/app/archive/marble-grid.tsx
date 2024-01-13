import { useRef, useState } from "react";

import Marble from "@/assets/icons/marble.svg";
import { ArchiveTitle } from "@/components/app/archive/archive-title";
import { FABButton } from "@/components/app/archive/fab-button";
import { MarbleGridItem } from "@/components/app/archive/marble-grid-item";
import { Switch } from "@/components/common/Switch";
import { DefaultLayout } from "@/components/layout/default";
import { TArchiveView, TMarble } from "@/types/archive";

type Props = {
  marbleList: TMarble[];
  isViewedIdxList: number[];
  onChangeView: (view: TArchiveView) => void;
  onUpdateViewIdxList: (activeIdx: number) => void;
  onChangeModalState: (isOpen: boolean) => void;
};

export const MarbleGrid = ({
  marbleList,
  isViewedIdxList,
  onChangeView,
  onUpdateViewIdxList,
  onChangeModalState,
}: Props) => {
  // TODO: Add body Scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFilteredViewed, setIsFilteredViewed] = useState<boolean>(false);

  if (!marbleList.length) return null;
  return (
    <DefaultLayout appbar={<div>appBar</div>}>
      <div className="mb-[60px] flex flex-col gap-9">
        <ArchiveTitle archiveMarbleNum={marbleList.length} />

        <div>
          <div className="flex items-center justify-end gap-[6px]">
            <p className="text-sm text-gray-700">안 읽은 구슬만 보기</p>
            <button onClick={() => setIsFilteredViewed((prev) => !prev)}>
              <Switch isOn={isFilteredViewed} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {marbleList?.map((marble) => <MarbleGridItem key={marble.id} />)}
          </div>
        </div>
      </div>

      <FABButton
        icon={Marble}
        text="구슬뷰"
        onClick={() => onChangeView("canvas")}
        scrollRef={scrollRef}
      />
    </DefaultLayout>
  );
};
