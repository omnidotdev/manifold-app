import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import billing from "@/lib/providers/billing";
import { authMiddleware } from "@/server/middleware";

const workspaceSchema = z.object({
  workspaceId: z.string(),
});

const organizationSchema = z.object({
  organizationId: z.string().min(1),
});

/**
 * Validate access token or throw.
 */
const requireAccessToken = (accessToken: string | undefined): string => {
  if (!accessToken) throw new Error("No access token");
  return accessToken;
};

/**
 * Require the user's identity provider id or throw.
 */
const requireUserId = (
  identityProviderId: string | null | undefined,
): string => {
  if (!identityProviderId) throw new Error("Unauthorized");
  return identityProviderId;
};

// Buying a plan and the billing portal run on the Omni account hub (see
// `lib/billing/hubLinks`), not here

// User-level subscription functions

/**
 * Get the user's active subscriptions.
 */
export const getSubscriptions = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return billing.listSubscriptions(
      "user",
      requireUserId(context.session.user.identityProviderId),
      requireAccessToken(context.session.accessToken),
    );
  });

// Workspace-based subscription functions (a workspace is a HIDRA organization)

/**
 * Get subscription for a workspace.
 */
export const getSubscription = createServerFn({ method: "POST" })
  .validator((data) => workspaceSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    return billing.getSubscription(
      "organization",
      data.workspaceId,
      requireAccessToken(context.session.accessToken),
    );
  });

// Org-based billing functions (via @omnidotdev/providers)

/**
 * Get subscription for an organization.
 */
export const getOrgSubscription = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data) => organizationSchema.parse(data))
  .handler(async ({ data, context }) => {
    return billing.getSubscription(
      "organization",
      data.organizationId,
      requireAccessToken(context.session.accessToken),
    );
  });
