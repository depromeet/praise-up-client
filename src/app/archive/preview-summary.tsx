import clsx from "clsx";
import { useEffect, useState } from "react";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { Appbar } from "@/components/common/appbar";
import { Arrow } from "@/components/common/arrow";
import { Header } from "@/components/common/header";
import { UseScrollToTop } from "@/hooks/useScrollToTop";
import { useWindowScrollY } from "@/hooks/useWindowScrollY";
import { TArchiveView } from "@/types/archive";

type Props = {
  marbleNum: number;
  onChangeView: (view: TArchiveView) => void;
};

export const PreviewSummary = ({ marbleNum, onChangeView }: Props) => {
  UseScrollToTop();
  const { isOverflow } = useWindowScrollY({ point: 40 });

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
        onChangeView("marble-canvas");
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
            <button onClick={() => onChangeView("preview-card")}>
              <ChevronLeftEdgeSVG />
            </button>
          }
        />
      </div>

      <div>
        <Header
          text={`해당 게시물에 대해\\n{${marbleNum}개}의 칭찬구슬이 모였어요!`}
          className={clsx(
            "fixed top-20 mb-9 ml-5 animate-fadeInUp",
            isScrolled && "animate-fadeOutUp",
          )}
        />
        <div className="fixed bottom-0 h-184px w-full max-w-[480px]">
          <div
            className={clsx(
              "absolute bottom-0 left-0 h-[184px] w-full",
              isScrolled && "animate-fadeOut",
            )}
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <div className="h-5" />
              <Arrow className="rotate-180" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
