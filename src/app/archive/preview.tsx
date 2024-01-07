import Arrow from "@/assets/icons/arrow.svg?react";
import { MarbleCard } from "@/components/app/archive/marbleCard";
import { DefaultLayout } from "@/components/layout/default";

export const Preview = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <p className="text-xl font-semibold text-primary">나의 칭찬게시물</p>
        <MarbleCard />
      </div>
      <div className="absolute bottom-0 left-0 h-184px w-full bg-marble-preview bg-cover">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <div className="w-fit text-sm font-semibold text-slate-600">
            스크롤해서 칭찬 확인하기
          </div>
          <Arrow />
        </div>
      </div>
    </DefaultLayout>
  );
};
