import "@/style/tailwindcss.css";
import "@/style/global.css";

import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from "framer-motion";
import { hydrateRoot, createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

import { NotFound } from "./app/error/404";
import { ConfirmDialog } from "./components/common/confirm/confirm-dialog";

import { QueryProvider } from "@/lib/query-provider";
import { Routers } from "@/routes";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

if (rootElement?.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <QueryProvider>
      <ConfirmDialog>
        <ErrorBoundary fallback={<NotFound />}>
          <AnimatePresence>
            <HelmetProvider>
              <Routers />
              <Analytics />
            </HelmetProvider>
          </AnimatePresence>
        </ErrorBoundary>
      </ConfirmDialog>
    </QueryProvider>,
  );
} else {
  root.render(
    <QueryProvider>
      <ConfirmDialog>
        <ErrorBoundary fallback={<NotFound />}>
          <AnimatePresence>
            <HelmetProvider>
              <Routers />
              <Analytics />
            </HelmetProvider>
          </AnimatePresence>
        </ErrorBoundary>
      </ConfirmDialog>
    </QueryProvider>,
  );
}
