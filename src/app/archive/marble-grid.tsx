import { useEffect, useRef, useState } from "react";

import Marble from "@/assets/icons/marble.svg";
import { FABButton } from "@/components/app/archive/fab-button";
import { MarbleGridItem } from "@/components/app/archive/marble-grid-item";
import { Header } from "@/components/common/header";
import { Switch } from "@/components/common/Switch";
import { DefaultLayout } from "@/components/layout/default";
import { TArchiveView, TMarble } from "@/types/archive";

type Props = {
  marbleList: TMarble[];
  isViewedIdList: number[];
  onChangeView: (view: TArchiveView) => void;
  onChangeSelectedMarbleId: (id: number) => void;
};

export const MarbleGrid = ({
  marbleList,
  isViewedIdList,
  onChangeView,
  onChangeSelectedMarbleId,
}: Props) => {
  // TODO: Add body Scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFilteredViewed, setIsFilteredViewed] = useState<boolean>(false);
  const [isNotViewedMarbleList, setIsNotViewedMarbleList] =
    useState<TMarble[]>();

  useEffect(() => {
    if (!isViewedIdList.length) {
      setIsNotViewedMarbleList(marbleList);
      return;
    }

    const isViewedList = marbleList.filter(
      (marble) =>
        isViewedIdList.findIndex((id) => id === marble.commentId) === -1,
    );
    setIsNotViewedMarbleList(isViewedList);
  }, [marbleList, isViewedIdList]);

  if (!marbleList.length) return null;
  return (
    <DefaultLayout appbar={<div>appBar</div>}>
      <div className="mb-[60px] flex flex-col gap-9">
        <Header
          text={`해당 게시물에 대해\\n{${marbleList.length}개}의 칭찬구슬이 모였어요!`}
        />

        <div>
          <div className="flex items-center justify-end gap-[6px]">
            <p className="text-sm text-gray-700">안 읽은 구슬만 보기</p>
            <button onClick={() => setIsFilteredViewed((prev) => !prev)}>
              <Switch isOn={isFilteredViewed} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {isFilteredViewed ? (
              <>
                {isNotViewedMarbleList?.map((marble) => (
                  <MarbleGridItem
                    marble={marble}
                    onClick={() => onChangeSelectedMarbleId(marble.commentId)}
                    key={marble.commentId}
                  />
                ))}
              </>
            ) : (
              <>
                {marbleList?.map((marble) => (
                  <MarbleGridItem
                    marble={marble}
                    onClick={() => onChangeSelectedMarbleId(marble.commentId)}
                    key={marble.commentId}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <FABButton
        icon={Marble}
        text="구슬뷰"
        onClick={() => onChangeView("marble-canvas")}
        scrollRef={scrollRef}
      />
    </DefaultLayout>
  );
};
