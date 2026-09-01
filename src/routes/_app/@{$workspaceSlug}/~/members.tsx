import { createFileRoute } from "@tanstack/react-router";

import Team from "@/components/workspaces/Team";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/members")({
  component: WorkspaceMembersPage,
});

/**
 * Workspace members page
 */
function WorkspaceMembersPage() {
  return <Team />;
}
