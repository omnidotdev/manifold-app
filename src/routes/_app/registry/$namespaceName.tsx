import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/registry/$namespaceName")({
  component: NamespaceLayout,
});

/**
 * Namespace layout for nested registry routes
 */
function NamespaceLayout() {
  return <Outlet />;
}
