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
      className="bg-white p-16px backdrop:bg-black/60"
    >
      <form method="dialog">{children}</form>
    </BaseModal>
  );
};

export const useModal = () => {
  const [dialog, setDialog] = useState<ReactNode | null>(null);

  const modal = (content: ReactNode, callback?: () => void) => {
    return new Promise((resolve) => {
      setDialog(
        <Modal onOpen={callback} onClose={(v) => resolve(v)}>
          {content}
        </Modal>,
      );
    });
  };

  const render = () => {
    return dialog
      ? createPortal(dialog, document.getElementById("modal-root")!)
      : null;
  };

  return [render, modal] as const;
};
