import clsx from "clsx";
import {
  PropsWithChildren,
  useEffect,
  useState,
  Children,
  isValidElement,
  cloneElement,
} from "react";

import { ButtonProps, FilledButton } from "./FilledButton";

const Primary = (props: ButtonProps) => {
  return <FilledButton {...props} colorSchema="primary" />;
};

const White = (props: ButtonProps) => {
  return <FilledButton {...props} colorSchema="white" />;
};

export const ButtonProvider = ({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  let isFocus = false;
  const [isFullStyle, setisFullStyle] = useState(false);
  let initialKeyboardHeight = 0;
  let previousKeyboardHeight = 0;

  const handleTouchEnd = () => {
    (document.activeElement as HTMLElement).blur();
  };

  useEffect(() => {
    if (props.isFull) {
      const currentWindowViewPort: number = window.innerHeight;

      /** 뷰포트가 리사이징될 때 키보드를 감지하여 스크롤을 이동시켜주는 함수 */
      const handleVisualViewPortResize = () => {
        const currentVisualViewport = Number(window.visualViewport?.height);
        const eventName =
          Math.ceil(currentVisualViewport) < currentWindowViewPort
            ? "keyboardopen"
            : "keyboardclose";

        if (eventName === "keyboardopen") {
          if (window.document.scrollingElement && window.visualViewport) {
            const scrollHeight = window.document.scrollingElement.scrollHeight;
            const scrollTop = scrollHeight - window.visualViewport.height;

            if (initialKeyboardHeight === 0) {
              initialKeyboardHeight = scrollTop;
            }

            if (previousKeyboardHeight > scrollTop) {
              window.scrollTo(0, initialKeyboardHeight);
            } else {
              window.scrollTo(0, scrollTop);
            }
            previousKeyboardHeight = scrollTop;
          }
          isFocus = true;
        } else {
          isFocus = false;
        }

        setisFullStyle(isFocus);
      };

      if (window.visualViewport) {
        window.visualViewport.onresize = handleVisualViewPortResize;
      }
      document.body.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.body.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

  return (
    <div
      className={clsx(
        "w-360px sticky bottom-0 mt-auto flex h-auto flex-col gap-y-2 bg-transparent pb-32px pt-12px",
        isFullStyle && "-mx-[22px] !pb-0px transition-all duration-100",
      )}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { isFullStyle, ...props });
        }
      })}
    </div>
  );
};

ButtonProvider.Primary = Primary;
ButtonProvider.White = White;
