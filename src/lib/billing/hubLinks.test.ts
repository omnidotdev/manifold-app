import { describe, expect, test } from "bun:test";

import {
  accountSubscriptionsUrl,
  manageSubscriptionUrl,
  upgradePlanUrl,
  workspaceBillingUrl,
} from "./hubLinks";

const HUB = "https://account.omni.dev";
const MANIFOLD = "https://manifold.omni.dev";

const params = (url: string) => Object.fromEntries(new URL(url).searchParams);

describe("workspaceBillingUrl", () => {
  test("points at the workspace's billing page", () => {
    expect(workspaceBillingUrl(`${MANIFOLD}/`, "acme")).toBe(
      `${MANIFOLD}/@acme/~/billing`,
    );
  });

  test("is undefined without a base URL", () => {
    expect(workspaceBillingUrl("", "acme")).toBeUndefined();
  });
});

describe("upgradePlanUrl", () => {
  test("buys the plan on the account hub and returns to the workspace's billing", () => {
    const url = upgradePlanUrl(HUB, MANIFOLD, {
      plan: "pro",
      interval: "month",
      workspaceSlug: "acme",
    });

    expect(url.startsWith(`${HUB}/billing?`)).toBe(true);
    expect(params(url)).toEqual({
      product: "manifold",
      plan: "pro",
      interval: "month",
      workspace: "acme",
      return: `${MANIFOLD}/@acme/~/billing`,
    });
  });

  test("opens the hub as the signed-in account", () => {
    expect(
      params(
        upgradePlanUrl(HUB, MANIFOLD, {
          plan: "pro",
          interval: "month",
          workspaceSlug: "acme",
          loginHint: "user-123",
        }),
      ),
    ).toHaveProperty("login_hint", "user-123");
  });

  test("lets the hub ask for the workspace and returns to pricing", () => {
    expect(
      params(upgradePlanUrl(HUB, MANIFOLD, { plan: "team", interval: "year" })),
    ).toEqual({
      product: "manifold",
      plan: "team",
      interval: "year",
      return: `${MANIFOLD}/pricing`,
    });
  });

  test("is empty when no account hub is configured", () => {
    expect(
      upgradePlanUrl(undefined, MANIFOLD, { plan: "pro", interval: "month" }),
    ).toBe("");
  });
});

describe("manageSubscriptionUrl", () => {
  test("manages the workspace's plan on the account hub", () => {
    const url = manageSubscriptionUrl(HUB, MANIFOLD, "acme");

    expect(url.startsWith(`${HUB}/billing?`)).toBe(true);
    expect(params(url)).toEqual({
      product: "manifold",
      workspace: "acme",
      manage: "1",
      return: `${MANIFOLD}/@acme/~/billing`,
    });
  });

  test("opens the hub as the signed-in account", () => {
    expect(
      params(manageSubscriptionUrl(HUB, MANIFOLD, "acme", "user-123")),
    ).toHaveProperty("login_hint", "user-123");
  });

  test("is empty when no account hub is configured", () => {
    expect(manageSubscriptionUrl("", MANIFOLD, "acme")).toBe("");
  });
});

describe("accountSubscriptionsUrl", () => {
  test("opens the account hub's subscriptions", () => {
    const url = accountSubscriptionsUrl(`${HUB}/`);

    expect(url.startsWith(`${HUB}/billing?`)).toBe(true);
    expect(params(url)).toEqual({ tab: "subscriptions" });
  });

  test("opens the hub as the signed-in account", () => {
    expect(params(accountSubscriptionsUrl(HUB, "user-123"))).toEqual({
      tab: "subscriptions",
      login_hint: "user-123",
    });
  });

  test("is empty when no account hub is configured", () => {
    expect(accountSubscriptionsUrl(undefined)).toBe("");
  });
});
