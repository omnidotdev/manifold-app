import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileJson,
  Grid,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { InternalLink } from "@/components/core";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DEMO_SCHEMAS,
  SCHEMA_TYPE_COLORS,
  SCHEMA_TYPE_LABELS,
  getSchemaIcon,
} from "@/lib/manifold/schemas";
import createMetaTags from "@/lib/util/createMetaTags";

import type { Schema, SchemaType } from "@/lib/manifold/types";

const ITEMS_PER_PAGE = 12;

type SearchParams = {
  search?: string;
  type?: SchemaType | "all";
  page?: number;
  view?: "grid" | "list";
};

export const Route = createFileRoute("/_auth/schemas/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    search: (search.search as string) || undefined,
    type: (search.type as SchemaType | "all") || undefined,
    page: Number(search.page) || undefined,
    view: (search.view as "grid" | "list") || undefined,
  }),
  head: () => ({
    meta: createMetaTags({
      title: "Schemas | Manifold",
      description: "Browse and manage your API schemas.",
    }),
  }),
  component: SchemasPage,
});

function SchemasPage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { search, type, page, view } = Route.useSearch();

  const searchQuery = search || "";
  const filterType = type || "all";
  const currentPage = page || 1;
  const viewMode = view || "grid";

  const [schemas, setSchemas] = useState<Schema[]>(DEMO_SCHEMAS);
  const [deleteTarget, setDeleteTarget] = useState<Schema | null>(null);

  const updateSearch = (params: Partial<SearchParams>) => {
    navigate({ search: (prev: SearchParams) => ({ ...prev, ...params }) });
  };

  const filteredSchemas = schemas.filter((schema) => {
    const matchesSearch =
      schema.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schema.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || schema.type === filterType;
    return matchesSearch && matchesType;
  });

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredSchemas.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedSchemas = filteredSchemas.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const typeCounts = schemas.reduce(
    (acc, schema) => {
      acc[schema.type] = (acc[schema.type] || 0) + 1;
      return acc;
    },
    {} as Record<SchemaType, number>,
  );

  const handleDownload = (schema: Schema) => {
    const blob = new Blob([schema.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${schema.name.toLowerCase().replace(/\s+/g, "-")}.${schema.type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setSchemas(schemas.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="font-semibold text-2xl">Schemas</h1>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search schemas..."
                    value={searchQuery}
                    onChange={(e) =>
                      updateSearch({
                        search: e.target.value || undefined,
                        page: undefined,
                      })
                    }
                    className="w-64 pl-10"
                  />
                </div>

                <Tabs
                  value={filterType}
                  onValueChange={(v) =>
                    updateSearch({
                      type: v as SchemaType | "all",
                      page: undefined,
                    })
                  }
                >
                  <TabsList>
                    <TabsTrigger value="all">
                      All ({schemas.length})
                    </TabsTrigger>
                    <TabsTrigger value="openapi">
                      OpenAPI ({typeCounts.openapi || 0})
                    </TabsTrigger>
                    <TabsTrigger value="graphql">
                      GraphQL ({typeCounts.graphql || 0})
                    </TabsTrigger>
                    <TabsTrigger value="json">
                      JSON ({typeCounts.json || 0})
                    </TabsTrigger>
                    <TabsTrigger value="wasm">
                      WASM ({typeCounts.wasm || 0})
                    </TabsTrigger>
                    <TabsTrigger value="container">
                      Container ({typeCounts.container || 0})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex rounded-md border bg-background">
                <Button
                  variant={viewMode === "grid" ? "solid" : "ghost"}
                  size="icon"
                  onClick={() => updateSearch({ view: "grid" })}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "solid" : "ghost"}
                  size="icon"
                  onClick={() => updateSearch({ view: "list" })}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <InternalLink to="/schemas/create" variant="solid">
                <Plus className="mr-2 h-4 w-4" />
                New Schema
              </InternalLink>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">
        {viewMode === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedSchemas.map((schema) => (
              <InternalLink
                key={schema.id}
                to="/schemas/$schemaId"
                params={{ schemaId: schema.id }}
                variant="unstyled"
              >
                <Card className="group cursor-pointer transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-primary">
                          {getSchemaIcon(schema.type)}
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {schema.name}
                          </CardTitle>
                          <Badge
                            className={`mt-1 text-xs ${SCHEMA_TYPE_COLORS[schema.type]}`}
                          >
                            {SCHEMA_TYPE_LABELS[schema.type]}
                          </Badge>
                        </div>
                      </div>
                      <MenuRoot>
                        <MenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={(e) => e.preventDefault()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </MenuTrigger>
                        <MenuContent>
                          <MenuItem
                            value="download"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDownload(schema);
                            }}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </MenuItem>
                          <MenuItem
                            value="delete"
                            className="text-destructive"
                            onClick={(e) => {
                              e.preventDefault();
                              setDeleteTarget(schema);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </MenuItem>
                        </MenuContent>
                      </MenuRoot>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-muted-foreground text-sm">
                      {schema.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-muted-foreground text-xs">
                      <span>v{schema.metadata?.version || "1.0.0"}</span>
                      <span>
                        Updated {schema.updatedAt.toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </InternalLink>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-left font-medium text-sm">Name</th>
                    <th className="p-4 text-left font-medium text-sm">Type</th>
                    <th className="p-4 text-left font-medium text-sm">
                      Version
                    </th>
                    <th className="p-4 text-left font-medium text-sm">
                      Updated
                    </th>
                    <th className="p-4 text-right font-medium text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSchemas.map((schema) => (
                    <tr
                      key={schema.id}
                      className="cursor-pointer border-b transition-colors hover:bg-muted/50"
                      onClick={() =>
                        navigate({
                          to: "/schemas/$schemaId",
                          params: { schemaId: schema.id },
                        })
                      }
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-primary">
                            {getSchemaIcon(schema.type)}
                          </div>
                          <div>
                            <div className="font-medium">{schema.name}</div>
                            <div className="text-muted-foreground text-sm">
                              {schema.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={SCHEMA_TYPE_COLORS[schema.type]}>
                          {SCHEMA_TYPE_LABELS[schema.type]}
                        </Badge>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        v{schema.metadata?.version || "1.0.0"}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {schema.updatedAt.toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(schema);
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteTarget(schema);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {filteredSchemas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileJson className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-lg">No schemas found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search or filters"
                : "Create your first schema to get started"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={safePage <= 1}
              onClick={() => updateSearch({ page: safePage - 1 })}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === safePage ? "solid" : "outline"}
                size="icon"
                onClick={() => updateSearch({ page: p })}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              disabled={safePage >= totalPages}
              onClick={() => updateSearch({ page: safePage + 1 })}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Schema</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteTarget?.name}&quot;?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
