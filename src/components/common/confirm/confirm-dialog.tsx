import { ReactNode, useState } from "react";

import { Confirm } from "./confirm";
import { ConfirmContext } from "./confirm-context";

import { MessageType, ButtonType, ConfirmDialogType } from "@/types/common";

export const ConfirmDialog = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ConfirmDialogType>();

  const confirm = (
    message: MessageType,
    confirm: ButtonType,
    cancel: ButtonType,
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        message,
        confirm: {
          ...confirm,
          onClick: () => {
            setState(undefined);
            resolve(true);
          },
        },
        cancel: {
          ...cancel,
          onClick: () => {
            setState(undefined);
            resolve(false);
          },
        },
      });
    });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state && (
        <Confirm
          message={state.message}
          confirm={state.confirm}
          cancel={state.cancel}
        />
      )}
    </ConfirmContext.Provider>
  );
};
