import { PropsWithChildren, ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { createStore } from "@/utils/external-store/create";
import { useExternalStore } from "@/utils/external-store/hook";

type ToastObject = {
  content: ReactNode;
  type: "success" | "error" | "warning" | "info";
};
const [store, setState] = createStore(new Map<string, ToastObject>());

const ToastRenderer = () => {
  // TODO: need to style this
  const [stack] = useExternalStore(store);
  const isOpen = stack.size > 0;

  return (
    <dialog
      className="bg-transparent text-black"
      open={isOpen}
      ref={(el) => {
        if (el && !el.open) el.show();
      }}
    >
      <div className="flex flex-col">
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
type ToastType = "success" | "error" | "warning" | "info";
const Toast = ({
  type: _,
  children,
}: {
  type: ToastType;
} & PropsWithChildren) => {
  // TODO: need to style
  return <div className="bg-black">{children}</div>;
};

type ToastOptions = {
  type?: ToastType;
  delay?: number;
};
const defaultOptions = {
  type: "info",
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
