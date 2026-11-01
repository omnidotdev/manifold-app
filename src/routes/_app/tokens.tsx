import { Badge } from "@omnidotdev/thornberry/badge";
import { Button } from "@omnidotdev/thornberry/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Key, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import CreateTokenModal from "@/components/tokens/CreateTokenModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import createMetaTags from "@/lib/util/createMetaTags";
import { fetchTokens, revokeToken } from "@/server/functions/tokens";

import type { ApiToken } from "@/server/functions/tokens";

export const Route = createFileRoute("/_app/tokens")({
  head: () => ({
    meta: createMetaTags({
      title: "API Tokens | Manifold",
      description: "Manage your API tokens for programmatic access.",
    }),
  }),
  component: TokensPage,
});

/**
 * Format a date string for display
 */
const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "Never";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Scope badge variant based on scope level
 */
const scopeVariant = (scope: string) => {
  switch (scope) {
    case "admin":
      return "destructive" as const;
    case "write":
      return "solid" as const;
    default:
      return "secondary" as const;
  }
};

function TokensPage() {
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState<ApiToken | null>(null);

  const {
    data: tokens,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tokens"],
    queryFn: () => fetchTokens(),
  });

  const revokeMutation = useMutation({
    mutationFn: (tokenId: string) => revokeToken({ data: { tokenId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
      setRevokeTarget(null);
    },
  });

  // Filter to only show active tokens
  const activeTokens = tokens?.filter((t) => t.isActive) ?? [];
  const revokedTokens = tokens?.filter((t) => !t.isActive) ?? [];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key className="h-6 w-6 text-primary" />
              <h1 className="font-semibold text-2xl">API Tokens</h1>
            </div>

            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Token
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto space-y-6 px-6 py-6">
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <p className="text-muted-foreground">Loading tokens...</p>
          </div>
        )}

        {error ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-destructive">
              {error instanceof Error ? error.message : "Failed to load tokens"}
            </p>
          </div>
        ) : null}

        {!isLoading && !error && activeTokens.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Key className="h-8 w-8" />
            </div>
            <h3 className="mb-2 font-semibold text-lg">No active tokens</h3>
            <p className="mb-4 text-muted-foreground">
              Create an API token for programmatic access to your registries
            </p>
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Token
            </Button>
          </div>
        )}

        {activeTokens.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Active Tokens</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Name</TableHead>
                    <TableHead>Prefix</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeTokens.map((token) => (
                    <TableRow key={token.id}>
                      <TableCell className="pl-6 font-medium">
                        {token.name}
                      </TableCell>
                      <TableCell>
                        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                          {token.tokenPrefix}...
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant={scopeVariant(token.scope)}>
                          {token.scope}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(token.createdAt)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(token.lastUsedAt)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(token.expiresAt)}
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setRevokeTarget(token)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {revokedTokens.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                Revoked Tokens
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Name</TableHead>
                    <TableHead>Prefix</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Revoked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revokedTokens.map((token) => (
                    <TableRow key={token.id} className="opacity-50">
                      <TableCell className="pl-6 font-medium">
                        {token.name}
                      </TableCell>
                      <TableCell>
                        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                          {token.tokenPrefix}...
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{token.scope}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(token.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Revoked</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Token Modal */}
      <CreateTokenModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["tokens"] });
        }}
      />

      {/* Revoke Confirmation Dialog */}
      <Dialog
        open={revokeTarget !== null}
        onOpenChange={(open) => {
          if (!open) setRevokeTarget(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Token</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke{" "}
              <strong>{revokeTarget?.name}</strong>? This action cannot be
              undone. Any applications using this token will lose access.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRevokeTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={revokeMutation.isPending}
              onClick={() => {
                if (revokeTarget) {
                  revokeMutation.mutate(revokeTarget.id);
                }
              }}
            >
              {revokeMutation.isPending ? "Revoking..." : "Revoke Token"}
            </Button>
          </div>
          {revokeMutation.error ? (
            <p className="text-destructive text-sm">
              {revokeMutation.error instanceof Error
                ? revokeMutation.error.message
                : "Failed to revoke token"}
            </p>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
