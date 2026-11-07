# syntax=docker/dockerfile:1@sha256:4edf897a3ffa55b89f906fc8cc78afdb3f1834cc9c7083565e611a8a7d5fe99e

FROM oven/bun:1.4.4@sha256:1d22548f177f4ff38e0c15baa3c2c46c6c2060ba2d1bc573bb4720b407548f1d AS base
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
ARG VITE_STRIPE_PORTAL_CONFIG_ID
ARG VITE_AUTHZ_API_URL
ARG VITE_AUTHZ_ENABLED
ARG VITE_FLAGS_API_HOST
ARG VITE_FLAGS_CLIENT_KEY

RUN bun run build

# Run (Node runtime needed for TanStack Start/Nitro)
FROM node:22-alpine@sha256:0e1754758c2df4cfa3e68d59e2e1b7374bb7fd9ea6328eaaacf15cc934af8202 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./
EXPOSE 3000
# Raise the max request-header size (default 16KB) so large many-workspace auth cookies do not trip HTTP 431
CMD ["node", "--max-http-header-size=65536", ".output/server/index.mjs"]
