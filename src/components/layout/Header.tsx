import { MenuRootProvider, useMenu } from "@ark-ui/react";
import { Button } from "@omnidotdev/thornberry/button";
import { LogoLockup } from "@omnidotdev/thornberry/logo-lockup";
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
import authClient from "@/lib/auth/authClient";
import signOut from "@/lib/auth/signOut";
import app from "@/lib/config/app.config";
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
    <header className="fixed top-0 z-50 w-full border-white/10 border-b bg-[oklch(0.2_0.09_265)] text-white shadow-sm backdrop-blur">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex min-w-0 gap-2">
            <InternalLink to="/" variant="unstyled" className="-ml-4">
              <LogoLockup
                name={app.name}
                nameClassName="font-bold text-xl text-white"
              />
            </InternalLink>

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
