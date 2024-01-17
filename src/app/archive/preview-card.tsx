import clsx from "clsx";
import { useEffect, useState } from "react";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { MarbleCard } from "@/components/app/archive/marble-card";
import { Appbar } from "@/components/common/appbar";
import { Arrow } from "@/components/common/arrow";
import { DefaultLayout } from "@/components/layout/default";
import { TArchiveView } from "@/types/archive";

type Props = {
  onChangeView: (view: TArchiveView) => void;
};

export const PreviewCard = ({ onChangeView }: Props) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (!isScrolled) return;

    void onChangeViewWithDelay();
  }, [isScrolled]);

  const onClickNext = () => {
    setIsScrolled(true);
  };

  const onChangeViewWithDelay = async () => {
    await new Promise(() =>
      setTimeout(() => {
        onChangeView("preview-summary");
      }, 1000),
    );
  };

  return (
    <DefaultLayout
      appbar={
        <Appbar
          left={
            <button onClick={() => window.history.back()}>
              <ChevronLeftEdgeSVG />
            </button>
          }
        />
      }
    >
      <div
        className={clsx("flex flex-col gap-9", isScrolled && "animate-fadeOut")}
      >
        <p className="text-xl font-semibold text-primary">나의 칭찬게시물</p>
        <div className={clsx(isScrolled && "animate-fadeOutUp")}>
          <MarbleCard />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-184px w-full">
        <div className="absolute bottom-0 z-10 flex h-full w-full flex-col items-center justify-center gap-3">
          <div
            className={clsx(
              "w-fit text-sm font-semibold text-slate-600",
              isScrolled && "animate-fadeOut",
            )}
          >
            스크롤해서 칭찬 확인하기
          </div>
          <button onClick={onClickNext}>
            <Arrow className="rotate-180" />
          </button>
        </div>

        {/* background area */}
        <div
          className={clsx(
            "bg-archive-preview absolute bottom-0 h-184px w-full bg-cover",
            isScrolled && "animate-fadeOut",
          )}
        />
      </div>
    </DefaultLayout>
  );
};
