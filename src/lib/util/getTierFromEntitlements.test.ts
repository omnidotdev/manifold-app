import { describe, expect, test } from "bun:test";

import getTierFromEntitlements from "./getTierFromEntitlements";

import type {
  Entitlement,
  EntitlementsResponse,
} from "@/lib/providers/billing";

const makeEntitlement = (
  featureKey: string,
  value: string | null,
): Entitlement => ({
  id: `ent_${featureKey}`,
  productId: "prod_test",
  featureKey,
  value,
  source: "test",
  validFrom: "2026-01-01T00:00:00.000Z",
  validUntil: null,
});

const makeEntitlements = (
  entitlements: Entitlement[],
): EntitlementsResponse => ({
  billingAccountId: "acct_test",
  entityType: "organization",
  entityId: "org_test",
  entitlementVersion: 1,
  entitlements,
});

describe("getTierFromEntitlements", () => {
  test("returns capitalized tier for a plain value", () => {
    const result = getTierFromEntitlements(
      makeEntitlements([makeEntitlement("tier", "pro")]),
    );
    expect(result).toBe("Pro");
  });

  test("strips wrapping JSON quotes before capitalizing", () => {
    const result = getTierFromEntitlements(
      makeEntitlements([makeEntitlement("tier", '"team"')]),
    );
    expect(result).toBe("Team");
  });

  test("finds the tier among other entitlements", () => {
    const result = getTierFromEntitlements(
      makeEntitlements([
        makeEntitlement("seats", "5"),
        makeEntitlement("tier", "hobby"),
      ]),
    );
    expect(result).toBe("Hobby");
  });

  test("returns null when no tier entitlement is present", () => {
    const result = getTierFromEntitlements(
      makeEntitlements([makeEntitlement("seats", "5")]),
    );
    expect(result).toBeNull();
  });

  test("returns null for a null tier value", () => {
    const result = getTierFromEntitlements(
      makeEntitlements([makeEntitlement("tier", null)]),
    );
    expect(result).toBeNull();
  });

  test("returns null for null or undefined input", () => {
    expect(getTierFromEntitlements(null)).toBeNull();
    expect(getTierFromEntitlements(undefined)).toBeNull();
  });
});
