import tailwindcss from "@tailwindcss/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
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
    // use `mkcert` in development
    command === "serve" && mkcert(),
    tailwindcss(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    nitroV2Plugin({
      preset: "node-server",
      // Inline modules to avoid subpath-resolution issues with the Bun runtime
      // (better-auth 1.7's `@better-auth/utils` subpath exports are not traced
      // into the output when left external)
      externals: {
        inline: ["srvx", "react-dom", "better-auth", "@better-auth"],
      },
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
  ],
}));

export default config;
