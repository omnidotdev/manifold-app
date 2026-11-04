import { Check, ChevronsUpDown } from "lucide-react";

import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@/components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuItemText,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useWorkspace } from "@/lib/context";

import type { Workspace } from "@/lib/context/workspace.context";

/** Workspace avatar: the logo if set, otherwise the first letter of the name. */
const WorkspaceAvatar = ({ workspace }: { workspace: Workspace }) => (
  <AvatarRoot className="h-5 w-5 shrink-0 text-[10px]">
    <AvatarImage src={workspace.logo ?? undefined} alt="" />
    <AvatarFallback>{workspace.name.charAt(0).toUpperCase()}</AvatarFallback>
  </AvatarRoot>
);

/**
 * Header workspace switcher. Lets a member of multiple workspaces choose the
 * active one; hidden when the user has no workspaces (signed out or none yet).
 */
const WorkspaceSwitcher = () => {
  const { workspaces, activeWorkspace, setActiveWorkspace } = useWorkspace();

  if (!workspaces.length) return null;

  return (
    <MenuRoot onSelect={({ value }) => setActiveWorkspace(value)}>
      <MenuTrigger asChild>
        <button
          type="button"
          className="inline-flex min-w-0 max-w-40 shrink items-center gap-2 rounded-md border border-white/20 bg-white/5 px-2 py-1 text-sm text-white transition-colors hover:bg-white/10 sm:max-w-52 sm:px-2.5"
        >
          {activeWorkspace && <WorkspaceAvatar workspace={activeWorkspace} />}
          <span className="truncate font-medium">
            {activeWorkspace?.name ?? "Select workspace"}
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
        </button>
      </MenuTrigger>

      <MenuPositioner>
        <MenuContent className="min-w-56 max-w-[calc(100vw-2rem)]">
          {workspaces.map((ws) => (
            <MenuItem key={ws.id} value={ws.id} className="cursor-pointer">
              <MenuItemText className="flex w-full items-center gap-2">
                <WorkspaceAvatar workspace={ws} />
                <span className="flex-1 truncate">{ws.name}</span>
                {ws.type === "personal" && (
                  <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground text-xs">
                    Personal
                  </span>
                )}
                {activeWorkspace?.id === ws.id && (
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                )}
              </MenuItemText>
            </MenuItem>
          ))}
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
};

export default WorkspaceSwitcher;
