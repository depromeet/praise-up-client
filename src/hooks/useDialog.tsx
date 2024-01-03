import {
  DialogHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";
import { createPortal } from "react-dom";

const BaseModal = ({
  children,
  onOpen,
  onClose,
  ...props
}: {
  onOpen?: () => void;
  onClose: (value: string) => void;
} & Omit<DialogHTMLAttributes<HTMLDialogElement>, "open" | "onClose"> &
  PropsWithChildren) => {
  return (
    <dialog
      ref={(el) => {
        if (!el || el.open) return;
        el.showModal();
        el.addEventListener("close", () => onClose(el.returnValue), {
          once: true,
        });
        onOpen?.();
      }}
      {...props}
    >
      {children}
    </dialog>
  );
};

// default modal wrapper
const Modal = ({
  children,
  onOpen,
  onClose,
}: {
  onOpen?: () => void;
  onClose: (value: string) => void;
} & PropsWithChildren) => {
  return (
    <BaseModal
      onOpen={onOpen}
      onClose={onClose}
      className="p-16px backdrop:bg-black/60"
    >
      <form method="dialog">{children}</form>
    </BaseModal>
  );
};

// default toast wrapper
const Toast = ({
  delay,
  onOpen,
  children,
}: {
  delay: number;
  onOpen: () => void;
} & PropsWithChildren) => (
  <dialog
    ref={(el) => {
      if (!el || el.open) return;
      el.showModal();
      setTimeout(() => el.close(), delay);
      onOpen();
    }}
  >
    {children}
  </dialog>
);

export const useDialog = () => {
  const [dialog, setContent] = useState<ReactNode | null>(null);

  const modal = (content: ReactNode, onOpen?: () => void) => {
    return new Promise((resolve) => {
      setContent(
        <Modal onOpen={onOpen} onClose={(v) => resolve(v)}>
          {content}
        </Modal>,
      );
    });
  };

  const toast = (content: ReactNode, delay = 3000) => {
    return new Promise((resolve) => {
      setContent(
        <Toast delay={delay} onOpen={() => resolve(null)}>
          <div>{content}</div>
        </Toast>,
      );
    });
  };

  const render = () => {
    return dialog
      ? createPortal(dialog, document.getElementById("dialog-root")!)
      : null;
  };

  return [render, { modal, toast }] as const;
};
