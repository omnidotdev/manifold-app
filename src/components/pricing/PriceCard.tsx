import { Format } from "@ark-ui/react";
import { workspacesUrl } from "@omnidotdev/providers/react";
import { Button } from "@omnidotdev/thornberry/button";
import { useMutation } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { BuildingIcon, CheckIcon, PlusIcon } from "lucide-react";

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
import { upgradePlanUrl } from "@/lib/billing/hubLinks";
import useAppBaseUrl from "@/lib/billing/useAppBaseUrl";
import { ACCOUNT_URL, hasBilling } from "@/lib/config/env.config";
import { capitalizeFirstLetter } from "@/lib/util";
import cn from "@/lib/utils";

import type { Workspace } from "@/lib/context/workspace.context";
import type { Price, Subscription } from "@/lib/providers/billing";

export type { Price };

type Props = {
  price: Price;
  orgSubscriptions?: Record<string, Subscription | null>;
  organizations?: Workspace[];
  disableAction?: boolean;
};

// Manifold tier hierarchy for upgrade logic
const TIER_ORDER = ["free", "pro", "team"] as const;
type Tier = (typeof TIER_ORDER)[number];

/**
 * Price card. A paid plan is bought on the Omni account hub, the one place
 * Omni plans are sold: picking a workspace opens the hub's confirm step for
 * that plan and workspace, which runs checkout and returns here
 */
const PriceCard = ({
  price,
  orgSubscriptions = {},
  organizations = [],
  disableAction,
}: Props) => {
  const { auth } = useRouteContext({ strict: false });
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { tier?: string };
  const baseUrl = useAppBaseUrl();

  const tier = (price.metadata?.tier as Tier) ?? "free";
  const isProTier = tier === "pro";
  const isFreeTier = tier === "free";

  const { mutateAsync: signIn, isPending: isSignInPending } = useMutation({
    mutationFn: async () =>
      await authClient.signIn.social({
        provider: "omni",
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

  const interval = price.recurring?.interval === "year" ? "year" : "month";

  // The account hub's confirm step for this plan, for a workspace or (none
  // given) letting the hub ask
  const planUrl = (workspaceSlug?: string) =>
    upgradePlanUrl(ACCOUNT_URL, baseUrl, {
      plan: tier,
      interval,
      workspaceSlug,
    });

  // A new workspace is created on the account hub's workspaces console, the
  // one place workspaces are made
  const handleWorkspaceSelect = (workspaceId: string) => {
    const href =
      workspaceId === "create-new"
        ? workspacesUrl(ACCOUNT_URL)
        : planUrl(allOrgs.find((org) => org.id === workspaceId)?.slug);

    if (href) window.location.assign(href);
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

    // Paid tier without workspaces: the hub explains a plan needs one
    if (!allOrgs.length) {
      const href = planUrl();
      if (href) window.location.assign(href);
      return;
    }
  };

  const showDropdown = !!auth && !isFreeTier && hasBilling && !!allOrgs.length;

  const getButtonContent = () => {
    if (isFreeTier) return "Get Started";
    return `Continue with ${capitalizeFirstLetter(tier)}`;
  };

  return (
    <CardRoot
      key={price.product.name}
      className={cn(
        "w-full max-w-lg overflow-hidden lg:h-full lg:min-w-80",
        isProTier &&
          "border-primary shadow-lg shadow-primary/5 ring-1 ring-primary/20",
      )}
    >
      <CardHeader
        className={cn(
          "pb-3 lg:min-h-50.5",
          isProTier ? "bg-primary/5" : "bg-muted",
        )}
      >
        <div className="flex flex-1 flex-col">
          {isProTier && (
            <span className="mb-2 inline-flex w-fit items-center rounded-full bg-primary px-2.5 py-0.5 font-medium text-primary-foreground text-xs">
              Most popular
            </span>
          )}
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
              <Button>{getButtonContent()}</Button>
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
                      <span className="font-medium text-sm">New workspace</span>
                    </MenuItemText>
                  </MenuItem>
                </MenuItemGroup>
              </MenuContent>
            </MenuPositioner>
          </MenuRoot>
        ) : (
          <Button
            disabled={disableAction || isSignInPending}
            onClick={handleClick}
          >
            {getButtonContent()}
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
  );
};

export default PriceCard;
