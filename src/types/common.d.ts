// Common/Confirm
export type MessageType = {
  title: string;
  description: string;
};

export type ButtonType = {
  text: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export type ConfirmType = {
  confirm: (
    message: MessageType,
    confirm: ButtonType,
    cancel: ButtonType,
  ) => Promise<boolean>;
};
