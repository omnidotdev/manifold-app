import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Search,
  Grid,
  List,
  FileJson,
  Network,
  Box,
  Container,
  Layers,
  MoreHorizontal,
  Download,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@/components/ui/menu";
import createMetaTags from "@/lib/util/createMetaTags";
import type { Schema, SchemaType } from "@/lib/manifold/types";
import {
  SCHEMA_TYPE_LABELS,
  SCHEMA_TYPE_COLORS,
} from "@/lib/manifold/types";

export const Route = createFileRoute("/_auth/schemas")({
  head: () => ({
    meta: createMetaTags({
      title: "Schemas | Manifold",
      description: "Browse and manage your API schemas.",
    }),
  }),
  component: SchemasPage,
});

// Demo data
const DEMO_SCHEMAS: Schema[] = [
  {
    id: "1",
    name: "User API",
    description: "REST API specification for user management",
    type: "openapi",
    content: '{"openapi": "3.0.0"}',
    metadata: { version: "1.0.0" },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    name: "Product Schema",
    description: "GraphQL schema for product catalog",
    type: "graphql",
    content: "type Product { id: ID! }",
    metadata: { version: "2.1.0" },
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    name: "Config Schema",
    description: "JSON Schema for application configuration",
    type: "json",
    content: '{"$schema": "http://json-schema.org/draft-07/schema#"}',
    metadata: { version: "1.2.0" },
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "4",
    name: "Image Processor",
    description: "WebAssembly module for image processing",
    type: "wasm",
    content: "",
    metadata: { runtime: "wasm32-wasi", size: "1.2MB" },
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    id: "5",
    name: "API Gateway",
    description: "Container image manifest for API gateway",
    type: "container",
    content: "",
    metadata: { registry: "ghcr.io", digest: "sha256:abc123" },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-05"),
  },
];

function SchemasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterType, setFilterType] = useState<SchemaType | "all">("all");
  const [schemas] = useState<Schema[]>(DEMO_SCHEMAS);

  const filteredSchemas = schemas.filter((schema) => {
    const matchesSearch =
      schema.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schema.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || schema.type === filterType;
    return matchesSearch && matchesType;
  });

  const getSchemaIcon = (type: SchemaType) => {
    const iconProps = { className: "h-5 w-5" };
    switch (type) {
      case "openapi":
        return <FileJson {...iconProps} />;
      case "graphql":
        return <Network {...iconProps} />;
      case "json":
        return <Box {...iconProps} />;
      case "wasm":
        return <Layers {...iconProps} />;
      case "container":
        return <Container {...iconProps} />;
    }
  };

  // Count schemas by type
  const typeCounts = schemas.reduce(
    (acc, schema) => {
      acc[schema.type] = (acc[schema.type] || 0) + 1;
      return acc;
    },
    {} as Record<SchemaType, number>,
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-semibold">Schemas</h1>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search schemas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10"
                  />
                </div>

                <Tabs
                  value={filterType}
                  onValueChange={(v) =>
                    setFilterType(v as SchemaType | "all")
                  }
                >
                  <TabsList>
                    <TabsTrigger value="all">All ({schemas.length})</TabsTrigger>
                    <TabsTrigger value="openapi">
                      OpenAPI ({typeCounts.openapi || 0})
                    </TabsTrigger>
                    <TabsTrigger value="graphql">
                      GraphQL ({typeCounts.graphql || 0})
                    </TabsTrigger>
                    <TabsTrigger value="json">
                      JSON ({typeCounts.json || 0})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex rounded-md border bg-background">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Schema
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">
        {viewMode === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSchemas.map((schema) => (
              <Card
                key={schema.id}
                className="group cursor-pointer transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-primary">
                        {getSchemaIcon(schema.type)}
                      </div>
                      <div>
                        <CardTitle className="text-base">{schema.name}</CardTitle>
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
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </MenuTrigger>
                      <MenuContent>
                        <MenuItem value="download">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </MenuItem>
                        <MenuItem value="edit">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </MenuItem>
                        <MenuItem value="delete" className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </MenuItem>
                      </MenuContent>
                    </MenuRoot>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {schema.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>v{schema.metadata?.version || "1.0.0"}</span>
                    <span>
                      Updated{" "}
                      {schema.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-left text-sm font-medium">Name</th>
                    <th className="p-4 text-left text-sm font-medium">Type</th>
                    <th className="p-4 text-left text-sm font-medium">Version</th>
                    <th className="p-4 text-left text-sm font-medium">Updated</th>
                    <th className="p-4 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchemas.map((schema) => (
                    <tr
                      key={schema.id}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-primary">
                            {getSchemaIcon(schema.type)}
                          </div>
                          <div>
                            <div className="font-medium">{schema.name}</div>
                            <div className="text-sm text-muted-foreground">
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
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
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
            <h3 className="mb-2 text-lg font-semibold">No schemas found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search or filters"
                : "Create your first schema to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
