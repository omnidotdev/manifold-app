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
  Tag,
} from "lucide-react";

import UploadArtifactModal from "@/components/namespace/UploadArtifactModal";
import ScanBadge from "@/components/registry/ScanBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useNamespaceByNameQuery,
  useRepositoryQuery,
} from "@/generated/graphql";
import {
  ARTIFACT_TYPE_COLORS,
  ARTIFACT_TYPE_LABELS,
  isValidArtifactType,
} from "@/lib/manifold/registry.types";
import createMetaTags from "@/lib/util/createMetaTags";
import formatCount from "@/lib/util/formatCount";

export const Route = createFileRoute("/_app/registry/$namespaceName/$repoName")(
  {
    head: ({ params }) => ({
      meta: createMetaTags({
        title: `${params.repoName} | ${params.namespaceName} | Registry`,
        description: `Artifacts and tags in ${params.namespaceName}/${params.repoName}.`,
      }),
    }),
    component: RepositoryDetailPage,
  },
);

/**
 * Format bytes into a human-readable string
 */
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${units[i]}`;
};

/**
 * Truncate a digest for display
 */
const truncateDigest = (digest: string): string => {
  if (!digest.includes(":")) return digest.slice(0, 16);

  const [algo, hash] = digest.split(":");
  return `${algo}:${hash.slice(0, 12)}`;
};

/**
 * Repository detail page showing artifacts and tags
 */
function RepositoryDetailPage() {
  const { namespaceName, repoName } = Route.useParams();

  // First, resolve the repo rowId via namespace lookup
  const { data: nsData, isLoading: nsLoading } = useNamespaceByNameQuery({
    name: namespaceName,
  });

  const namespace = nsData?.namespaceByName;
  const repoEntry = namespace?.repositories.nodes
    ?.filter((n): n is NonNullable<typeof n> => n != null)
    .find((r) => r.name === repoName);

  // Fetch full repository details once we have the rowId
  const { data: repoData, isLoading: repoLoading } = useRepositoryQuery(
    { rowId: repoEntry?.rowId ?? "" },
    { enabled: !!repoEntry?.rowId },
  );

  const repository = repoData?.repository;
  const artifacts =
    repository?.artifacts.nodes?.filter(
      (n): n is NonNullable<typeof n> => n != null,
    ) ?? [];
  const tags =
    repository?.tags.nodes?.filter(
      (n): n is NonNullable<typeof n> => n != null,
    ) ?? [];
  const isLoading = nsLoading || repoLoading;

  const artifactType =
    repository?.artifactType && isValidArtifactType(repository.artifactType)
      ? repository.artifactType
      : null;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-6 py-4">
          {/* Breadcrumb */}
          <nav className="mb-3 flex items-center gap-1 text-muted-foreground text-sm">
            <Link to="/registry" className="hover:text-foreground">
              Registry
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              to="/registry/$namespaceName"
              params={{ namespaceName }}
              className="hover:text-foreground"
            >
              {namespaceName}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{repoName}</span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Package className="h-5 w-5" />
              </div>
              <h1 className="font-semibold text-2xl">{repoName}</h1>

              {artifactType && (
                <Badge className={ARTIFACT_TYPE_COLORS[artifactType]}>
                  {ARTIFACT_TYPE_LABELS[artifactType]}
                </Badge>
              )}

              {repository && (
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  {repository.isPublic ? (
                    <>
                      <Eye className="h-4 w-4" />
                      <span>Public</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4" />
                      <span>Private</span>
                    </>
                  )}
                </div>
              )}

              {repository && (
                <div
                  className="flex items-center gap-1 text-muted-foreground text-sm"
                  title={`${repository.downloadCount} downloads`}
                >
                  <Download className="h-4 w-4" />
                  <span>{formatCount(repository.downloadCount)}</span>
                </div>
              )}
            </div>

            {repository && (
              <UploadArtifactModal
                repositoryId={repository.rowId}
                trigger={
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Artifact
                  </Button>
                }
              />
            )}
          </div>

          {repository?.description && (
            <p className="mt-2 text-muted-foreground text-sm">
              {repository.description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-7xl px-6 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !repository ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-lg">Repository not found</h3>
            <p className="text-muted-foreground">
              The repository &quot;{namespaceName}/{repoName}&quot; does not
              exist
            </p>
          </div>
        ) : (
          <Tabs defaultValue="artifacts">
            <TabsList>
              <TabsTrigger value="artifacts">
                Artifacts ({repository.artifacts.totalCount})
              </TabsTrigger>
              <TabsTrigger value="tags">
                Tags ({repository.tags.totalCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="artifacts" className="mt-4">
              {artifacts.length > 0 ? (
                <Card className="overflow-hidden rounded-2xl">
                  <CardContent className="p-0">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-4 text-left font-medium text-sm">
                            Digest
                          </th>
                          <th className="p-4 text-left font-medium text-sm">
                            Size
                          </th>
                          <th className="p-4 text-left font-medium text-sm">
                            Media Type
                          </th>
                          <th className="p-4 text-left font-medium text-sm">
                            Security
                          </th>
                          <th className="p-4 text-left font-medium text-sm">
                            Created
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {artifacts.map((artifact) => (
                          <tr
                            key={artifact.rowId}
                            className="border-b transition-colors last:border-b-0 hover:bg-muted/50"
                          >
                            <td className="p-4">
                              <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                                {truncateDigest(artifact.digest)}
                              </code>
                            </td>
                            <td className="p-4 text-muted-foreground text-sm">
                              {formatBytes(Number(artifact.size))}
                            </td>
                            <td className="p-4 text-muted-foreground text-sm">
                              {artifact.mediaType}
                            </td>
                            <td className="p-4">
                              <ScanBadge scan={artifact.scanResults.nodes[0]} />
                            </td>
                            <td className="p-4 text-muted-foreground text-sm">
                              {artifact.createdAt
                                ? new Date(
                                    artifact.createdAt,
                                  ).toLocaleDateString()
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Package className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">
                    No artifacts yet
                  </h3>
                  <UploadArtifactModal
                    repositoryId={repository.rowId}
                    trigger={
                      <Button variant="link">
                        Upload your first artifact to get started
                      </Button>
                    }
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="tags" className="mt-4">
              {tags.length > 0 ? (
                <Card className="overflow-hidden rounded-2xl">
                  <CardContent className="p-0">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-4 text-left font-medium text-sm">
                            Tag
                          </th>
                          <th className="p-4 text-left font-medium text-sm">
                            Artifact Digest
                          </th>
                          <th className="p-4 text-left font-medium text-sm">
                            Size
                          </th>
                          <th className="p-4 text-left font-medium text-sm">
                            Security
                          </th>
                          <th className="p-4 text-left font-medium text-sm">
                            Created
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tags.map((tag) => (
                          <tr
                            key={tag.rowId}
                            className="border-b transition-colors last:border-b-0 hover:bg-muted/50"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{tag.name}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              {tag.artifact ? (
                                <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                                  {truncateDigest(tag.artifact.digest)}
                                </code>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                            <td className="p-4 text-muted-foreground text-sm">
                              {tag.artifact
                                ? formatBytes(Number(tag.artifact.size))
                                : "-"}
                            </td>
                            <td className="p-4">
                              <ScanBadge
                                scan={tag.artifact?.scanResults.nodes[0]}
                              />
                            </td>
                            <td className="p-4 text-muted-foreground text-sm">
                              {tag.createdAt
                                ? new Date(tag.createdAt).toLocaleDateString()
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Tag className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">No tags yet</h3>
                  <p className="text-muted-foreground">
                    Tags will appear when artifacts are uploaded with tag names
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
