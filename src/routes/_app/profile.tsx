import { createFileRoute } from "@tanstack/react-router";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "@/components/core";
import { accountSubscriptionsUrl } from "@/lib/billing/hubLinks";
import { ACCOUNT_URL } from "@/lib/config/env.config";
import { getSubscriptions } from "@/server/functions/subscriptions";

import type { Subscription } from "@/lib/providers/billing";

const columnHelper = createColumnHelper<Subscription>();

const columns = [
  columnHelper.accessor("id", {
    header: "Sub ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("product", {
    header: "Tier",
    cell: (info) => info.getValue()?.name ?? "—",
  }),
];

/**
 * Profile page. Personal subscriptions belong to no workspace, so they are
 * managed (changed or canceled) on the Omni account hub's subscriptions list
 */
const ProfilePage = () => {
  const { auth } = Route.useRouteContext();
  const { subscriptions } = Route.useLoaderData();
  const manageHref = accountSubscriptionsUrl(
    ACCOUNT_URL,
    auth?.user.identityProviderId,
  );

  const table = useReactTable({
    columns,
    data: subscriptions,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mx-auto flex h-full max-w-7xl flex-col text-pretty px-4 py-8 text-center sm:text-start">
      <div className="flex flex-col">
        <h1 className="font-bold text-xl sm:text-3xl">
          Welcome, {auth?.user.name as string}!
        </h1>
        <h2 className="text-muted-foreground text-sm sm:text-lg">
          Review and manage details about your account below.
        </h2>
      </div>

      <div className="mt-8 flex flex-col text-start">
        <h1 className="font-bold sm:text-xl">Subscriptions</h1>
        <h2 className="text-muted-foreground text-xs sm:text-sm">
          View details and manage your currently active subscriptions.
        </h2>

        {subscriptions.length ? (
          <>
            <DataTable table={table} containerProps="mt-6" />

            {manageHref && (
              <a
                href={manageHref}
                className="mt-4 w-fit rounded-lg border px-4 py-2 text-sm transition-colors hover:bg-muted"
              >
                Manage subscriptions
              </a>
            )}
          </>
        ) : (
          <p className="mt-4">No active subscriptions.</p>
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_app/profile")({
  loader: async () => {
    const subscriptions = await getSubscriptions();

    return { subscriptions };
  },
  component: ProfilePage,
});
