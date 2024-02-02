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
  confirm: (buttonState: ConfirmDialogType) => Promise<boolean>;
};

export type ConfirmDialogType = {
  message: MessageType;
  confirm?: ButtonType;
  cancel?: ButtonType;
};
