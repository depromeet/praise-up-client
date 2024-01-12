import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { AlertSVG } from "@/assets/icons/snackbar/alert";
import { CheckSVG } from "@/assets/icons/snackbar/check";
import { WarningSVG } from "@/assets/icons/snackbar/warning";
import { createStore } from "@/utils/external-store/create";
import { useExternalStore } from "@/utils/external-store/hook";

type ToastObject = {
  content: ReactNode;
  type: "check" | "alert" | "warning";
  scroll: boolean;
};
const [store, setState] = createStore(new Map<string, ToastObject>());

const ToastRenderer = () => {
  const [stack] = useExternalStore(store);
  const isOpen = stack.size > 0;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const isScrollLayout = stack.values().next().value?.scroll as boolean;

  return (
    <dialog
      className={clsx(
        { "h-screen": isScrollLayout },
        "relative bg-transparent text-black",
      )}
      open={isOpen}
      ref={(el) => {
        if (el && !el.open) el.show();
      }}
    >
      <div className="absolute bottom-0 left-1/2 mb-[52px] flex -translate-x-1/2 flex-col gap-1">
        {Array.from(stack.entries()).map(([id, { content, type }]) => (
          <Toast type={type} key={id}>
            {content}
          </Toast>
        ))}
      </div>
    </dialog>
  );
};

// default toast
type ToastType = "check" | "alert" | "warning";
const Toast = ({
  type: _,
  children,
}: {
  type: ToastType;
} & PropsWithChildren) => {
  const ICON_STYLE = "h-[24px] w-[24px]";
  return (
    <div className="text-b3-strong flex items-center gap-2 whitespace-nowrap rounded-[100px] bg-gray-800 py-4 pl-4 pr-5 text-oncolor">
      {_ === "check" ? (
        <div className={ICON_STYLE}>
          <CheckSVG />
        </div>
      ) : _ === "alert" ? (
        <div className={ICON_STYLE}>
          <AlertSVG />
        </div>
      ) : (
        <div className={ICON_STYLE}>
          <WarningSVG />
        </div>
      )}
      {children}
    </div>
  );
};

type ToastOptions = {
  type?: ToastType;
  scroll?: boolean;
  delay?: number;
};
const defaultOptions = {
  type: "check",
  scroll: false,
  delay: 3000,
} as const;

export const toast = (content: ReactNode, options?: ToastOptions) => {
  const id = Math.random().toString(36).slice(2);
  const { type, scroll, delay } = { ...defaultOptions, ...(options ?? {}) };
  setState((prev) => new Map([...prev, [id, { content, scroll, type }]]));

  // remove toast after delay
  setTimeout(() => {
    setState((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, delay);

  return id;
};

createRoot(document.getElementById("toast-root")!).render(<ToastRenderer />);
