import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";
import billing from "@/lib/providers/billing";
import { authMiddleware } from "@/server/middleware";

const subscriptionSchema = z.object({
  subscriptionId: z.string().startsWith("sub_"),
});

const workspaceSchema = z.object({
  workspaceId: z.string(),
});

const manageBillingSchema = z.object({
  workspaceId: z.string(),
  returnUrl: z.string().url(),
});

const checkoutWithWorkspaceSchema = z
  .object({
    priceId: z.string().startsWith("price_"),
    successUrl: z.string().url(),
    cancelUrl: z.string().url(),
    workspaceId: z.string().uuid().optional(),
    createWorkspace: z
      .object({
        name: z.string().min(1).max(100),
        slug: z.string().min(1).max(100).optional(),
      })
      .optional(),
  })
  .refine((data) => data.workspaceId || data.createWorkspace, {
    message: "Either workspaceId or createWorkspace is required",
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

// User-level subscription functions

/**
 * Get the user's active subscriptions.
 */
export const getSubscriptions = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return billing.listSubscriptions(
      "user",
      requireUserId(context.session.user.identityProviderId),
      requireAccessToken(context.session.accessToken),
    );
  });

/**
 * Get billing portal URL for updating a subscription.
 */
export const getManageSubscriptionUrl = createServerFn({ method: "POST" })
  .validator((data) => subscriptionSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    return billing.getBillingPortalUrl(
      "user",
      requireUserId(context.session.user.identityProviderId),
      app.name.toLowerCase(),
      `${BASE_URL}/profile`,
      requireAccessToken(context.session.accessToken),
      { type: "subscription_update", subscriptionId: data.subscriptionId },
    );
  });

/**
 * Get billing portal URL for canceling a subscription.
 */
export const getCancelSubscriptionUrl = createServerFn({ method: "POST" })
  .validator((data) => subscriptionSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    return billing.getBillingPortalUrl(
      "user",
      requireUserId(context.session.user.identityProviderId),
      app.name.toLowerCase(),
      `${BASE_URL}/profile`,
      requireAccessToken(context.session.accessToken),
      { type: "subscription_cancel", subscriptionId: data.subscriptionId },
    );
  });

// Workspace-based subscription functions (a workspace is a HIDRA organization)

/**
 * Get subscription for a workspace.
 */
export const getSubscription = createServerFn()
  .validator((data) => workspaceSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    return billing.getSubscription(
      "organization",
      data.workspaceId,
      requireAccessToken(context.session.accessToken),
    );
  });

/**
 * Get billing portal URL for a workspace.
 */
export const getManageBillingUrl = createServerFn({ method: "POST" })
  .validator((data) => manageBillingSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    try {
      return await billing.getBillingPortalUrl(
        "organization",
        data.workspaceId,
        app.name.toLowerCase(),
        data.returnUrl,
        requireAccessToken(context.session.accessToken),
      );
    } catch {
      return data.returnUrl;
    }
  });

/**
 * Revoke (cancel) a workspace subscription.
 */
export const revokeSubscription = createServerFn({ method: "POST" })
  .validator((data) => workspaceSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    await billing.cancelSubscription(
      "organization",
      data.workspaceId,
      requireAccessToken(context.session.accessToken),
    );

    return { success: true };
  });

/**
 * Reactivate a canceled workspace subscription.
 */
export const reactivateSubscription = createServerFn({ method: "POST" })
  .validator((data) => workspaceSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    await billing.renewSubscription(
      "organization",
      data.workspaceId,
      requireAccessToken(context.session.accessToken),
    );

    return { success: true };
  });

// Org-based billing functions (via @omnidotdev/providers)

/**
 * Get subscription for an organization.
 */
export const getOrgSubscription = createServerFn()
  .middleware([authMiddleware])
  .validator((data) => organizationSchema.parse(data))
  .handler(async ({ data, context }) => {
    return billing.getSubscription(
      "organization",
      data.organizationId,
      requireAccessToken(context.session.accessToken),
    );
  });

/**
 * Create a checkout session with workspace selection or creation.
 */
export const createCheckoutWithWorkspace = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data) => checkoutWithWorkspaceSchema.parse(data))
  .handler(async ({ data, context }) => {
    return billing.createCheckoutWithWorkspace({
      appId: app.name.toLowerCase(),
      priceId: data.priceId,
      successUrl: data.successUrl,
      cancelUrl: data.cancelUrl,
      accessToken: requireAccessToken(context.session.accessToken),
      workspaceId: data.workspaceId,
      createWorkspace: data.createWorkspace,
    });
  });
