import { useIdentitySync } from "@omnidotdev/providers/react";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { followSignOut, followSwitch } from "@/lib/auth/followIdentity";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context: { auth } }) => {
    if (!auth) throw redirect({ to: "/" });
  },
  component: AuthLayout,
});

/**
 * Auth layout.
 */
function AuthLayout() {
  const { auth, authBaseUrl } = Route.useRouteContext();

  // Stay signed in as the same account as Omni: follow a switch or sign-out
  // made in another app
  useIdentitySync({
    authBaseUrl,
    subject: auth?.user?.identityProviderId,
    onSignedOut: followSignOut,
    onSwitched: followSwitch,
  });

  return <Outlet />;
}
