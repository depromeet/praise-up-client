import { PropsWithChildren, ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { ErrorSVG } from "@/assets/icons/snackbar/error";
import { SuccessSVG } from "@/assets/icons/snackbar/success";
import { WarningSVG } from "@/assets/icons/snackbar/warning";
import { createStore } from "@/utils/external-store/create";
import { useExternalStore } from "@/utils/external-store/hook";

type ToastObject = {
  content: ReactNode;
  type: "success" | "error" | "warning";
};
const [store, setState] = createStore(new Map<string, ToastObject>());

const ToastRenderer = () => {
  const [stack] = useExternalStore(store);
  const isOpen = stack.size > 0;

  return (
    <dialog
      className="relative bg-transparent text-black"
      open={isOpen}
      ref={(el) => {
        if (el && !el.open) el.show();
      }}
    >
      <div className=" fixed bottom-0 left-1/2 mb-[52px] flex -translate-x-1/2 flex-col gap-1">
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
type ToastType = "success" | "error" | "warning";
const Toast = ({
  type,
  children,
}: {
  type: ToastType;
} & PropsWithChildren) => {
  const ICON_STYLE = "h-[24px] w-[24px]";
  return (
    <div className="text-b3-strong flex animate-fadeInUp items-center gap-2 whitespace-nowrap rounded-[100px] bg-gray-800 py-4 pl-4 pr-5 text-oncolor">
      <div className={ICON_STYLE}>
        {
          {
            success: <SuccessSVG />,
            error: <ErrorSVG />,
            warning: <WarningSVG />,
          }[type]
        }
      </div>
      {children}
    </div>
  );
};

type ToastOptions = {
  type?: ToastType;
  delay?: number;
};
const defaultOptions = {
  type: "success",
  delay: 3000,
} as const;

export const toast = (content: ReactNode, options?: ToastOptions) => {
  const id = Math.random().toString(36).slice(2);
  const { type, delay } = { ...defaultOptions, ...(options ?? {}) };
  setState((prev) => new Map([...prev, [id, { content, type }]]));

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
