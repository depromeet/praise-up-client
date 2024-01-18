import clsx from "clsx";
import { useEffect, useState } from "react";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { MarbleCard } from "@/components/app/archive/marble-card";
import { Appbar } from "@/components/common/appbar";
import { Arrow } from "@/components/common/arrow";
import { UseScrollToTop } from "@/hooks/useScrollToTop";
import { useWindowScrollY } from "@/hooks/useWindowScrollY";
import { TArchiveView } from "@/types/archive";

type Props = {
  onChangeView: (view: TArchiveView) => void;
};

export const PreviewCard = ({ onChangeView }: Props) => {
  UseScrollToTop();
  const { isOverflow } = useWindowScrollY({ point: 10 });

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (!isScrolled) return;

    void onChangeViewWithDelay();
  }, [isScrolled]);

  useEffect(() => {
    if (!isOverflow) return;

    setIsScrolled(true);
  }, [isOverflow]);

  const onChangeViewWithDelay = async () => {
    await new Promise(() =>
      setTimeout(() => {
        onChangeView("preview-summary");
      }, 1000),
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-[480px] overflow-scroll">
      {/* scroll을 위한 영역 */}
      <div
        style={{
          height: "calc(100vh + 40px)",
        }}
      />

      {/* 랜딩 */}
      <div className="fixed top-0 w-[480px]">
        <Appbar
          left={
            <button onClick={() => window.history.back()}>
              <ChevronLeftEdgeSVG />
            </button>
          }
        />
      </div>
      <p
        className={clsx(
          "fixed top-20 mb-9 ml-5 text-xl font-semibold text-primary",
          isScrolled && "animate-fadeOut",
        )}
      >
        나의 칭찬게시물
      </p>

      <div
        className={clsx(
          "fixed top-[138px] w-full max-w-[480px] px-5",
          isScrolled && "animate-fadeOutUp",
        )}
      >
        <MarbleCard />
      </div>

      <div className="fixed bottom-0 h-184px w-full max-w-[480px]">
        <div className="absolute bottom-0 z-10 flex h-full w-full flex-col items-center justify-center gap-3">
          <div
            className={clsx(
              "w-fit text-sm font-semibold text-slate-600",
              isScrolled && "animate-fadeOut",
            )}
          >
            스크롤해서 칭찬 확인하기
          </div>
          <Arrow className="rotate-180" />
        </div>

        {/* background area */}
        <div
          className={clsx(
            "bg-archive-preview absolute bottom-0 h-184px w-full bg-cover",
            isScrolled && "animate-fadeOut",
          )}
        />
      </div>
    </div>
  );
};
