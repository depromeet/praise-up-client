import _ from "lodash";
import { useState, useEffect, useCallback, RefObject } from "react";

interface IUseWindowScrollYProps {
  point?: number;
  scrollRef: RefObject<HTMLDivElement>;
}

export const useWindowScrollY = ({
  point = 0,
  scrollRef,
}: IUseWindowScrollYProps) => {
  const [isDown, setIsDown] = useState(false);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [isOverflow, setIsOverflow] = useState(false);

  const onScroll = useCallback(() => {
    const currentScrollY = scrollRef.current?.scrollTop || 0;

    setScrollY((prevScrollY) => {
      setIsDown(() => prevScrollY <= currentScrollY);
      setIsOverflow(() => point < currentScrollY);
      return currentScrollY;
    });
  }, [setScrollY, setIsDown, setIsOverflow, point, scrollRef]);

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", _.debounce(onScroll, 50));

    return () => {
      scrollRef.current?.removeEventListener(
        "scroll",
        _.debounce(onScroll, 50),
      );
    };
  }, [onScroll, scrollRef]);

  return { isDown, isOverflow, scrollY };
};
