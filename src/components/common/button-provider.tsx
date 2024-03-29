import clsx from "clsx";
import Cookies from "js-cookie";
import {
  PropsWithChildren,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
  useRef,
  useState,
} from "react";

import { ButtonProps, FilledButton } from "./fiiled-button";

import { InformationSVG } from "@/assets/icons/information";
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
  isGuideExternalBrowser = false,
  isOnBoarding = false,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const [isFullStyle, setisFullStyle] = useState(false);
  const initialKeyboardHeight = useRef(0);
  const previousKeyboardHeight = useRef(0);
  const lastHeightRef = useRef("");

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
        const focusNode = document.activeElement;
        const scrollHeight = window.document.scrollingElement.scrollHeight;
        const scrollTop = scrollHeight - window.visualViewport.height;

        if (focusNode?.nodeName.toLowerCase() === "textarea") {
          const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
              if (
                mutation.type === "attributes" &&
                mutation.attributeName === "style"
              ) {
                const currentHeight = (focusNode as HTMLElement).style.height;
                if (lastHeightRef.current !== currentHeight) {
                  if (
                    !window.visualViewport ||
                    !window.document.scrollingElement
                  )
                    return;
                  const scrollHeight =
                    window.document.scrollingElement.scrollHeight;
                  const scrollTop = scrollHeight - window.visualViewport.height;
                  // console.log(`Height 변경됨: ${scrollTop}`);
                  initialKeyboardHeight.current = scrollTop;
                  lastHeightRef.current = currentHeight;
                }
              }
            }
          });

          observer.observe(focusNode, {
            attributes: true,
            attributeFilter: ["style"],
          });
        }

        if (focusNode?.nodeName.toLowerCase() === "input") {
          return;
        }

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
        "sticky bottom-0 -mx-5 mt-auto flex h-auto w-auto flex-col gap-y-2 border-none bg-white px-20px pb-28px pt-12px",
        // isFullStyle && "pb-12px",
        className,
      )}
    >
      {isGuideExternalBrowser && Cookies.get("isEnternalBrowser") ? (
        <div className="mb-[2px] flex w-full items-center justify-center">
          <div className="flex items-center justify-center gap-[4px]">
            <InformationSVG />
            <span className="text-b3-long text-teritary">
              시스템 브라우저에서의 사용을 권장해요
            </span>
          </div>
        </div>
      ) : null}
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { isFullStyle, ...props });
        }
      })}
      {isOnBoarding && (
        <div className="text-b3-strong mt-[10px] flex w-full justify-center gap-x-3">
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
