import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { API_BASE_URL } from "@/lib/config/env.config";
import { authMiddleware } from "@/server/middleware";

/**
 * Token returned by the list endpoint (no plaintext)
 */
export interface ApiToken {
  id: string;
  name: string;
  tokenPrefix: string;
  namespaceId: string;
  repositoryId: string | null;
  scope: string;
  isActive: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  expiresAt: string | null;
}

const createTokenSchema = z.object({
  name: z.string().min(1).max(255),
  namespaceId: z.string().uuid(),
  repositoryId: z.string().uuid().optional(),
  scope: z.enum(["read", "write", "admin"]),
  expiresAt: z.string().optional(),
});

const revokeTokenSchema = z.object({
  tokenId: z.string().uuid(),
});

/**
 * Fetch all API tokens for the current user
 */
export const fetchTokens = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const res = await fetch(`${API_BASE_URL}/api/tokens`, {
      headers: {
        Authorization: `Bearer ${context.session.accessToken}`,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(
        (err as { error?: string })?.error ?? "Failed to fetch tokens",
      );
    }

    const data = (await res.json()) as { tokens: ApiToken[] };

    return data.tokens;
  });

/**
 * Create a new API token
 */
export const createToken = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data) => createTokenSchema.parse(data))
  .handler(async ({ context, data }) => {
    const res = await fetch(`${API_BASE_URL}/api/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.session.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(
        (err as { error?: string })?.error ?? "Failed to create token",
      );
    }

    return (await res.json()) as {
      token: ApiToken;
      plaintextToken: string;
      warning: string;
    };
  });

/**
 * Revoke an API token
 */
export const revokeToken = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data) => revokeTokenSchema.parse(data))
  .handler(async ({ context, data }) => {
    const res = await fetch(`${API_BASE_URL}/api/tokens/${data.tokenId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${context.session.accessToken}`,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(
        (err as { error?: string })?.error ?? "Failed to revoke token",
      );
    }

    return (await res.json()) as {
      token: { id: string; name: string; isActive: boolean };
      message: string;
    };
  });
