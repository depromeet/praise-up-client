import { ReactNode, useState } from "react";

import { Confirm } from "./confirm";
import { ConfirmContext, MessageType } from "./confirmContext";

type ConfirmDialogType = {
  message: MessageType;
  onClickConfirm: () => void;
  onClickCancel: () => void;
};

export const ConfirmDialog = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ConfirmDialogType>();

  const confirm = (message: MessageType): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        message,
        onClickConfirm: () => {
          setState(undefined);
          resolve(true);
        },
        onClickCancel: () => {
          setState(undefined);
          resolve(false);
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
          onClickConfirm={state.onClickConfirm}
          onClickCancel={state.onClickCancel}
        />
      )}
    </ConfirmContext.Provider>
  );
};
