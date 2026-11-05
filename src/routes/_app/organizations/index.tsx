import { workspacesUrl } from "@omnidotdev/providers/react";
import { Button, buttonVariants } from "@omnidotdev/thornberry/button";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { Boxes, Plus, RefreshCw } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import authClient from "@/lib/auth/authClient";
import { ACCOUNT_URL } from "@/lib/config/env.config";
import { fetchFreshSession, signOutLocal } from "@/server/functions/auth";

export const Route = createFileRoute("/_app/organizations/")({
  // Re-hydrate organizations live (bypassing the display cache) so a workspace
  // just created in the account portal shows on arrival, rather than waiting
  // out getAuth's org cache TTL. Invalidating the route re-runs this.
  loader: async () => {
    const { organizations, authDegraded } = await fetchFreshSession();
    return { organizations, authDegraded };
  },
  component: OrganizationsPage,
});

/**
 * Workspaces list page.
 *
 * Shows all workspaces the user is a member of. Workspace creation and
 * management is funneled to the account hub (account.omni.dev/workspaces), the
 * single ecosystem surface that owns it, so this page lists and links out
 * rather than embedding its own creation flow.
 */
function OrganizationsPage() {
  const router = useRouter();
  const { organizations: workspaces, authDegraded } = Route.useLoaderData();

  // The account hub owns workspace creation; link out to it. Rendered only when
  // the hub URL is configured (optional env), so a missing config degrades to
  // no button rather than a dead link.
  const newWorkspaceHref = workspacesUrl(ACCOUNT_URL);
  const NewWorkspaceLink = newWorkspaceHref
    ? ({ className }: { className?: string }) => (
        <a href={newWorkspaceHref} className={buttonVariants({ className })}>
          <Plus className="size-4" />
          New workspace
        </a>
      )
    : () => null;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl leading-tight">Workspaces</h1>
          <p className="text-muted-foreground text-sm">
            Organizations you belong to. Switch the active one from the header.
          </p>
        </div>

        {workspaces.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Refresh workspaces"
              title="Refresh workspaces"
              onClick={() => router.invalidate()}
            >
              <RefreshCw className="size-4" />
            </Button>
            <NewWorkspaceLink />
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((org) => (
          <Link
            key={org.id}
            to="/@{$workspaceSlug}"
            params={{ workspaceSlug: org.slug }}
            className="block rounded-lg border p-4 transition-colors hover:bg-muted"
          >
            <div className="flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-2">
                <Avatar
                  size="sm"
                  src={org.logo ?? undefined}
                  alt={org.slug}
                  fallback={org.slug.charAt(0).toUpperCase()}
                />
                <h2 className="truncate font-semibold">{org.slug}</h2>
              </div>
              {org.type === "personal" && (
                <span className="rounded bg-muted px-2 py-1 text-xs">
                  Personal
                </span>
              )}
            </div>
            <p className="mt-1 text-muted-foreground text-sm">
              {org.roles.join(", ")}
            </p>
            {org.teams.length > 0 && (
              <p className="mt-2 text-muted-foreground text-xs">
                Teams: {org.teams.map((t) => t.name).join(", ")}
              </p>
            )}
          </Link>
        ))}
      </div>

      {workspaces.length === 0 &&
        (authDegraded ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-16 text-center">
            <div>
              <h2 className="font-semibold text-lg">Your session expired</h2>
              <p className="mx-auto mt-1 max-w-sm text-muted-foreground text-sm">
                We could not refresh your session, so your workspaces could not
                be loaded. Sign in again to restore access.
              </p>
            </div>
            <Button
              onClick={async () => {
                // The better-auth session is still valid (only the OAuth
                // refresh token is dead), so signing in with an active session
                // just bounces back to the callback without re-authorizing.
                // Clear the local session (and auth cache) first so the OAuth
                // redirect actually fires and mints a fresh token family.
                try {
                  await signOutLocal();
                } catch {
                  // Proceed with re-auth even if local sign-out fails.
                }
                await authClient.signIn.social({
                  provider: "omni",
                  callbackURL: "/organizations",
                });
              }}
            >
              Sign in again
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Boxes className="h-8 w-8" />
            </div>
            <p className="text-muted-foreground text-sm">
              A workspace is where your projects live. Create one in your Omni
              account to get started.
            </p>
            <NewWorkspaceLink />
          </div>
        ))}
    </div>
  );
}
