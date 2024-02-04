import { useEffect, useState } from "react";

import { useInterval } from "./useInterval";

export interface TimeLeftType {
  hour: number;
  min: number;
  sec: number;
}

export function useTimer(openDatetime: Date, deps?: unknown[]) {
  const [delay] = useState<number | null>(1000);
  const [diff, setDiff] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeftType>({
    hour: 0,
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    if (!openDatetime) return;
    setDiff(Math.floor((+openDatetime - +new Date()) / 1000));
  }, deps);

  useInterval(
    () => {
      setDiff((diff) => diff - 1);
      setTimeLeft({
        hour: Math.floor((diff / (60 * 60)) % 48),
        min: Math.floor((diff / 60) % 60),
        sec: Math.floor(diff % 60),
      });
    },
    diff >= 0 ? delay : null,
  );

  return { diff, timeLeft };
}
