import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";
import { VitePluginRadar } from "vite-plugin-radar";
import path from "path";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePluginRadar({
      enableDev: true,
      analytics: [
        {
          id: process.env.VITE_GA_TRACKING_ID,
          config: {
            cookie_domain: "auto",
            cookie_expires: 63072000,
            cookie_prefix: "none",
            cookie_update: true,
            cookie_flags: "",
            send_page_view: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: true,
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
