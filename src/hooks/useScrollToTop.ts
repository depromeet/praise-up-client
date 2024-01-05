import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** 페이지를 이동할 때, 이전 스크롤을 초기화하고 싶을 경우에 사용하는 스크롤 훅 */
export function UseScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
