import { SettingsIcon } from "lucide-react";

import { manageSubscriptionUrl } from "@/lib/billing/hubLinks";
import useAppBaseUrl from "@/lib/billing/useAppBaseUrl";
import { ACCOUNT_URL } from "@/lib/config/env.config";

interface Props {
  /** Workspace whose subscription to manage */
  workspaceSlug: string;
}

/**
 * Manage a workspace's subscription (plan, payment method, invoices) on the
 * Omni account hub, which opens the billing portal and returns to this
 * workspace's billing page. Hidden when no account hub is configured
 */
const ManageSubscription = ({ workspaceSlug }: Props) => {
  const baseUrl = useAppBaseUrl();
  const href = manageSubscriptionUrl(ACCOUNT_URL, baseUrl, workspaceSlug);

  if (!href) {
    return (
      <p className="text-muted-foreground text-sm">
        Managing the plan is unavailable right now.
      </p>
    );
  }

  return (
    <a
      href={href}
      className="inline-flex items-center rounded-lg border px-4 py-2 transition-colors hover:bg-muted"
    >
      <SettingsIcon className="mr-2 h-4 w-4" />
      Manage subscription
    </a>
  );
};

export default ManageSubscription;
