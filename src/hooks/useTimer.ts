import { useState, useEffect } from "react";

import { useInterval } from "./useInterval";

interface TimeLeftType {
  hour: number;
  min: number;
  sec: number;
}

export function useTimer(openDatetime: string) {
  const [delay, setDelay] = useState<number | null>(1000);
  const [diff, setDiff] = useState(() =>
    Math.floor((+new Date(openDatetime) - +new Date()) / 1000),
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeftType>({
    hour: 0,
    min: 0,
    sec: 0,
  });

  useInterval(
    () => {
      setDiff((diff) => diff - 1);
      setTimeLeft(() => ({
        hour: Math.floor((diff / (60 * 60)) % 24),
        min: Math.floor((diff / 60) % 60),
        sec: Math.floor(diff % 60),
      }));
    },
    diff >= 0 ? delay : null,
  );

  return { diff, timeLeft };
}
