import { useState, useEffect } from "react";

import { useInterval } from "./useInterval";

interface TimeLeftType {
  hour: number;
  min: number;
  sec: number;
}

interface useTimerProps {
  openDatetime: string;
}

export function useTimer({ openDatetime }: useTimerProps) {
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
    setDiff((diff) => diff - 1);
    setTimeLeft((prev) => ({
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

  return { diff, timeLeft };
}
