import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  // for callback에서 사용하는 state을 최신으로 유지
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // for callback이 delay없이 바로 동작
  useEffect(() => {
    const id = setTimeout(() => {
      if (typeof savedCallback.current === "function") savedCallback.current();
    });
    return () => clearTimeout(id);
  }, []);

  // for 주기적으로 callback을 실행
  useEffect(() => {
    if (delay === null) return;

    function tick() {
      if (typeof savedCallback.current === "function") savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
