import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gugudata.github.io",
  base: "/gugudata-io",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return pathname === "/gugudata-io/" || pathname.startsWith("/gugudata-io/guides/");
      }
    })
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
      wrap: true
    }
  }
});
