import { useTimer } from "@/hooks/useTimer";

export const TimerBadge = ({ openDatetime }: { openDatetime: string }) => {
  const { diff, timeLeft } = useTimer(openDatetime);

  return (
    <div className="flex items-center justify-center gap-0.5 rounded-3 bg-[#ffffffcc] px-6 py-4 text-gray-800 backdrop-blur-[10px] ">
      {diff <= 0 ? (
        <span>이제 칭찬 구슬을 볼 수 있어요!</span>
      ) : (
        <>
          <span className="text-num-b2-strong">
            {timeLeft.hour.toString().padStart(2, "0")}:
            {timeLeft.min.toString().padStart(2, "0")}:
            {timeLeft.sec.toString().padStart(2, "0")}
          </span>
          <span className="text-b3-compact">이후 반응을 볼 수 있어요</span>
        </>
      )}
    </div>
  );
};
