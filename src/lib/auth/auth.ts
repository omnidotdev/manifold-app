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
    // Resolve the real client IP from Cloudflare's `cf-connecting-ip` header so
    // Better Auth rate-limit buckets are keyed per client. Without it, getIp
    // sees a multi-hop `x-forwarded-for` behind Cloudflare, resolves to null,
    // and collapses every request into one global shared bucket, sharing the
    // per-IP browser limits (e.g. /sign-in at 3/10s) across all users
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip"],
    },
    // use custom cookie prefix to avoid collision with IDP cookies
    cookiePrefix: "manifold",
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "omni",
          clientId: AUTH_CLIENT_ID!,
          clientSecret: AUTH_CLIENT_SECRET!,
          // set URLs explicitly instead of using discoveryUrl: BA overrides
          // tokenUrl with the discovery doc's token_endpoint, which uses the
          // external URL unreachable from inside Docker
          authorizationUrl: `${AUTH_BASE_URL}/oauth2/authorize`,
          tokenUrl: `${AUTH_INTERNAL_URL}/oauth2/token`,
          userInfoUrl: `${AUTH_INTERNAL_URL}/userinfo`,
          scopes: [
            "openid",
            "profile",
            "email",
            "offline_access",
            "organization",
          ],
          accessType: "offline",
          pkce: true,
          mapProfileToUser: (profile) => ({
            name: typeof profile.name === "string" ? profile.name : "",
            email: typeof profile.email === "string" ? profile.email : "",
            emailVerified:
              typeof profile.email_verified === "boolean"
                ? profile.email_verified
                : false,
            image:
              typeof profile.picture === "string" ? profile.picture : undefined,
          }),
        },
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
