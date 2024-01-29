import { ButtonHTMLAttributes } from "react";

// Common/Confirm
export type MessageType = {
  title: string;
  description: string;
};

export type ButtonType = {
  text: string;
  onClick?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export type ConfirmType = {
  confirm: (
    message: MessageType,
    cancel: ButtonType,
    confirm?: ButtonType,
  ) => Promise<boolean>;
};

export type ConfirmDialogType = {
  message: MessageType;
  cancel: ButtonType;
  confirm?: ButtonType;
};
