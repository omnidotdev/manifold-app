import { createServerFn } from "@tanstack/react-start";

import { hasBilling } from "@/lib/config/env.config";
import billing from "@/lib/providers/billing";

import type { Price } from "@/lib/providers/billing";

export type { Price };

/**
 * Fetch all prices for this app via Aether, sorted by unit amount (ascending).
 */
export const getPrices = createServerFn().handler(async () => {
  if (!hasBilling) return [];

  const prices = await billing.getPrices("manifold");

  return prices.sort(
    (a, b) =>
      (a.unit_amount ?? Number.POSITIVE_INFINITY) -
      (b.unit_amount ?? Number.POSITIVE_INFINITY),
  );
});
