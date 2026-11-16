import { createBillingProvider } from "@omnidotdev/providers/billing";

import {
  BILLING_BASE_URL,
  BILLING_SERVICE_API_KEY,
} from "@/lib/config/env.config";

export type {
  BillingProvider,
  Entitlement,
  EntitlementsResponse,
  Price,
  Subscription,
} from "@omnidotdev/providers/billing";

/**
 * Billing calls made with the signed-in user's own token (subscription
 * lookups). The token is minted for Aether's audience, so Aether accepts it
 * directly; no service key is sent, since a key alongside a user token makes
 * Aether treat the call as delegated, which Manifold is not registered for
 */
const billing = createBillingProvider({
  provider: "aether",
  baseUrl: BILLING_BASE_URL,
  appId: "manifold",
});

/**
 * Billing calls authenticated as Manifold itself (entitlement reads). Aether's
 * entitlement routes only accept a service key, so without it every read is
 * refused. Server-only: callers must authorize the user for the entity first
 * (see `canReadBillingEntity`)
 */
export const serviceBilling = createBillingProvider({
  provider: "aether",
  baseUrl: BILLING_BASE_URL,
  serviceApiKey: BILLING_SERVICE_API_KEY,
  appId: "manifold",
});

export default billing;
