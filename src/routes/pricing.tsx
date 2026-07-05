import { TabsRootProvider, useTabs } from "@ark-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { FrequentlyAskedQuestions, PriceCard } from "@/components/pricing";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSession } from "@/server/functions/auth";
import { getPrices } from "@/server/functions/prices";
import { getOrgSubscription } from "@/server/functions/subscriptions";

import type { Price } from "@/components/pricing";
import type { Subscription } from "@/lib/providers/billing";

const FREE_PRICE: Price = {
  id: "free-price",
  active: true,
  currency: "usd",
  unit_amount: 0,
  recurring: null,
  product: {
    id: "free-product",
    name: "Free",
    description: "Start for free.",
    marketing_features: [
      { name: "Feature 1" },
      { name: "Feature 2" },
      { name: "Feature 3" },
    ],
  },
  metadata: { tier: "free" },
};

const searchSchema = z.object({
  tier: z
    .string()
    .pipe(z.enum(["free", "pro", "team"]))
    .optional(),
});

/**
 * Pricing page.
 */
const PricingPage = () => {
  const {
    prices,
    orgSubscriptions = {},
    organizations = [],
  } = Route.useLoaderData();

  const tabs = useTabs({ defaultValue: "month" });

  const filteredPrices = prices.filter(
    (price: Price) => price.recurring?.interval === tabs.value,
  );

  return (
    <div className="flex h-full flex-col items-center px-4 py-8 text-center">
      <h1 className="my-6 font-bold text-4xl">Simple, transparent pricing</h1>

      <h2 className="font-medium text-muted-foreground text-xl">
        Start for free. As your business grows, upgrade to fit your needs.
      </h2>

      <TabsRootProvider
        value={tabs}
        className="mt-8 flex w-full flex-col lg:w-fit"
      >
        <TabsList className="place-self-center">
          <TabsTrigger value="month">Monthly</TabsTrigger>
          <TabsTrigger value="year">Yearly</TabsTrigger>
        </TabsList>

        {tabs.value != null && (
          <TabsContent
            value={tabs.value}
            className="flex flex-col items-center gap-4 lg:flex-row"
          >
            <PriceCard price={FREE_PRICE} disableAction />

            {filteredPrices.map((price: Price) => (
              <PriceCard
                key={price.id}
                price={price}
                orgSubscriptions={orgSubscriptions}
                organizations={organizations}
              />
            ))}
          </TabsContent>
        )}
      </TabsRootProvider>

      <FrequentlyAskedQuestions className="mt-12 w-full" />
    </div>
  );
};

export const Route = createFileRoute("/pricing")({
  validateSearch: (search) => searchSchema.parse(search),
  loader: async () => {
    const [prices, sessionData] = await Promise.all([
      getPrices(),
      fetchSession(),
    ]);

    const { organizations } = sessionData;

    // Fetch subscriptions for all user organizations
    const orgSubscriptions: Record<string, Subscription | null> = {};

    if (organizations?.length) {
      const subscriptionPromises = organizations.map(
        async (org: { id: string }) => {
          try {
            const subscription = await getOrgSubscription({
              data: { organizationId: org.id },
            });
            return { orgId: org.id, subscription };
          } catch {
            return { orgId: org.id, subscription: null };
          }
        },
      );

      const results = await Promise.all(subscriptionPromises);
      for (const { orgId, subscription } of results) {
        orgSubscriptions[orgId] = subscription;
      }
    }

    return { prices, orgSubscriptions, organizations };
  },
  component: PricingPage,
});
