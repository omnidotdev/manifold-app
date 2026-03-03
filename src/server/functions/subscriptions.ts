import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  cancelSubscription as aetherCancelSubscription,
  getBillingPortalUrl as aetherGetBillingPortalUrl,
  getSubscription as aetherGetSubscription,
  renewSubscription as aetherRenewSubscription,
} from "@/lib/aether/client";
import app from "@/lib/config/app.config";
import { BASE_URL, STRIPE_PORTAL_CONFIG_ID } from "@/lib/config/env.config";
import payments from "@/lib/payments";
import billing from "@/lib/providers/billing";
import { authMiddleware, customerMiddleware } from "@/server/middleware";

const checkoutSchema = z.object({
  priceId: z.string().startsWith("price_"),
  successUrl: z.string().url().optional(),
});

const subscriptionSchema = z.object({
  subscriptionId: z.string().startsWith("sub_"),
});

/**
 * Get user's active subscriptions.
 */
export const getSubscriptions = createServerFn()
  .middleware([customerMiddleware])
  .handler(async ({ context }) => {
    if (!context.customer) return [];

    const { id: customerId } = context.customer;

    const subscriptions = await payments.subscriptions.list({
      customer: customerId,
      status: "active",
    });

    return subscriptions.data.map((sub) => ({
      id: sub.id,
      customerId,
      price: sub.items.data[0].price,
    }));
  });

/**
 * Create a checkout session for a new subscription.
 * Creates the Stripe customer if one doesn't exist.
 * @knipignore
 */
export const getCheckoutUrl = createServerFn({ method: "POST" })
  .middleware([customerMiddleware])
  .inputValidator((data) => checkoutSchema.parse(data))
  .handler(async ({ data, context }) => {
    let customer = context.customer;

    if (!customer) {
      customer = await payments.customers.create({
        email: context.session.user.email ?? "",
        name: context.session.user.name ?? undefined,
        metadata: {
          externalId: context.session.user.identityProviderId ?? "",
        },
      });
    }

    const checkout = await payments.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      success_url: data.successUrl ?? `${BASE_URL}/pricing`,
      line_items: [{ price: data.priceId, quantity: 1 }],
      subscription_data: {
        metadata: {
          omniProduct: app.name.toLowerCase(),
        },
      },
    });

    return checkout.url ?? "";
  });

/**
 * Get billing portal URL for managing a subscription.
 */
export const getManageSubscriptionUrl = createServerFn({ method: "POST" })
  .inputValidator((data) => subscriptionSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.customer) throw new Error("No customer found");

    const session = await payments.billingPortal.sessions.create({
      customer: context.customer.id,
      configuration: STRIPE_PORTAL_CONFIG_ID,
      flow_data: {
        type: "subscription_update",
        subscription_update: { subscription: data.subscriptionId },
      },
      return_url: `${BASE_URL}/profile`,
    });

    return session.url;
  });

/**
 * Get billing portal URL for canceling a subscription.
 */
export const getCancelSubscriptionUrl = createServerFn({ method: "POST" })
  .inputValidator((data) => subscriptionSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.customer) throw new Error("No customer found");

    const session = await payments.billingPortal.sessions.create({
      customer: context.customer.id,
      configuration: STRIPE_PORTAL_CONFIG_ID,
      flow_data: {
        type: "subscription_cancel",
        subscription_cancel: { subscription: data.subscriptionId },
      },
      return_url: `${BASE_URL}/profile`,
    });

    return session.url;
  });

// Workspace-based subscription functions (for org billing)

const workspaceSchema = z.object({
  workspaceId: z.string(),
});

const manageBillingSchema = z.object({
  workspaceId: z.string(),
  returnUrl: z.string().url(),
});

/**
 * Get subscription for a workspace.
 */
export const getSubscription = createServerFn()
  .inputValidator((data) => workspaceSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.session.accessToken) throw new Error("No access token");

    return aetherGetSubscription(
      "workspace",
      data.workspaceId,
      context.session.accessToken,
    );
  });

/**
 * Get billing portal URL for a workspace.
 */
export const getManageBillingUrl = createServerFn({ method: "POST" })
  .inputValidator((data) => manageBillingSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.session.accessToken) throw new Error("No access token");

    try {
      return await aetherGetBillingPortalUrl(
        "workspace",
        data.workspaceId,
        "",
        data.returnUrl,
        context.session.accessToken,
      );
    } catch {
      return data.returnUrl;
    }
  });

/**
 * Revoke (cancel) a workspace subscription.
 */
export const revokeSubscription = createServerFn({ method: "POST" })
  .inputValidator((data) => workspaceSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.session.accessToken) throw new Error("No access token");

    await aetherCancelSubscription(
      "workspace",
      data.workspaceId,
      context.session.accessToken,
    );

    return { success: true };
  });

/**
 * Reactivate a canceled workspace subscription.
 */
export const reactivateSubscription = createServerFn({ method: "POST" })
  .inputValidator((data) => workspaceSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.session.accessToken) throw new Error("No access token");

    await aetherRenewSubscription(
      "workspace",
      data.workspaceId,
      context.session.accessToken,
    );

    return { success: true };
  });

// Org-based billing functions (via @omnidotdev/providers)

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
 * Get subscription for an organization.
 */
export const getOrgSubscription = createServerFn()
  .middleware([authMiddleware])
  .inputValidator((data) => organizationSchema.parse(data))
  .handler(async ({ data, context }) => {
    if (!context.session.accessToken) throw new Error("No access token");

    return billing.getSubscription(
      "organization",
      data.organizationId,
      context.session.accessToken,
    );
  });

/**
 * Create a checkout session with workspace selection or creation.
 */
export const createCheckoutWithWorkspace = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data) => checkoutWithWorkspaceSchema.parse(data))
  .handler(async ({ data, context }) => {
    if (!context.session.accessToken) throw new Error("No access token");

    return billing.createCheckoutWithWorkspace({
      appId: app.name.toLowerCase(),
      priceId: data.priceId,
      successUrl: data.successUrl,
      cancelUrl: data.cancelUrl,
      accessToken: context.session.accessToken,
      workspaceId: data.workspaceId,
      createWorkspace: data.createWorkspace,
    });
  });
