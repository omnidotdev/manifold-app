import { Link, createFileRoute } from "@tanstack/react-router";

import { useWorkspace } from "@/lib/context";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/")({
  component: WorkspaceHome,
});

/**
 * Workspace home.
 * An org is 1:1 with a workspace, so the `@handle` IS the workspace (one level,
 * no nested workspaces). The handle root (`/@{$workspaceSlug}`) links to admin
 * behind the `~` sentinel.
 */
function WorkspaceHome() {
  const { workspaceSlug } = Route.useParams();
  const { workspaces } = useWorkspace();

  const org = workspaces.find((o) => o.slug === workspaceSlug);

  if (!org) return null;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-2xl">{org.slug}</h1>
          {org.type === "personal" && (
            <span className="rounded bg-muted px-2 py-1 text-xs">Personal</span>
          )}
        </div>
        <p className="mt-1 text-muted-foreground">
          Roles: {org.roles.join(", ")}
        </p>
      </div>

      {/* Admin Section (behind the ~ sentinel) */}
      <section>
        <h2 className="mb-4 font-semibold text-lg">Settings</h2>
        <div className="space-y-2">
          <Link
            to="/@{$workspaceSlug}/~/settings"
            params={{ workspaceSlug }}
            className="block rounded-lg border p-3 transition-colors hover:bg-muted"
          >
            Workspace Settings
          </Link>
          <Link
            to="/@{$workspaceSlug}/~/members"
            params={{ workspaceSlug }}
            className="block rounded-lg border p-3 transition-colors hover:bg-muted"
          >
            Members
          </Link>
          <Link
            to="/@{$workspaceSlug}/~/billing"
            params={{ workspaceSlug }}
            className="block rounded-lg border p-3 transition-colors hover:bg-muted"
          >
            Billing
          </Link>
        </div>
      </section>
    </div>
  );
}
