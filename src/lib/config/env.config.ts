// Build-time vars take precedence to prevent SSR hydration mismatch
const env =
  typeof window === "undefined"
    ? { ...process.env, ...import.meta.env }
    : import.meta.env;

/**
 * Environment variables.
 */
export const {
  // core
  VITE_BASE_URL: BASE_URL,
  VITE_API_BASE_URL: API_BASE_URL,
  VITE_AUTH_BASE_URL: AUTH_BASE_URL,
  VITE_ACCOUNT_URL: ACCOUNT_URL,
  // auth (server-side secrets)
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,

  // billing
  VITE_BILLING_BASE_URL: BILLING_BASE_URL,
  // authorization
  VITE_AUTHZ_API_URL: AUTHZ_API_URL,
  VITE_AUTHZ_ENABLED: AUTHZ_ENABLED,
} = env;

// Internal auth URL for server-to-server communication (Docker service name)
// Falls back to AUTH_BASE_URL for non-Docker environments
export const AUTH_INTERNAL_URL =
  typeof window === "undefined"
    ? process.env.AUTH_INTERNAL_URL || AUTH_BASE_URL
    : AUTH_BASE_URL;

// Aether service key for server-side entitlement reads. Server-only (no VITE_
// prefix, never read in the browser) so it is never shipped in the bundle
export const BILLING_SERVICE_API_KEY =
  typeof window === "undefined"
    ? process.env.BILLING_SERVICE_API_KEY
    : undefined;

export const CONSOLE_URL = import.meta.env.VITE_CONSOLE_URL;

// Feature flags
export const FLAGS_API_HOST = env.FLAGS_API_HOST || env.VITE_FLAGS_API_HOST;
export const FLAGS_CLIENT_KEY =
  env.FLAGS_CLIENT_KEY || env.VITE_FLAGS_CLIENT_KEY;

export const API_GRAPHQL_URL = `${API_BASE_URL}/graphql`;

// environment helpers
export const isDevEnv = import.meta.env.DEV;
export const hasBilling = !!BILLING_BASE_URL;

// Startup warnings for optional integrations
if (!BILLING_BASE_URL)
  console.warn("BILLING_BASE_URL not set, billing disabled");
if (
  typeof window === "undefined" &&
  BILLING_BASE_URL &&
  !BILLING_SERVICE_API_KEY
)
  console.warn(
    "BILLING_SERVICE_API_KEY not set, plan entitlement reads disabled",
  );
if (!AUTHZ_API_URL)
  console.warn("AUTHZ_API_URL not set, authorization disabled");
if (!FLAGS_API_HOST)
  console.warn("FLAGS_API_HOST not set, feature flags disabled");
