import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import billing from "@/lib/providers/billing";
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

/**
 * Get all entitlements for an entity.
 */
export const getEntitlements = createServerFn()
  .validator((data) => entitySchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }): Promise<EntitlementsResponse | null> => {
    return billing.getEntitlements(
      data.entityType,
      data.entityId,
      data.productId,
      context.session.accessToken,
    );
  });

/**
 * Check if an entity has a specific entitlement.
 * Returns the entitlement value if found, null otherwise.
 */
export const checkEntitlement = createServerFn()
  .validator((data) => checkEntitlementSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }): Promise<string | null> => {
    const entitlements = await billing.getEntitlements(
      data.entityType,
      data.entityId,
      data.productId,
      context.session.accessToken,
    );

    if (!entitlements) {
      return null;
    }

    const entitlement = entitlements.entitlements.find(
      (e) => e.featureKey === data.featureKey,
    );

    return entitlement?.value ?? null;
  });
