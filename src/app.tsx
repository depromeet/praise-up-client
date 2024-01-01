import "@/style/tailwindcss.css";
import "@/style/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Routers } from "@/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Routers />
  </StrictMode>,
);
