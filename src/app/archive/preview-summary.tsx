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
  return (
    <DefaultLayout appbar={<Appbar left={<ChevronLeftEdgeSVG />} />}>
      <Header
        text={`해당 게시물에 대해\\n{${marbleNum}개}의 칭찬구슬이 모였어요!`}
      />
      <div className="absolute bottom-0 left-0 h-[184px] w-full">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <div className="w-fit text-sm font-semibold text-slate-600">
            스크롤해서 칭찬 확인하기
          </div>
          <button onClick={() => onChangeView("marble-canvas")}>
            <Arrow className="rotate-180" />
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};
