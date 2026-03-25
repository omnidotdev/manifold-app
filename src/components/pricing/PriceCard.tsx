import { Format } from "@ark-ui/react";
import { useMutation } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { BuildingIcon, CheckIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import CreateWorkspaceModal from "@/components/pricing/CreateWorkspaceModal";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
} from "@/components/ui/card";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemText,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import authClient from "@/lib/auth/authClient";
import { BASE_URL, hasBilling } from "@/lib/config/env.config";
import { capitalizeFirstLetter } from "@/lib/util";
import cn from "@/lib/utils";
import { createCheckoutWithWorkspace } from "@/server/functions/subscriptions";

import type Stripe from "stripe";
import type { Organization } from "@/lib/context/organization.context";
import type { Subscription } from "@/lib/providers/billing";

export interface Price {
  id: Stripe.Price["id"];
  unit_amount: Stripe.Price["unit_amount"];
  product: {
    name: Stripe.Product["name"];
    description: Stripe.Product["description"];
    marketing_features: Stripe.Product["marketing_features"];
  };
  recurring?: Stripe.Price["recurring"];
  metadata?: Record<string, string>;
}

type Props = {
  price: Price;
  orgSubscriptions?: Record<string, Subscription | null>;
  organizations?: Organization[];
  disableAction?: boolean;
};

// Manifold tier hierarchy for upgrade logic
const TIER_ORDER = ["free", "pro", "team"] as const;
type Tier = (typeof TIER_ORDER)[number];

const PriceCard = ({
  price,
  orgSubscriptions = {},
  organizations = [],
  disableAction,
}: Props) => {
  const { auth } = useRouteContext({ strict: false });
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { tier?: string };
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const tier = (price.metadata?.tier as Tier) ?? "free";
  const isProTier = tier === "pro";
  const isFreeTier = tier === "free";

  const { mutateAsync: signIn, isPending: isSignInPending } = useMutation({
    mutationFn: async () =>
      await authClient.signIn.oauth2({
        providerId: "omni",
        callbackURL: `/pricing?tier=${tier}`,
        disableRedirect: false,
      }),
  });

  const getOrgTier = (orgId: string): Tier => {
    const subscription = orgSubscriptions[orgId];
    if (!subscription) return "free";
    const productName = subscription.product?.name?.toLowerCase() ?? "";
    if (productName.includes("team")) return "team";
    if (productName.includes("pro")) return "pro";
    return "free";
  };

  const getTierIndex = (t: Tier): number => TIER_ORDER.indexOf(t);

  const allOrgs = organizations;
  const upgradeableOrgs = allOrgs.filter(
    (org) => getTierIndex(getOrgTier(org.id)) < getTierIndex(tier),
  );
  const nonUpgradeableOrgs = allOrgs.filter(
    (org) => getTierIndex(getOrgTier(org.id)) >= getTierIndex(tier),
  );

  // Auto-open dropdown when returning from sign-in with tier param
  const shouldAutoOpen = search.tier === tier && !!auth;

  const { mutateAsync: initiateCheckout } = useMutation({
    mutationFn: async (params: {
      workspaceId?: string;
      createWorkspace?: { name: string; slug: string };
    }) => {
      setIsCheckoutLoading(true);
      return createCheckoutWithWorkspace({
        data: {
          priceId: price.id,
          successUrl: `${BASE_URL}/pricing`,
          cancelUrl: `${BASE_URL}/pricing`,
          ...params,
        },
      });
    },
    onSuccess: (result) => {
      window.location.href = result.checkoutUrl;
    },
    onError: () => {
      setIsCheckoutLoading(false);
    },
  });

  const handleWorkspaceSelect = (workspaceId: string) => {
    if (workspaceId === "create-new") {
      setIsCreateModalOpen(true);
    } else {
      initiateCheckout({ workspaceId });
    }
  };

  const handleCreateWorkspace = (name: string, slug: string) => {
    setIsCreateModalOpen(false);
    initiateCheckout({ createWorkspace: { name, slug } });
  };

  const handleClick = () => {
    if (!auth) {
      if (!hasBilling) {
        navigate({ to: "/" });
      } else {
        signIn();
      }
      return;
    }

    if (isFreeTier) {
      navigate({ to: "/" });
      return;
    }

    if (!hasBilling) {
      navigate({ to: "/" });
      return;
    }

    // Paid tier without orgs - open create workspace modal
    if (!allOrgs.length) {
      setIsCreateModalOpen(true);
      return;
    }
  };

  const showDropdown =
    !!auth && !isFreeTier && hasBilling && !!allOrgs.length;

  const getButtonContent = () => {
    if (isFreeTier) return "Get Started";
    return `Continue with ${capitalizeFirstLetter(tier)}`;
  };

  return (
    <>
      <CardRoot
        key={price.product.name}
        className={cn(
          "size-full max-w-lg overflow-hidden lg:min-w-80",
          isProTier && "border-primary/30",
        )}
      >
        <CardHeader className="bg-muted pb-3 lg:min-h-50.5">
          <div className="flex flex-1 flex-col">
            <CardTitle className="text-lg">
              {capitalizeFirstLetter(price.product.name)}
            </CardTitle>

            <CardDescription className="mt-2 mb-4 flex-1">
              {price.product.description}
            </CardDescription>

            {price.unit_amount != null && (
              <p className="font-semibold text-lg">
                <Format.Number
                  value={price.unit_amount / 100}
                  style="currency"
                  currency="USD"
                  notation="compact"
                  compactDisplay="short"
                />

                <span className="pl-1 font-normal text-muted-foreground text-sm">
                  /{price.recurring ? price.recurring.interval : "forever"}
                </span>
              </p>
            )}
          </div>

          {showDropdown ? (
            <MenuRoot
              defaultOpen={shouldAutoOpen}
              onSelect={({ value }) => handleWorkspaceSelect(value)}
            >
              <MenuTrigger asChild>
                <Button disabled={isCheckoutLoading}>
                  {isCheckoutLoading ? "Loading..." : getButtonContent()}
                </Button>
              </MenuTrigger>
              <MenuPositioner className="!w-[var(--reference-width)]">
                <MenuContent className="w-full">
                  {allOrgs.length > 0 && (
                    <>
                      <MenuItemGroup>
                        <MenuItemGroupLabel className="text-muted-foreground">
                          Your workspaces
                        </MenuItemGroupLabel>

                        {upgradeableOrgs.map((org) => (
                          <MenuItem
                            key={org.id}
                            value={org.id}
                            className="cursor-pointer"
                          >
                            <MenuItemText className="flex w-full items-center gap-2">
                              <BuildingIcon
                                size={16}
                                className="text-muted-foreground"
                              />
                              <span className="flex-1 truncate font-medium text-sm">
                                {org.slug}
                              </span>
                              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary text-xs">
                                Upgrade
                              </span>
                            </MenuItemText>
                          </MenuItem>
                        ))}

                        {nonUpgradeableOrgs.map((org) => {
                          const orgTier = getOrgTier(org.id);
                          const isSameTier = orgTier === tier;

                          return (
                            <MenuItem
                              key={org.id}
                              value={org.id}
                              disabled
                              className="opacity-60"
                            >
                              <MenuItemText className="flex w-full items-center gap-2">
                                <BuildingIcon
                                  size={16}
                                  className="text-muted-foreground"
                                />
                                <span className="flex-1 truncate font-medium text-sm">
                                  {org.slug}
                                </span>
                                <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground text-xs">
                                  {isSameTier
                                    ? "Current plan"
                                    : capitalizeFirstLetter(orgTier)}
                                </span>
                              </MenuItemText>
                            </MenuItem>
                          );
                        })}
                      </MenuItemGroup>

                      <MenuSeparator />
                    </>
                  )}

                  <MenuItemGroup>
                    <MenuItem value="create-new" className="cursor-pointer">
                      <MenuItemText className="flex w-full items-center gap-2">
                        <PlusIcon size={16} className="text-muted-foreground" />
                        <span className="font-medium text-sm">
                          New workspace
                        </span>
                      </MenuItemText>
                    </MenuItem>
                  </MenuItemGroup>
                </MenuContent>
              </MenuPositioner>
            </MenuRoot>
          ) : (
            <Button
              disabled={disableAction || isSignInPending || isCheckoutLoading}
              onClick={handleClick}
            >
              {isCheckoutLoading ? "Loading..." : getButtonContent()}
            </Button>
          )}
        </CardHeader>

        <CardContent className="p-4">
          {price.product.marketing_features.map((feature) => (
            <div key={feature.name} className="flex items-center gap-2">
              <CheckIcon className="size-4 text-primary" />
              <p>{feature.name}</p>
            </div>
          ))}
        </CardContent>
      </CardRoot>

      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        tierName={capitalizeFirstLetter(tier)}
        onSubmit={handleCreateWorkspace}
        isLoading={isCheckoutLoading}
      />
    </>
  );
};

export default PriceCard;
