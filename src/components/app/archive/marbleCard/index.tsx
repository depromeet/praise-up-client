import clsx from "clsx";

export const MarbleCard = () => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-gray-100 p-4 pt-5">
      <div className="flex flex-col gap-0.5 text-lg">
        <p className="text-gray-500 ">지영님이 칭찬 받을</p>
        <div>
          <span className="font-semibold text-gray-700">센스있는</span>
          <span className="text-gray-500"> 순간</span>
        </div>
      </div>
      {/* background black은 임시 */}
      <div
        className={clsx(
          "after:block after:pb-[calc(100%)]",
          "relative box-border w-full rounded-xl bg-black",
        )}
      >
        <div className="absolute flex h-full w-full flex-col justify-end gap-2 p-18px">
          <div className="text-white ">
            한시간만에 뚝딱 완성한 나의 첫 요리 😆
            <br />
            간단한 요리지만 너무 뿌듯하다!
          </div>
          <p className="text-sm text-white ">23.12.09</p>
        </div>
      </div>
    </div>
  );
};
