import type { EntitlementsResponse } from "@/lib/providers/billing";

/** A billing entity a signed-in user asks to read */
type BillingEntity = {
  entityType: string;
  entityId: string;
};

/** What the signed-in user may read billing for */
type BillingReader = {
  /** The user's identity provider id (their `user` billing entity) */
  userId: string | null | undefined;
  /** Ids of the workspaces (organizations) the user belongs to */
  organizationIds: readonly string[];
};

/**
 * Whether a signed-in user may read a billing entity's entitlements: their own
 * user entity, or a workspace they belong to. Entitlement reads go to Aether
 * with Manifold's service key, which can read any entity, so this check is what
 * keeps one user from reading another workspace's plan
 */
export const canReadBillingEntity = (
  { entityType, entityId }: BillingEntity,
  { userId, organizationIds }: BillingReader,
): boolean => {
  if (entityType === "organization") {
    return organizationIds.includes(entityId);
  }

  if (entityType === "user") {
    return !!userId && userId === entityId;
  }

  return false;
};

/**
 * Value of one entitlement as a string, or null when absent. Aether serves
 * entitlement values as JSON, so a numeric limit arrives as a number even
 * though the shared type says string; normalize both shapes here
 */
export const findEntitlementValue = (
  entitlements: EntitlementsResponse | null | undefined,
  featureKey: string,
): string | null => {
  const value: unknown = entitlements?.entitlements.find(
    (e) => e.featureKey === featureKey,
  )?.value;

  if (value === null || value === undefined) return null;

  return String(value);
};
