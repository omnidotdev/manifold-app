import { MenuRootProvider, useMenu } from "@ark-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useRouteContext } from "@tanstack/react-router";
import { ExternalLinkIcon } from "lucide-react";

import { InternalLink } from "@/components/core";
import { ThemeToggle } from "@/components/layout";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
 * Layout header.
 */
const Header = () => {
  const { auth } = useRouteContext({ strict: false });
  const location = useLocation();

  const accountMenu = useMenu();

  const { mutateAsync: signIn, isPending: isSignInPending } = useMutation({
    mutationFn: async () =>
      await authClient.signIn.oauth2({
        providerId: "omni",
        callbackURL: location.pathname,
        disableRedirect: false,
      }),
  });

  const handleSignOut = async () => {
    accountMenu.api.setOpen(false);
    await signOut();
  };

  return (
    <header className="fixed top-0 z-50 w-full border border-b bg-background shadow-sm blur-ms">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-2">
            <InternalLink to="/" variant="unstyled" className="-ml-4">
              <h1 className="font-bold text-xl">{app.name}</h1>
            </InternalLink>

            <InternalLink to="/pricing" variant="ghost">
              Pricing
            </InternalLink>

            {auth ? (
              <>
                <InternalLink to="/registry" variant="ghost">
                  Registry
                </InternalLink>

                <InternalLink to="/tokens" variant="ghost">
                  Tokens
                </InternalLink>
              </>
            ) : null}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {auth ? (
              <MenuRootProvider value={accountMenu}>
                <MenuTrigger className="rounded-full">
                  <AvatarRoot>
                    <AvatarImage src={(auth.user.image as string) ?? undefined} />
                    <AvatarFallback>{(auth.user.name as string)?.charAt(0)}</AvatarFallback>
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
