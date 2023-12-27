import { MarbleCard } from "@/components/app/marbleCard";
import { Arrow } from "@/icons/arrow";

export const Preview = () => {
  return (
    <>
      <div className="flex flex-col gap-9">
        <p className="text-xl font-semibold text-gray-800">
          공개 예정 칭찬게시물
        </p>
        <MarbleCard />
      </div>
      <div className="absolute bottom-0 left-0 h-[184px] w-full bg-[url('/src/assets/marble_bg.png')] bg-cover">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <div className="w-fit text-center text-sm font-semibold text-slate-500">
            스크롤해서 칭찬 확인하기
          </div>
          <Arrow />
        </div>
      </div>
    </>
  );
};
