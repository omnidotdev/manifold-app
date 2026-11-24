import type { OrganizationClaim } from "@omnidotdev/providers/auth";
import type { GetAuthSession } from "@/lib/auth/getAuth";

/**
 * A session is "degraded" when it is authenticated but carries no access token.
 *
 * `getAuth` deliberately serves a still-valid session without a fresh access
 * token when the refresh-token grant fails (a benign rotation race, or a dead
 * refresh-token family). In that state userinfo org hydration is skipped, so
 * `organizations` comes back empty. A degraded session therefore renders
 * identically to a genuinely organization-less user; callers use this predicate
 * to tell the two apart and prompt a re-login instead of showing a silent empty
 * state (a dead session never self-heals on a page that makes no API call, so
 * no 401 -> re-auth redirect ever fires).
 */
export const isSessionDegraded = (
  session: { accessToken?: string | null } | null | undefined,
): boolean => !!session && !session.accessToken;

/**
 * Session shape safe to hand to the browser.
 *
 * The session is returned from a server function into router context, so it
 * is serialized into the SSR HTML and server-function responses. Keep only the
 * fields the app reads: the Better Auth session token (the httpOnly cookie
 * value), IP address, and user agent must never reach client JavaScript
 */
export type ClientSession = {
  accessToken?: string;
  organizations: OrganizationClaim[];
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    identityProviderId?: string | null;
  };
};

/**
 * Whitelist the fields of a full auth session for the client
 */
export const toClientSession = (session: GetAuthSession): ClientSession => ({
  accessToken: session.accessToken,
  organizations: session.organizations,
  user: {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    identityProviderId: session.user.identityProviderId,
  },
});
