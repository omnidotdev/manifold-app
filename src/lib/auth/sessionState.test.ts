import { describe, expect, test } from "bun:test";

import { isSessionDegraded, toClientSession } from "./sessionState";

import type { GetAuthSession } from "@/lib/auth/getAuth";

describe("isSessionDegraded", () => {
  test("an unauthenticated session is not degraded", () => {
    // No session at all is the redirect-to-login case, not the re-login prompt.
    expect(isSessionDegraded(null)).toBe(false);
    expect(isSessionDegraded(undefined)).toBe(false);
  });

  test("an authenticated session with an access token is healthy", () => {
    // A genuinely organization-less user has a valid token; they see the normal
    // "No organizations yet" state, not the re-login prompt.
    expect(isSessionDegraded({ accessToken: "at_live" })).toBe(false);
  });

  test("an authenticated session without an access token is degraded", () => {
    // Refresh-token grant failed: session served without a fresh token, orgs
    // empty. This must be distinguishable so the user is prompted to re-login.
    expect(isSessionDegraded({})).toBe(true);
    expect(isSessionDegraded({ accessToken: undefined })).toBe(true);
    expect(isSessionDegraded({ accessToken: null })).toBe(true);
    expect(isSessionDegraded({ accessToken: "" })).toBe(true);
  });
});

describe("toClientSession", () => {
  const fullSession: GetAuthSession = {
    accessToken: "at_live",
    organizations: [
      {
        id: "org_1",
        slug: "acme",
        name: "Acme",
        type: "team",
        roles: [],
        teams: [],
      },
    ],
    user: {
      id: "user_1",
      name: "Ada",
      email: "ada@example.com",
      emailVerified: true,
      image: null,
      identityProviderId: "idp_1",
    },
    session: {
      id: "sess_1",
      token: "ba_session_token",
      expiresAt: "2099-01-01T00:00:00.000Z",
      ipAddress: "203.0.113.7",
      userAgent: "test-agent",
    },
  };

  test("drops the Better Auth session token and request metadata", () => {
    const client = toClientSession(fullSession);
    const serialized = JSON.stringify(client);

    expect(client).not.toHaveProperty("session");
    expect(serialized).not.toContain("ba_session_token");
    expect(serialized).not.toContain("203.0.113.7");
    expect(serialized).not.toContain("test-agent");
  });

  test("keeps the fields the client reads", () => {
    expect(toClientSession(fullSession)).toEqual({
      accessToken: "at_live",
      organizations: fullSession.organizations,
      user: {
        id: "user_1",
        name: "Ada",
        email: "ada@example.com",
        image: null,
        identityProviderId: "idp_1",
      },
    });
  });
});
