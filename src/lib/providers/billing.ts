import { createBillingProvider } from "@omnidotdev/providers/billing";

import { BILLING_BASE_URL } from "@/lib/config/env.config";

export type {
  BillingProvider,
  Entitlement,
  EntitlementsResponse,
  Price,
  Subscription,
} from "@omnidotdev/providers/billing";

const billing = createBillingProvider({
  provider: "aether",
  baseUrl: BILLING_BASE_URL,
  appId: "manifold",
});

export default billing;
