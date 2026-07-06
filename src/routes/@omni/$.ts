/**
 * Proxy route for /@omni/* web content.
 * Handles requests as a server-only API route, proxying to the manifold API.
 */

import { createFileRoute } from "@tanstack/react-router";

import { API_BASE_URL } from "@/lib/config/env.config";

export const Route = createFileRoute("/@omni/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { pathname } = new URL(request.url);
        const apiUrl = `${API_BASE_URL}${pathname}`;

        const upstream = await fetch(apiUrl);

        return new Response(upstream.body, {
          status: upstream.status,
          headers: {
            "Content-Type":
              upstream.headers.get("Content-Type") ??
              "application/octet-stream",
            "Cache-Control":
              upstream.headers.get("Cache-Control") ?? "public, max-age=300",
          },
        });
      },
    },
  },
});
