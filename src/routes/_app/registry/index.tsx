import { Link, createFileRoute } from "@tanstack/react-router";
import { Loader2, Package, Plus, Search } from "lucide-react";
import { useState } from "react";

import CreateNamespaceModal from "@/components/namespace/CreateNamespaceModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNamespacesQuery } from "@/generated/graphql";
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

  const { data, isLoading } = useNamespacesQuery();

  const namespaces =
    data?.namespaces?.nodes?.filter(
      (n): n is NonNullable<typeof n> => n != null,
    ) ?? [];

  const filteredNamespaces = namespaces.filter((ns) =>
    ns.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="font-semibold text-2xl">Registry</h1>

              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search namespaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
            </div>

            <CreateNamespaceModal
              trigger={
                <Button>
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
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="mb-4 h-12 w-12 text-muted-foreground" />
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
