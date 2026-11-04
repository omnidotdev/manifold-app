import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy top-level `/tokens` redirect to the workspace-scoped location.
 */
export const Route = createFileRoute("/_app/tokens")({
  beforeLoad: ({ context: { organizations } }) => {
    const def =
      organizations.find((o) => o.type === "personal") ?? organizations[0];
    throw def?.slug
      ? redirect({
          to: "/@{$workspaceSlug}/~/tokens",
          params: { workspaceSlug: def.slug },
        })
      : redirect({ to: "/" });
  },
});
