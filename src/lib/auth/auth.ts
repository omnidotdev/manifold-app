import { createOmniOAuthConfig } from "@omnidotdev/providers/auth";
import { getCookie } from "@tanstack/react-start/server";
import { betterAuth } from "better-auth";
import { customSession, genericOAuth } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { authCache } from "@/lib/auth/authCache";
import {
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  AUTH_INTERNAL_URL,
  BASE_URL,
} from "@/lib/config/env.config";

const { AUTH_SECRET } = process.env;

/**
 * Auth server client.
 */
const auth = betterAuth({
  baseURL: BASE_URL,
  basePath: "/api/auth",
  secret: AUTH_SECRET,
  trustedOrigins: BASE_URL ? [BASE_URL] : [],
  session: {
    // extend session expiration to 30 days
    expiresIn: 60 * 60 * 24 * 30,
    // refresh session if older than 1 day
    updateAge: 60 * 60 * 24,
    // enable cookie caching for stateless session validation
    cookieCache: {
      enabled: true,
      // cache session in cookie for 7 days
      maxAge: 60 * 60 * 24 * 30,
      // use encrypted JWE for security
      strategy: "jwe",
      // auto-refresh cookie before expiry (critical for stateless mode)
      refreshCache: true,
    },
  },
  account: {
    // store OAuth tokens (access token, refresh token) in a signed cookie for stateless mode to enable automatic token refresh without a database
    storeAccountCookie: true,
  },
  advanced: {
    // use custom cookie prefix to avoid collision with IDP cookies
    cookiePrefix: "manifold",
  },
  plugins: [
    genericOAuth({
      config: [
        createOmniOAuthConfig({
          clientId: AUTH_CLIENT_ID!,
          clientSecret: AUTH_CLIENT_SECRET!,
          authBaseUrl: AUTH_BASE_URL!,
          authInternalUrl: AUTH_INTERNAL_URL!,
        }),
      ],
    }),
    customSession(async ({ user, session }) => {
      let identityProviderId: string | null = null;

      const cachedValue = getCookie(authCache.cookieName);
      if (cachedValue) {
        const cached = await authCache.decrypt(cachedValue);
        if (cached) {
          identityProviderId = cached.identityProviderId;
        }
      }

      return {
        user: {
          ...user,
          identityProviderId,
        },
        session,
      };
    }),

    // NB: must be the last plugin in the array
    tanstackStartCookies(),
  ],
});

export default auth;
