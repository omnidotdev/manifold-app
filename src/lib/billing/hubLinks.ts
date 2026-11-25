import {
  accountUrl,
  hubManageUrl,
  hubPlanUrl,
} from "@omnidotdev/providers/react";

import type { HubPlanInterval } from "@omnidotdev/providers/react";

/**
 * Plans are bought and managed on the Omni account hub, the one place every
 * product sells plans. Manifold shows its own pricing, but its plan and
 * Manage subscription actions link to the hub, which confirms the plan (names
 * and prices from Aether), runs checkout or the billing portal, and returns
 * here. Each link carries the signed-in account's subject as `loginHint`, so
 * the hub opens as the same account. Each helper is empty when no account hub
 * is configured, so the action is hidden rather than dead
 */

const PRODUCT = "manifold";

const trimOrigin = (baseUrl: string | undefined): string | undefined =>
  baseUrl ? baseUrl.replace(/\/+$/, "") : undefined;

/** A workspace's billing page, where the hub returns after a plan action */
export const workspaceBillingUrl = (
  baseUrl: string | undefined,
  workspaceSlug: string,
): string | undefined => {
  const origin = trimOrigin(baseUrl);

  return origin ? `${origin}/@${workspaceSlug}/~/billing` : undefined;
};

/**
 * Buy a Manifold plan on the account hub. Without a workspace the hub asks,
 * listing only workspaces the user owns or administers, and returns to pricing
 * @param accountBaseUrl - Account hub base URL
 * @param baseUrl - Manifold's absolute base URL, for the return (see `useAppBaseUrl`)
 */
export const upgradePlanUrl = (
  accountBaseUrl: string | undefined,
  baseUrl: string | undefined,
  {
    plan,
    interval,
    workspaceSlug,
    loginHint,
  }: {
    plan: string;
    interval: HubPlanInterval;
    workspaceSlug?: string;
    /** The signed-in account's subject */
    loginHint?: string | null;
  },
): string => {
  const origin = trimOrigin(baseUrl);

  return hubPlanUrl(accountBaseUrl, {
    product: PRODUCT,
    plan,
    interval,
    workspace: workspaceSlug,
    returnUrl: workspaceSlug
      ? workspaceBillingUrl(baseUrl, workspaceSlug)
      : origin
        ? `${origin}/pricing`
        : undefined,
    loginHint,
  });
};

/**
 * Manage a workspace's Manifold plan (change or cancel it, payment method,
 * invoices) on the account hub, returning to the workspace's billing page
 * @param accountBaseUrl - Account hub base URL
 * @param baseUrl - Manifold's absolute base URL, for the return (see `useAppBaseUrl`)
 * @param workspaceSlug - Workspace whose plan to manage
 * @param loginHint - The signed-in account's subject
 */
export const manageSubscriptionUrl = (
  accountBaseUrl: string | undefined,
  baseUrl: string | undefined,
  workspaceSlug: string,
  loginHint?: string | null,
): string =>
  hubManageUrl(accountBaseUrl, {
    product: PRODUCT,
    workspace: workspaceSlug,
    returnUrl: workspaceBillingUrl(baseUrl, workspaceSlug),
    loginHint,
  });

/**
 * The account hub's subscriptions list, covering personal subscriptions that
 * belong to no workspace
 * @param accountBaseUrl - Account hub base URL
 * @param loginHint - The signed-in account's subject
 */
export const accountSubscriptionsUrl = (
  accountBaseUrl: string | undefined,
  loginHint?: string | null,
): string => {
  const base = accountUrl(accountBaseUrl);
  if (!base) return "";

  // The hub link helpers have no subscriptions tab, so this one link is built
  // here, carrying the same `login_hint` they would
  const search = new URLSearchParams({ tab: "subscriptions" });
  if (loginHint) search.set("login_hint", loginHint);

  return `${base}/billing?${search.toString()}`;
};
