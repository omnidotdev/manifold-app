import { CommandPalette as CommandPaletteShell } from "@omnidotdev/thornberry/command-palette";
import { ShortcutsDialog } from "@omnidotdev/thornberry/shortcuts-dialog";
import {
  GLOBAL_HOTKEYS,
  hotkeyLabel,
  useHotkeys,
} from "@omnidotdev/thornberry/use-hotkeys";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import {
  Boxes,
  CreditCard,
  HomeIcon,
  KeyRound,
  Keyboard,
  Library,
  MoonStar,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import { useTheme } from "@/providers/ThemeProvider";

import type { CommandAction } from "@omnidotdev/thornberry/command-palette";

/**
 * Global command palette (⌘/Ctrl+K). Mounted once at the app root so it works on
 * every route. Exposes top-level navigation, the theme toggle, and the keyboard
 * shortcuts list. Built on the shared Thornberry palette so every Omni app
 * shares the same behavior; this wrapper only supplies Manifold's own actions.
 * The shell owns the palette's open state and the mod+k hotkey; the only local
 * state is whether the shortcuts list is open.
 */
const CommandPalette = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // Root context (not the authed `_app` tree) so the palette can resolve the
  // session on any route, including public pages where there is no session.
  const { auth } = useRouteContext({ strict: false }) as { auth?: unknown };

  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // App-wide theme shortcut. react-hotkeys-hook ignores form fields by default,
  // so this never fires while typing in the palette input or any other field
  useHotkeys(GLOBAL_HOTKEYS.toggleTheme, toggleTheme);

  const commands: CommandAction[] = [
    {
      id: "home",
      label: "Home",
      group: "Navigation",
      icon: HomeIcon,
      onSelect: () => navigate({ to: "/" }),
    },
    {
      id: "pricing",
      label: "Pricing",
      group: "Navigation",
      icon: CreditCard,
      onSelect: () => navigate({ to: "/pricing" }),
    },
  ];

  if (auth) {
    commands.push(
      {
        id: "registry",
        label: "Registry",
        group: "Navigation",
        icon: Library,
        keywords: ["packages", "namespaces"],
        onSelect: () => navigate({ to: "/registry" }),
      },
      {
        id: "organizations",
        label: "Workspaces",
        group: "Navigation",
        icon: Boxes,
        keywords: ["orgs", "teams"],
        onSelect: () => navigate({ to: "/organizations" }),
      },
      {
        id: "tokens",
        label: "API Tokens",
        group: "Navigation",
        icon: KeyRound,
        keywords: ["keys", "settings"],
        onSelect: () => navigate({ to: "/tokens" }),
      },
      {
        id: "profile",
        label: "Profile",
        group: "Navigation",
        icon: UserRound,
        keywords: ["account", "settings"],
        onSelect: () => navigate({ to: "/profile" }),
      },
    );
  }

  commands.push({
    id: "toggle-theme",
    label: theme === "light" ? "Switch to dark theme" : "Switch to light theme",
    group: "Preferences",
    icon: MoonStar,
    keywords: ["theme", "dark", "light", "appearance"],
    shortcut: hotkeyLabel(GLOBAL_HOTKEYS.toggleTheme),
    onSelect: toggleTheme,
  });

  commands.push({
    id: "keyboard-shortcuts",
    label: "Keyboard shortcuts",
    group: "Preferences",
    icon: Keyboard,
    keywords: ["hotkeys", "keys", "help"],
    shortcut: hotkeyLabel(GLOBAL_HOTKEYS.showShortcuts),
    onSelect: () => setShortcutsOpen(true),
  });

  return (
    <>
      <CommandPaletteShell
        commands={commands}
        placeholder="Search actions..."
      />
      {/* `?` opens it anywhere; the palette entry opens it too */}
      <ShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </>
  );
};

export default CommandPalette;
