import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";

import ManageSubscription from "@/components/billing/ManageSubscription";
import { useWorkspace } from "@/lib/context";
import { getTierFromEntitlements } from "@/lib/util";
import { getEntitlements } from "@/server/functions/entitlements";
import { getSubscription } from "@/server/functions/subscriptions";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/billing")({
  component: WorkspaceBillingPage,
});

/**
 * Workspace billing page: the current plan from Aether. Changing, canceling,
 * or reactivating the plan, payment methods, and invoices are managed on the
 * Omni account hub, which returns here
 */
function WorkspaceBillingPage() {
  const { workspaceSlug } = Route.useParams();
  const router = useRouter();
  const { workspaces } = useWorkspace();

  const org = workspaces.find((o) => o.slug === workspaceSlug);

  // Billing is scoped to the workspace level
  const workspaceId = org?.id ?? "";

  // Fetch subscription and entitlements in parallel. The plan shown must not
  // rely on Stripe alone: a comped or manually granted tier has an entitlement
  // but no active subscription, and a failed subscription read must not read as
  // "Free" for an account that holds a paid entitlement.
  const { data: subscription, isLoading: isLoadingSubscription } = useQuery({
    queryKey: ["subscription", workspaceId],
    queryFn: () => getSubscription({ data: { workspaceId } }).catch(() => null),
    enabled: !!workspaceId,
  });

  const { data: entitlements, isLoading: isLoadingEntitlements } = useQuery({
    queryKey: ["entitlements", workspaceId],
    queryFn: () =>
      getEntitlements({
        data: { entityType: "organization", entityId: workspaceId },
      }).catch(() => null),
    enabled: !!workspaceId,
  });

  if (!org) return null;

  const isLoadingPlan = isLoadingSubscription || isLoadingEntitlements;

  // Prefer the live subscription plan; otherwise fall back to the entitlement
  // tier so comped/granted plans are not misreported as "Free".
  const entitlementTier = getTierFromEntitlements(entitlements);
  const planName = subscription?.product?.name ?? entitlementTier ?? "Free";
  const planDescription =
    subscription?.product?.description ??
    (entitlementTier
      ? "Included with your plan"
      : "Basic features for personal use");
  const isSubscribed = subscription?.status === "active";
  const isCanceling = !!subscription?.cancelAt;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-bold text-2xl">Billing</h1>

      <div className="space-y-6">
        {/* Current Plan */}
        <section className="rounded-lg border p-6">
          <h2 className="mb-4 font-semibold text-lg">Current Plan</h2>
          {isLoadingPlan ? (
            <div className="animate-pulse">
              <div className="h-8 w-32 rounded bg-muted" />
              <div className="mt-2 h-4 w-48 rounded bg-muted" />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-2xl">{planName}</p>
                <p className="text-muted-foreground text-sm">
                  {planDescription}
                </p>
                {isCanceling && subscription?.cancelAt && (
                  <p className="mt-2 text-amber-600 text-sm">
                    Cancels on{" "}
                    {new Date(
                      subscription.cancelAt * 1000,
                    ).toLocaleDateString()}
                  </p>
                )}
                {isSubscribed && subscription?.currentPeriodEnd && (
                  <p className="mt-1 text-muted-foreground text-xs">
                    {isCanceling ? "Access until" : "Renews"}{" "}
                    {new Date(
                      subscription.currentPeriodEnd * 1000,
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {!isSubscribed ? (
                  <button
                    type="button"
                    onClick={() => {
                      // Pricing lists the plans; picking one opens the account
                      // hub's confirm step for it and this workspace
                      router.navigate({ to: "/pricing" });
                    }}
                    className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                  >
                    Upgrade Plan
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </section>

        {/* Marketing Features */}
        {subscription?.product?.marketing_features &&
          subscription.product.marketing_features.length > 0 && (
            <section className="rounded-lg border p-6">
              <h2 className="mb-4 font-semibold text-lg">Plan Features</h2>
              <ul className="space-y-2">
                {subscription.product.marketing_features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

        {/* Usage - TODO: Wire to entitlements */}
        <section className="rounded-lg border p-6">
          <h2 className="mb-4 font-semibold text-lg">Usage</h2>
          <p className="text-muted-foreground text-sm">
            Usage metrics will appear here once entitlements are configured.
          </p>
        </section>

        {/* Payment and invoices, managed on the account hub */}
        {isSubscribed && (
          <section className="rounded-lg border p-6">
            <h2 className="mb-4 font-semibold text-lg">Payment & Invoices</h2>
            <p className="mb-4 text-muted-foreground text-sm">
              Change, cancel, or reactivate your plan, manage payment methods,
              and view invoices on your Omni account.
            </p>
            <ManageSubscription workspaceSlug={org.slug} />
          </section>
        )}
      </div>
    </div>
  );
}
