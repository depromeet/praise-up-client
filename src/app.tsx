import "@/style/tailwindcss.css";
import "@/style/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { GlobalPortal } from "@/GlobalPortal";
import { Routers } from "@/routes";

createRoot(document.getElementById("root")!).render(
  <GlobalPortal.Provider>
    <StrictMode>
      <Routers />
    </StrictMode>
  </GlobalPortal.Provider>,
);
