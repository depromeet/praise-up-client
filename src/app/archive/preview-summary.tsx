import clsx from "clsx";
import { useEffect, useState } from "react";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { Appbar } from "@/components/common/appbar";
import { Arrow } from "@/components/common/arrow";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";
import { TArchiveView } from "@/types/archive";

type Props = {
  marbleNum: number;
  onChangeView: (view: TArchiveView) => void;
};

export const PreviewSummary = ({ marbleNum, onChangeView }: Props) => {
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
        onChangeView("marble-canvas");
      }, 1000),
    );
  };

  return (
    <DefaultLayout
      appbar={
        <Appbar
          left={
            <button onClick={() => onChangeView("preview-card")}>
              <ChevronLeftEdgeSVG />
            </button>
          }
        />
      }
    >
      <div>
        <Header
          text={`해당 게시물에 대해\\n{${marbleNum}개}의 칭찬구슬이 모였어요!`}
          className={clsx(
            "animate-fadeInUp",
            isScrolled && "animate-fadeOutUp",
          )}
        />
        <div
          className={clsx(
            "absolute bottom-0 left-0 h-[184px] w-full",
            isScrolled && "animate-fadeOut",
          )}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <div className="h-5" />
            <button onClick={onClickNext}>
              <Arrow className="rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
