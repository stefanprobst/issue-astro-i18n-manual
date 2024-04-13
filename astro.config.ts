import node from "@astrojs/node";
import { defineConfig } from "astro/config";

import { defaultLocale, locales } from "./src/config/i18n.config";

export default defineConfig({
  adapter: node({ mode: "standalone" }),
  i18n: {
    defaultLocale,
    locales,
    routing: "manual",
  },
  output: "hybrid",
  server: { port: 3000 },
});
