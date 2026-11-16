import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  canReadBillingEntity,
  findEntitlementValue,
} from "@/lib/billing/entitlementAccess";
import { serviceBilling } from "@/lib/providers/billing";
import { authMiddleware } from "@/server/middleware";

import type { EntitlementsResponse } from "@/lib/providers/billing";

const entitySchema = z.object({
  entityType: z.string(),
  entityId: z.string().uuid(),
  productId: z.string().optional(),
});

const checkEntitlementSchema = z.object({
  entityType: z.string(),
  entityId: z.string().uuid(),
  productId: z.string(),
  featureKey: z.string(),
});

type AuthContext = {
  session: { user: { identityProviderId?: string | null } };
  organizations: ReadonlyArray<{ id: string }>;
};

/**
 * Throw unless the signed-in user may read the entity's billing (their own
 * user entity or a workspace they belong to)
 */
const requireBillingAccess = (
  entity: { entityType: string; entityId: string },
  context: AuthContext,
) => {
  const allowed = canReadBillingEntity(entity, {
    userId: context.session.user.identityProviderId,
    organizationIds: context.organizations.map((org) => org.id),
  });

  if (!allowed) throw new Error("Forbidden");
};

/**
 * Get all entitlements for an entity.
 */
export const getEntitlements = createServerFn({ method: "POST" })
  .validator((data) => entitySchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }): Promise<EntitlementsResponse | null> => {
    requireBillingAccess(data, context);

    return serviceBilling.getEntitlements(
      data.entityType,
      data.entityId,
      data.productId,
    );
  });

/**
 * Check if an entity has a specific entitlement.
 * Returns the entitlement value if found, null otherwise.
 */
export const checkEntitlement = createServerFn({ method: "POST" })
  .validator((data) => checkEntitlementSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }): Promise<string | null> => {
    requireBillingAccess(data, context);

    const entitlements = await serviceBilling.getEntitlements(
      data.entityType,
      data.entityId,
      data.productId,
    );

    return findEntitlementValue(entitlements, data.featureKey);
  });
