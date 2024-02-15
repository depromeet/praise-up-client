import { ReactNode, useState } from "react";

import { Confirm } from "./confirm";
import { ConfirmContext } from "./confirm-context";

import { ConfirmDialogType } from "@/types/common";

export const ConfirmDialog = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ConfirmDialogType>();

  const confirm = (buttonState: ConfirmDialogType): Promise<boolean> => {
    const { message, confirm, cancel, icon } = buttonState;
    return new Promise((resolve) => {
      setState({
        message,
        confirm: confirm && {
          ...confirm,
          onClick: () => {
            setState(undefined);
            resolve(true);
          },
        },
        cancel: cancel && {
          ...cancel,
          onClick: () => {
            setState(undefined);
            resolve(false);
          },
        },
        icon,
      });
    });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state && <Confirm {...state} />}
    </ConfirmContext.Provider>
  );
};
