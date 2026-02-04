const env = { ...import.meta.env, ...process.env };

/**
 * Environment variables.
 */
export const {
  // core
  VITE_BASE_URL: BASE_URL,
  VITE_API_BASE_URL: API_BASE_URL,
  VITE_AUTH_BASE_URL: AUTH_BASE_URL,
  VITE_SELF_HOSTED,
  SELF_HOSTED,
  // auth (server-side secrets)
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  // billing
  VITE_BILLING_BASE_URL: BILLING_BASE_URL,
  // payment processing
  VITE_STRIPE_PORTAL_CONFIG_ID: STRIPE_PORTAL_CONFIG_ID,
  // authorization
  VITE_AUTHZ_API_URL: AUTHZ_API_URL,
  VITE_AUTHZ_ENABLED: AUTHZ_ENABLED,
} = env;

// Feature flags
export const FLAGS_API_HOST = env.FLAGS_API_HOST || env.VITE_FLAGS_API_HOST;
export const FLAGS_CLIENT_KEY =
  env.FLAGS_CLIENT_KEY || env.VITE_FLAGS_CLIENT_KEY;

export const API_GRAPHQL_URL = `${API_BASE_URL}/graphql`;

// environment helpers
export const isDevEnv = import.meta.env.DEV;
export const isSelfHosted =
  SELF_HOSTED === "true" || VITE_SELF_HOSTED === "true";
