# syntax=docker/dockerfile:1

FROM oven/bun:1 AS base
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
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
