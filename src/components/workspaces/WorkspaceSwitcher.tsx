import { workspacesUrl } from "@omnidotdev/providers/react";
import { WorkspaceSwitcher as SharedWorkspaceSwitcher } from "@omnidotdev/thornberry/workspace-switcher";

import { ACCOUNT_URL } from "@/lib/config/env.config";
import { useWorkspace } from "@/lib/context";

/**
 * Header workspace switcher. Lets a member of multiple workspaces choose the
 * active one; hidden when the user has no workspaces (signed out or none yet).
 * Wraps the shared Omni switcher, supplying the workspaces from the session
 * claims and links out to the account hub to manage them when it is configured.
 */
const WorkspaceSwitcher = () => {
  const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace();

  // Empty when the account hub is not configured, which hides the manage link
  const manageUrl = workspacesUrl(ACCOUNT_URL) || undefined;

  // The manage link alone would still open a menu, so stay hidden instead
  if (!workspaces.length) return null;

  return (
    <SharedWorkspaceSwitcher
      workspaces={workspaces.map((workspace) => ({
        id: workspace.id,
        name: workspace.name,
        slug: workspace.slug,
        logo: workspace.logo,
        badge: workspace.type === "personal" ? "Personal" : null,
      }))}
      currentWorkspaceId={activeWorkspace?.id}
      onSelect={setActiveWorkspace}
      manageUrl={manageUrl}
      // Shrink beside the logo on narrow headers
      className="min-w-0 max-w-40 shrink sm:max-w-52"
    />
  );
};

export default WorkspaceSwitcher;
