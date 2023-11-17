import "@/style/tailwindcss.css";
import "@/style/global.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { Routers } from "@/routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>,
);
