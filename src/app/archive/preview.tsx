import { MarbleCard } from "@/components/app/archive/marble-card";
import { Arrow } from "@/components/common/arrow";
import { DefaultLayout } from "@/components/layout/default";
import { TArchiveView } from "@/types/archive";

type Props = {
  onChangeView: (view: TArchiveView) => void;
};

export const Preview = ({ onChangeView }: Props) => {
  return (
    <DefaultLayout appbar={<div>appBar</div>}>
      <div className="flex flex-col gap-9">
        <p className="text-xl font-semibold text-primary">나의 칭찬게시물</p>
        <MarbleCard />
      </div>
      <div className="bg-archive-preview absolute bottom-0 left-0 h-184px w-full bg-cover">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <div className="w-fit text-sm font-semibold text-slate-600">
            스크롤해서 칭찬 확인하기
          </div>
          <button onClick={() => onChangeView("canvas")}>
            <Arrow className="rotate-180" />
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};
