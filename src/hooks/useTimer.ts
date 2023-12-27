import { useEffect, useState } from "react";

// target 날짜 기준 남은 시간을 계산
function calculateTimeLeft(targetDate: Date) {
  const diff = +new Date(targetDate) - +new Date();

  let timeLeft = {};

  if (diff > 0) {
    timeLeft = {
      hour: Math.floor((diff / (1000 * 60 * 60)) % 24),
      min: Math.floor((diff / 1000 / 60) % 60),
      sec: Math.floor((diff / 1000) % 60),
    };
  }

  return timeLeft;
}

// count down timer
export function useTimer(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return { ...timeLeft };
}
