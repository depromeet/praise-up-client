import { MarbleCard } from "@/components/app/marbleCard";
import { DefaultLayout } from "@/components/layout/default";
import { Arrow } from "@/icons/arrow";
import { MarbleBg } from "@/icons/marbleBg";

export const Archive = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <p className="text-xl font-semibold text-gray-800">
          공개 예정 칭찬게시물
        </p>
        <MarbleCard />
      </div>
      <div className="absolute bottom-0 left-0 h-[184px] w-full bg-gradient-to-b from-white to-cyan-200">
        {/* TODO: background image <MarbleBg /> */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <div className="w-fit text-center text-sm font-semibold text-slate-500">
            스크롤해서 칭찬 확인하기
          </div>
          <Arrow />
        </div>
      </div>
    </DefaultLayout>
  );
};
