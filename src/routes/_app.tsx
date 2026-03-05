import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

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
  return <Outlet />;
}
