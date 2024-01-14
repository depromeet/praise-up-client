import clsx from "clsx";
import {
  PropsWithChildren,
  useEffect,
  useState,
  Children,
  isValidElement,
  cloneElement,
  useRef,
} from "react";

import { ButtonProps, FilledButton } from "./fiiled-button";

import { handleKakaoLogin } from "@/components/app/login/kakao/kakao-login";

const Primary = (props: ButtonProps) => {
  return <FilledButton {...props} colorSchema="primary" />;
};

const White = (props: ButtonProps) => {
  return <FilledButton {...props} colorSchema="white" />;
};

export const ButtonProvider = ({
  children,
  className,
  isOnBoarding = false,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const [isFullStyle, setisFullStyle] = useState(false);
  const initialKeyboardHeight = useRef(0);
  const previousKeyboardHeight = useRef(0);

  const handleTouchEnd = () => {
    (document.activeElement as HTMLElement).blur();
  };

  useEffect(() => {
    if (!props.isFull) return;
    const windowViewPortHeight: number = window.innerHeight;

    /** 뷰포트가 리사이징될 때 키보드를 감지하여 스크롤을 이동시켜주는 함수 */
    const handleVisualViewPortResize = () => {
      const visualViewportHeight = Number(window.visualViewport?.height);
      const isOpen = Math.ceil(visualViewportHeight) < windowViewPortHeight;

      if (!window.visualViewport || !window.document.scrollingElement) return;

      if (isOpen) {
        const scrollHeight = window.document.scrollingElement.scrollHeight;
        const scrollTop = scrollHeight - window.visualViewport.height;

        if (initialKeyboardHeight.current === 0) {
          initialKeyboardHeight.current = scrollTop;
        }

        const scrollTarget =
          previousKeyboardHeight.current > scrollTop
            ? initialKeyboardHeight.current
            : scrollTop;
        window.scrollTo(0, scrollTarget);

        previousKeyboardHeight.current = scrollTop;
      }

      setisFullStyle(isOpen);
    };

    if (window.visualViewport) {
      window.visualViewport.onresize = handleVisualViewPortResize;
    }

    document.body.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.body.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      className={clsx(
        "sticky bottom-0 mt-auto flex h-auto w-auto flex-col gap-y-2 bg-white pb-32px pt-12px",
        isFullStyle && "-mx-[22px] !p-0",
        className,
      )}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { isFullStyle, ...props });
        }
      })}
      {isOnBoarding && (
        <div className="text-b3-strong mt-[18px] flex w-full justify-center gap-x-3">
          <div className="text-teritary">이미 가입했다면?</div>
          <div
            className="cursor-pointer text-active"
            onClick={handleKakaoLogin}
          >
            로그인하기
          </div>
        </div>
      )}
    </div>
  );
};

ButtonProvider.Primary = Primary;
ButtonProvider.White = White;
