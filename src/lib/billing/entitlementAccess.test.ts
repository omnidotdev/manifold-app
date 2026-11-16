import { describe, expect, test } from "bun:test";

import {
  canReadBillingEntity,
  findEntitlementValue,
} from "./entitlementAccess";

import type { EntitlementsResponse } from "@/lib/providers/billing";

const WORKSPACE_ID = "6f1c2e0a-3b6d-4f43-9a51-0c1f8d2b7e11";
const OTHER_WORKSPACE_ID = "0b7d9f3e-5a2c-4e18-8c6b-2d4f1a9e3c55";
const USER_ID = "a3e5c7d9-1b2f-4a6c-8e0d-9f7b5c3a1e22";

const reader = { userId: USER_ID, organizationIds: [WORKSPACE_ID] };

describe("canReadBillingEntity", () => {
  test("allows a workspace the user belongs to", () => {
    expect(
      canReadBillingEntity(
        { entityType: "organization", entityId: WORKSPACE_ID },
        reader,
      ),
    ).toBe(true);
  });

  test("refuses a workspace the user does not belong to", () => {
    expect(
      canReadBillingEntity(
        { entityType: "organization", entityId: OTHER_WORKSPACE_ID },
        reader,
      ),
    ).toBe(false);
  });

  test("allows only the user's own user entity", () => {
    expect(
      canReadBillingEntity({ entityType: "user", entityId: USER_ID }, reader),
    ).toBe(true);
    expect(
      canReadBillingEntity(
        { entityType: "user", entityId: OTHER_WORKSPACE_ID },
        reader,
      ),
    ).toBe(false);
    expect(
      canReadBillingEntity(
        { entityType: "user", entityId: USER_ID },
        { userId: null, organizationIds: [] },
      ),
    ).toBe(false);
  });

  test("refuses unknown entity types", () => {
    expect(
      canReadBillingEntity(
        { entityType: "team", entityId: WORKSPACE_ID },
        reader,
      ),
    ).toBe(false);
  });
});

/**
 * Build an entitlements response from raw wire values. Aether sends JSON, so a
 * numeric limit arrives as a number although the shared type says string
 */
const wire = (values: Record<string, unknown>): EntitlementsResponse =>
  ({
    billingAccountId: "acct_test",
    entityType: "organization",
    entityId: WORKSPACE_ID,
    entitlementVersion: 1,
    entitlements: Object.entries(values).map(([featureKey, value]) => ({
      id: `ent_${featureKey}`,
      productId: "manifold",
      featureKey,
      value,
      source: "subscription",
      validFrom: "2026-01-01T00:00:00.000Z",
      validUntil: null,
    })),
  }) as unknown as EntitlementsResponse;

describe("findEntitlementValue", () => {
  test("reads a numeric limit sent as a JSON number", () => {
    expect(
      findEntitlementValue(wire({ max_namespaces: 3 }), "max_namespaces"),
    ).toBe("3");
    expect(
      findEntitlementValue(wire({ max_namespaces: -1 }), "max_namespaces"),
    ).toBe("-1");
    expect(
      findEntitlementValue(wire({ private_repos: 0 }), "private_repos"),
    ).toBe("0");
  });

  test("reads a numeric limit sent as a string", () => {
    expect(
      findEntitlementValue(wire({ max_namespaces: "3" }), "max_namespaces"),
    ).toBe("3");
  });

  test("reads a string tier", () => {
    expect(findEntitlementValue(wire({ tier: "pro" }), "tier")).toBe("pro");
  });

  test("returns null for a missing feature, a null value, or no response", () => {
    expect(findEntitlementValue(wire({ tier: "pro" }), "max_namespaces")).toBe(
      null,
    );
    expect(findEntitlementValue(wire({ tier: null }), "tier")).toBe(null);
    expect(findEntitlementValue(null, "tier")).toBe(null);
  });
});
