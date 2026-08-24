import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import TanStackRouterVite from "@tanstack/router-plugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      autoGenerate: true,
      routeTreeFile: "./src/routeTree.gen.ts",
    }),
    tanstackStart({
      prerender: {
        routes: ["/"],
        crawlLinks: false,
      },
    }),
    viteReact(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    host: true,
    strictPort: false,
  },
  preview: {
    host: true,
  },
});
