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
    description: "Your personal artifact hub, free forever.",
    marketing_features: [
      { name: "3 private repos" },
      { name: "2 GB storage" },
      { name: "10 GB bandwidth/month" },
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
    <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-center px-4 py-14 text-center">
      <h1 className="font-extrabold text-5xl tracking-[-0.04em]">
        Grow your{" "}
        <span className="bg-gradient-to-r from-[#6aa6ff] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
          hub
        </span>
      </h1>

      <h2 className="mt-4 max-w-[52ch] font-medium text-lg text-muted-foreground">
        Start free and scale as your artifacts do. Every plan is one connected
        hub for your containers, crates, packages, schemas, and WASM.
      </h2>

      <TabsRootProvider
        value={tabs}
        className="mt-10 flex w-full flex-col lg:w-fit"
      >
        <TabsList className="place-self-center">
          <TabsTrigger value="month">Monthly</TabsTrigger>
          <TabsTrigger value="year">Yearly</TabsTrigger>
        </TabsList>

        {tabs.value != null && (
          <TabsContent
            value={tabs.value}
            className="flex flex-col items-stretch justify-center gap-4 lg:flex-row"
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

      <div className="mt-10 w-full max-w-3xl rounded-2xl border bg-muted/30 px-6 py-5 text-left text-muted-foreground text-sm sm:text-center">
        Prefer to run it yourself? Self-host the entire hub with{" "}
        <span className="font-semibold text-foreground">Run</span>, one command,{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground text-xs">
          run up
        </code>
        . Apache-2.0, no seats, no limits.
      </div>

      <FrequentlyAskedQuestions className="mt-14 w-full" />
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
