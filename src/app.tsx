import "@/style/tailwindcss.css";
import "@/style/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryProvider } from "@/lib/query-provider";
import { Routers } from "@/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Routers />
    </QueryProvider>
  </StrictMode>,
);
