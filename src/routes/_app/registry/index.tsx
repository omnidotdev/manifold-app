import { Badge } from "@omnidotdev/thornberry/badge";
import { Button } from "@omnidotdev/thornberry/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Loader2, Package, Plus, Search } from "lucide-react";
import { useState } from "react";

import CreateNamespaceModal from "@/components/namespace/CreateNamespaceModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNamespacesQuery } from "@/generated/graphql";
import { useWorkspace } from "@/lib/context";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute("/_app/registry/")({
  head: () => ({
    meta: createMetaTags({
      title: "Registry",
      description: "Browse and manage your artifact registry namespaces.",
    }),
  }),
  component: RegistryPage,
});

/**
 * Registry namespace list page
 */
function RegistryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { activeWorkspace } = useWorkspace();

  // Scope the registry to the active workspace. With no active workspace, fall
  // back to the server's org-isolated default (all the viewer's namespaces).
  const { data, isLoading } = useNamespacesQuery(
    activeWorkspace
      ? { condition: { organizationId: activeWorkspace.id } }
      : {},
  );

  const namespaces =
    data?.namespaces?.nodes?.filter(
      (n): n is NonNullable<typeof n> => n != null,
    ) ?? [];

  const query = searchQuery.toLowerCase();
  const filteredNamespaces = namespaces.filter(
    (ns) =>
      ns.name.toLowerCase().includes(query) ||
      (ns.description?.toLowerCase().includes(query) ?? false),
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-semibold text-2xl leading-tight">Registry</h1>
              <p className="text-muted-foreground text-sm">
                Namespaces and the artifacts they hold.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:w-64 lg:flex-none">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search namespaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
            </div>

            <CreateNamespaceModal
              trigger={
                <Button className="shrink-0">
                  <Plus className="mr-2 h-4 w-4" />
                  New Namespace
                </Button>
              }
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredNamespaces.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNamespaces.map((ns) => (
              <Link
                key={ns.rowId}
                to="/registry/$namespaceName"
                params={{ namespaceName: ns.name }}
                className="block"
              >
                <Card className="group cursor-pointer transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base">{ns.name}</CardTitle>
                      </div>
                      <Badge variant="outline">
                        {ns.repositories.totalCount}{" "}
                        {ns.repositories.totalCount === 1 ? "repo" : "repos"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-muted-foreground text-sm">
                      {ns.description || "No description"}
                    </p>
                    {ns.createdAt && (
                      <p className="mt-4 text-muted-foreground text-xs">
                        Created {new Date(ns.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Package className="h-8 w-8" />
            </div>
            <h3 className="mb-2 font-semibold text-lg">No namespaces found</h3>
            {searchQuery ? (
              <p className="text-muted-foreground">Try adjusting your search</p>
            ) : (
              <CreateNamespaceModal
                trigger={
                  <Button variant="link">
                    Create your first namespace to get started
                  </Button>
                }
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
