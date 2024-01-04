import clsx from "clsx";

import { MarblesSVG } from "@/assets/imgs/marbles";

export const ButtonGroup = () => {
  return (
    <div className="">
      {/* 아래는 추후에 공통 버튼 컴포넌트로 변경될 영역 */}
      <div className="w-360px sticky bottom-0 mt-auto flex h-auto flex-col gap-y-2 bg-transparent pb-32px pt-12px ">
        <button className="text-b2-strong flex h-54px w-full items-center justify-center rounded-2 bg-[#242B37] py-16px text-white disabled:bg-gray-400 disabled:text-gray-500">
          칭찬 남기기
        </button>
        <button className="flex h-54px w-full items-center justify-center rounded-2 py-16px disabled:bg-gray-400 disabled:text-gray-500">
          나도 칭찬 받기
        </button>
      </div>

      {/* 이 영역은 버튼 뒤의 background 영역으로 유지됩니다 */}
      <div className="absolute bottom-0 left-0 -z-10 m-0 w-full p-0">
        <div
          className="absolute bottom-0 h-[184px] w-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.50) 0%, rgba(189, 224, 255, 0.50) 50.48%)",
            backgroundSize: "cover",
          }}
        />
        <MarblesSVG />
      </div>
    </div>
  );
};
