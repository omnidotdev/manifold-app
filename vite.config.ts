import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import viteTsConfigPaths from "vite-tsconfig-paths";

/**
 * Vite configuration.
 * @see https://vite.dev/config
 */
const config = defineConfig(({ command }) => ({
  server: {
    port: Number(process.env.PORT) || 3000,
    strictPort: true,
    host: "0.0.0.0",
  },
  plugins: [
    devtools(),
    // use `mkcert` in development
    command === "serve" && mkcert(),
    nitroV2Plugin({
      preset: "node-server",
      // Security and cache-hygiene response headers applied to every production
      // response. Permissions-Policy denies powerful features by default and the
      // Cache-Control revalidates rather than serving stale content
      routeRules: {
        "/**": {
          headers: {
            "Permissions-Policy": "geolocation=(), camera=(), microphone=()",
            "Cache-Control": "public, max-age=0, must-revalidate",
          },
        },
      },
    }),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
}));

export default config;
