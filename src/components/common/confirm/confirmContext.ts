import { createContext } from "react";

export type MessageType = {
  title: string;
  description: string;
};

type ConfirmType = {
  confirm: (message: MessageType) => Promise<boolean>;
};

export const ConfirmContext = createContext<ConfirmType>({
  confirm: () => new Promise((_, reject) => reject()),
});
