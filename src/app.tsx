import "@/style/tailwindcss.css";
import "@/style/global.css";

import { AnimatePresence } from "framer-motion";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import { NotFound } from "./app/error/404";

import { QueryProvider } from "@/lib/query-provider";
import { Routers } from "@/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ErrorBoundary fallback={<NotFound />}>
        <AnimatePresence>
          <Routers />
        </AnimatePresence>
      </ErrorBoundary>
   </QueryProvider>
  </StrictMode>,
);
