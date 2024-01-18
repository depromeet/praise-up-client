import _ from "lodash";
import { useState, useEffect, useCallback } from "react";

interface IUseWindowScrollYProps {
  point?: number;
}

export const useWindowScrollY = ({ point = 0 }: IUseWindowScrollYProps) => {
  const [isDown, setIsDown] = useState(false);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [isOverflow, setIsOverflow] = useState(false);

  const onScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsOverflow(() => point < currentScrollY);
    setScrollY((prevScrollY) => {
      setIsDown(() => prevScrollY <= currentScrollY);
      return currentScrollY;
    });
  }, [setScrollY, setIsDown, setIsOverflow, point]);

  useEffect(() => {
    window.addEventListener("scroll", _.debounce(onScroll, 50));

    return () => {
      window.removeEventListener("scroll", _.debounce(onScroll, 50));
    };
  }, [onScroll]);

  return { isDown, isOverflow, scrollY };
};
