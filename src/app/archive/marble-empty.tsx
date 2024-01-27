import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { Appbar } from "@/components/common/appbar";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";
import { TArchiveView } from "@/types/archive";

type Props = {
  onChangeView: (view: TArchiveView) => void;
};

export const MarbleEmpty = ({ onChangeView }: Props) => {
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
      <Header
        text="해당 게시물에는\n칭찬 구슬이 모이지 않았어요"
        className="animate-fadeInUp"
      />
      <div className="flex h-full w-full flex-1">
        <div className="flex flex-1 flex-col items-center justify-center gap-[10px] pb-[128px]">
          <div className="bg-archive-marble-empty-case h-120px w-120px" />
          <p className="font-semibold text-teritary">
            새 게시물을 작성해 칭찬 구슬을 모아보세요
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};
