import { Badge } from "@omnidotdev/thornberry/badge";
import { Button } from "@omnidotdev/thornberry/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  Loader2,
  Package,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";

import CreateRepositoryModal from "@/components/namespace/CreateRepositoryModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useNamespaceByNameQuery,
  useRepositoriesByNamespaceQuery,
} from "@/generated/graphql";
import {
  ARTIFACT_TYPE_COLORS,
  ARTIFACT_TYPE_LABELS,
  isValidArtifactType,
} from "@/lib/manifold/registry.types";
import { formatCount } from "@/lib/util";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute("/_app/registry/$namespaceName/")({
  head: ({ params }) => ({
    meta: createMetaTags({
      title: `${params.namespaceName} | Registry`,
      description: `Repositories in the ${params.namespaceName} namespace.`,
    }),
  }),
  component: NamespaceDetailPage,
});

/**
 * Namespace detail page showing repositories
 */
function NamespaceDetailPage() {
  const { namespaceName } = Route.useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: nsData, isLoading: nsLoading } = useNamespaceByNameQuery({
    name: namespaceName,
  });

  const namespace = nsData?.namespaceByName;

  // Fetch full repository details once we have the namespace rowId
  const { data: reposData, isLoading: reposLoading } =
    useRepositoriesByNamespaceQuery(
      { namespaceId: namespace?.rowId ?? "" },
      { enabled: !!namespace?.rowId },
    );

  const repositories =
    reposData?.repositories?.nodes?.filter(
      (n): n is NonNullable<typeof n> => n != null,
    ) ?? [];

  const query = searchQuery.toLowerCase();
  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(query) ||
      (repo.description?.toLowerCase().includes(query) ?? false),
  );

  const isLoading = nsLoading || reposLoading;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          {/* Breadcrumb */}
          <nav className="mb-3 flex items-center gap-1 text-muted-foreground text-sm">
            <Link to="/registry" className="hover:text-foreground">
              Registry
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{namespaceName}</span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="font-semibold text-2xl">{namespaceName}</h1>

              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
            </div>

            {namespace && (
              <CreateRepositoryModal
                namespaceId={namespace.rowId}
                trigger={
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Repository
                  </Button>
                }
              />
            )}
          </div>

          {namespace?.description && (
            <p className="mt-2 text-muted-foreground text-sm">
              {namespace.description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !namespace ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-lg">Namespace not found</h3>
            <p className="text-muted-foreground">
              The namespace &quot;{namespaceName}&quot; does not exist
            </p>
          </div>
        ) : filteredRepos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRepos.map((repo) => {
              const artifactType = isValidArtifactType(repo.artifactType)
                ? repo.artifactType
                : null;

              return (
                <Link
                  key={repo.rowId}
                  to="/registry/$namespaceName/$repoName"
                  params={{
                    namespaceName,
                    repoName: repo.name,
                  }}
                  className="block"
                >
                  <Card className="group cursor-pointer transition-shadow hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{repo.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          {artifactType && (
                            <Badge
                              className={ARTIFACT_TYPE_COLORS[artifactType]}
                            >
                              {ARTIFACT_TYPE_LABELS[artifactType]}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2 text-muted-foreground text-sm">
                        {repo.description || "No description"}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-muted-foreground text-xs">
                        <div className="flex items-center gap-3">
                          <span>
                            {repo.artifacts.totalCount}{" "}
                            {repo.artifacts.totalCount === 1
                              ? "artifact"
                              : "artifacts"}
                          </span>
                          <span
                            className="flex items-center gap-1"
                            title={`${repo.downloadCount} downloads`}
                          >
                            <Download className="h-3 w-3" />
                            {formatCount(repo.downloadCount)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {repo.isPublic ? (
                            <>
                              <Eye className="h-3 w-3" />
                              <span>Public</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3" />
                              <span>Private</span>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-lg">
              No repositories found
            </h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search"
                : "Create your first repository to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
