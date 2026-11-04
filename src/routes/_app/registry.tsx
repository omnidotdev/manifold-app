import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy top-level `/registry` redirect. The registry now lives under the
 * workspace handle (`/@{workspaceSlug}/~/registry`) per the fleet URL standard;
 * keep this stub so existing links/bookmarks resolve to the default workspace.
 */
export const Route = createFileRoute("/_app/registry")({
  beforeLoad: ({ context: { organizations } }) => {
    const def =
      organizations.find((o) => o.type === "personal") ?? organizations[0];
    throw def?.slug
      ? redirect({
          to: "/@{$workspaceSlug}/~/registry",
          params: { workspaceSlug: def.slug },
        })
      : redirect({ to: "/" });
  },
});
