import { createFileRoute } from "@tanstack/react-router";

import Team from "@/components/workspaces/Team";

export const Route = createFileRoute("/_app/organizations/$orgSlug/members")({
  component: OrgMembersPage,
});

/**
 * Organization members page
 */
function OrgMembersPage() {
  return <Team />;
}
