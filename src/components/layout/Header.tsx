import { MenuRootProvider, useMenu } from "@ark-ui/react";
import { Button } from "@omnidotdev/thornberry/button";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useRouteContext } from "@tanstack/react-router";
import { ExternalLinkIcon, Menu as MenuIcon } from "lucide-react";

import { InternalLink } from "@/components/core";
import { ThemeToggle } from "@/components/layout";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@/components/ui/avatar";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemText,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import WorkspaceSwitcher from "@/components/workspaces/WorkspaceSwitcher";
import authClient from "@/lib/auth/authClient";
import signOut from "@/lib/auth/signOut";
import { CONSOLE_URL } from "@/lib/config/env.config";

/**
 * Primary navigation destinations, rendered inline on larger viewports and
 * collapsed into the navigation menu on mobile.
 */
const NAV_LINKS = [{ to: "/pricing", label: "Pricing" }] as const;

/**
 * Navigation destinations only available to authenticated users.
 */
const AUTHED_NAV_LINKS = [
  { to: "/registry", label: "Registry" },
  { to: "/tokens", label: "Tokens" },
] as const;

/**
 * Layout header.
 */
const Header = () => {
  const { auth } = useRouteContext({ strict: false });
  const location = useLocation();

  const accountMenu = useMenu();
  const navMenu = useMenu();

  const navLinks = auth ? [...NAV_LINKS, ...AUTHED_NAV_LINKS] : NAV_LINKS;

  const { mutateAsync: signIn, isPending: isSignInPending } = useMutation({
    mutationFn: async () =>
      await authClient.signIn.social({
        provider: "omni",
        callbackURL: location.pathname,
        disableRedirect: false,
      }),
  });

  const handleSignOut = async () => {
    accountMenu.api.setOpen(false);
    await signOut();
  };

  return (
    <header className="fixed top-0 z-50 w-full text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4">
        <div className="flex h-12 w-full items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#0e1016]/75 px-3 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <div className="flex min-w-0 items-center gap-2">
            <InternalLink to="/" variant="unstyled">
              <span className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight">
                <span className="grid h-7 w-7 place-items-center rounded-[9px] bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] shadow-[0_6px_18px_-6px_rgba(99,102,241,0.8)]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.4"
                    role="img"
                  >
                    <title>Manifold</title>
                    <circle cx="7" cy="7" r="3" />
                    <circle cx="17" cy="17" r="3" />
                    <path d="M9.2 9.2 14.8 14.8M7 10v1a3 3 0 0 0 3 3h1M17 14v-1a3 3 0 0 0-3-3h-1" />
                  </svg>
                </span>
                <span className="text-white">manifold</span>
              </span>
            </InternalLink>

            {auth && <WorkspaceSwitcher />}

            {navLinks.map(({ to, label }) => (
              <InternalLink
                key={to}
                to={to}
                variant="ghost"
                className="hidden text-white/75 hover:bg-white/10 hover:text-white sm:inline-flex"
              >
                {label}
              </InternalLink>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <MenuRootProvider value={navMenu}>
              <MenuTrigger
                aria-label="Open navigation menu"
                className="inline-flex size-9 items-center justify-center rounded-md text-white hover:bg-white/10 sm:hidden"
              >
                <MenuIcon className="size-5" />
              </MenuTrigger>

              <MenuPositioner>
                <MenuContent className="min-w-40">
                  {navLinks.map(({ to, label }) => (
                    <MenuItem key={to} value={to} asChild>
                      <InternalLink
                        to={to}
                        variant="unstyled"
                        className="justify-start"
                      >
                        <MenuItemText>{label}</MenuItemText>
                      </InternalLink>
                    </MenuItem>
                  ))}
                </MenuContent>
              </MenuPositioner>
            </MenuRootProvider>

            <ThemeToggle className="text-white hover:bg-white/10" />

            {auth ? (
              <MenuRootProvider value={accountMenu}>
                <MenuTrigger className="rounded-full">
                  <AvatarRoot>
                    <AvatarImage
                      src={(auth.user.image as string) ?? undefined}
                    />
                    <AvatarFallback>
                      {(auth.user.name as string)?.charAt(0)}
                    </AvatarFallback>
                  </AvatarRoot>
                </MenuTrigger>

                <MenuPositioner>
                  <MenuContent className="min-w-48">
                    <MenuItemGroup>
                      <MenuItemGroupLabel>My Account</MenuItemGroupLabel>

                      <MenuItem value="profile" asChild>
                        <InternalLink
                          to="/profile"
                          variant="unstyled"
                          className="justify-start"
                        >
                          <MenuItemText>Profile</MenuItemText>
                        </InternalLink>
                      </MenuItem>
                    </MenuItemGroup>

                    {CONSOLE_URL && (
                      <MenuItem value="manage-account" asChild>
                        <a
                          href={CONSOLE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="justify-start"
                        >
                          <ExternalLinkIcon size={16} />

                          <MenuItemText>Manage account</MenuItemText>
                        </a>
                      </MenuItem>
                    )}

                    <MenuSeparator />

                    <Button
                      variant="destructive"
                      onClick={handleSignOut}
                      tabIndex={-1}
                    >
                      Sign Out
                    </Button>
                  </MenuContent>
                </MenuPositioner>
              </MenuRootProvider>
            ) : (
              <Button onClick={() => signIn()} disabled={isSignInPending}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
