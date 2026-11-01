import { Check, ChevronsUpDown } from "lucide-react";

import {
  MenuContent,
  MenuItem,
  MenuItemText,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useWorkspace } from "@/lib/context";

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
          className="inline-flex max-w-44 items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
        >
          <span className="truncate font-medium">
            {activeWorkspace?.slug ?? "Select workspace"}
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
        </button>
      </MenuTrigger>

      <MenuPositioner>
        <MenuContent className="min-w-52">
          {workspaces.map((ws) => (
            <MenuItem key={ws.id} value={ws.id} className="cursor-pointer">
              <MenuItemText className="flex w-full items-center gap-2">
                <span className="flex-1 truncate">{ws.slug}</span>
                {ws.type === "personal" && (
                  <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground text-xs">
                    Personal
                  </span>
                )}
                {activeWorkspace?.id === ws.id && (
                  <Check className="h-4 w-4 text-primary" />
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
