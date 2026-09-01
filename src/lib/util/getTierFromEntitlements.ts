import capitalizeFirstLetter from "./capitalizeFirstLetter";

import type { EntitlementsResponse } from "@/lib/providers/billing";

/**
 * Derive a display tier name from aether entitlements.
 * The tier lives in the entitlement whose `featureKey` is `tier` and its value
 * (e.g. free/hobby/pro/team) may arrive JSON-quoted, so strip wrapping quotes.
 * Returns null when no tier entitlement is present.
 */
const getTierFromEntitlements = (
  entitlements: EntitlementsResponse | null | undefined,
): string | null => {
  const raw = entitlements?.entitlements?.find(
    (e) => e.featureKey === "tier",
  )?.value;

  if (!raw) return null;

  const stripped = String(raw).replace(/^"|"$/g, "");

  return capitalizeFirstLetter(stripped);
};

export default getTierFromEntitlements;
