# syntax=docker/dockerfile:1

FROM oven/bun:1.4.4 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG VITE_BASE_URL
ARG VITE_API_BASE_URL
ARG VITE_AUTH_BASE_URL
ARG VITE_BILLING_BASE_URL
ARG VITE_CONSOLE_URL
ARG VITE_AUTHZ_API_URL
ARG VITE_AUTHZ_ENABLED
ARG VITE_FLAGS_API_HOST
ARG VITE_FLAGS_CLIENT_KEY

RUN bun run build

# Run (Node runtime needed for TanStack Start/Nitro)
FROM node:26-alpine@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./
EXPOSE 3000
# Raise the max request-header size (default 16KB) so large many-workspace auth cookies do not trip HTTP 431
CMD ["node", "--max-http-header-size=65536", ".output/server/index.mjs"]
