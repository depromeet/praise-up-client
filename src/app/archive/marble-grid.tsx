import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import Marble from "@/assets/icons/marble.svg";
import { FABButton } from "@/components/app/archive/fab-button";
import { MarbleGridItem } from "@/components/app/archive/marble-grid-item";
import { Appbar } from "@/components/common/appbar";
import { Header } from "@/components/common/header";
import { Switch } from "@/components/common/Switch";
import { DefaultLayout } from "@/components/layout/default";
import { useWindowScrollY } from "@/hooks/useWindowScrollY";
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
  const { isOverflow } = useWindowScrollY({ point: 1 });

  // TODO: Add body Scroll
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
    <DefaultLayout
      appbar={
        <Appbar
          left={
            <button onClick={() => onChangeView("preview-card")}>
              <ChevronLeftEdgeSVG />
            </button>
          }
          content={
            <div
              className={clsx(
                isOverflow ? "opacity-100" : "opacity-0",
                "font-semibold text-primary transition-all",
              )}
            >
              {marbleList.length}개의 칭찬구슬
            </div>
          }
        />
      }
    >
      <div className="mb-[60px] flex flex-col gap-9">
        <Header text="보고싶은 칭찬 구슬을 눌러\n칭찬을 확인해보세요!" />

        <div>
          <div className="flex items-center justify-end gap-[6px]">
            <p className="text-sm text-gray-700">안 읽은 구슬만 보기</p>
            <button onClick={() => setIsFilteredViewed((prev) => !prev)}>
              <Switch isOn={isFilteredViewed} />
            </button>
          </div>

          {/* NOTE: Empty Case */}
          {isFilteredViewed && !isNotViewedMarbleList?.length ? (
            <div className="mt-[114px] flex w-full flex-col items-center gap-[10px]">
              <div className="bg-archive-marble-empty-case h-120px w-120px" />
              <p className="font-semibold text-teritary">
                모든 구슬을 확인했어요!
              </p>
            </div>
          ) : (
            // NOTE: Marble List Grid Layout
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
          )}
        </div>
      </div>

      <FABButton
        icon={Marble}
        text="구슬뷰"
        onClick={() => onChangeView("marble-canvas")}
      />
    </DefaultLayout>
  );
};
