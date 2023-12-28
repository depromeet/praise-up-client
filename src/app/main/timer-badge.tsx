import { useEffect, useState } from "react";

import { useInterval } from "@/hooks/useInterval";

interface TimeLeftType {
  hour: number;
  min: number;
  sec: number;
}

export const Timer = ({ openDatetime }: { openDatetime: string }) => {
  const [delay, setDelay] = useState<number | null>(1000);
  const [diff, setDiff] = useState(() =>
    Math.floor((+new Date(openDatetime) - +new Date()) / 1000),
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeftType>({
    hour: 0,
    min: 0,
    sec: 0,
  });

  useInterval(() => {
    console.log(diff);
    setDiff((diff) => diff - 1);
    setTimeLeft((prev) => ({
      ...prev,
      hour: Math.floor((diff / (60 * 60)) % 24),
      min: Math.floor((diff / 60) % 60),
      sec: Math.floor(diff % 60),
    }));
  }, delay);

  useEffect(() => {
    if (diff <= 0) {
      setDelay(null);
    }
  }, [diff]);

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
