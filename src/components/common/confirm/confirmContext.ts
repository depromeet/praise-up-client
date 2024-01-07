import { createContext } from "react";

import { ConfirmType } from "@/types/default";

export const ConfirmContext = createContext<ConfirmType>({
  confirm: () => new Promise((_, reject) => reject()),
});
