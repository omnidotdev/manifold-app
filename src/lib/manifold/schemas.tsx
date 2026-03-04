import { Box, Container, FileJson, Layers, Network } from "lucide-react";

import type { Schema, SchemaType } from "@/lib/manifold/types";

/** Icon for a schema type */
const getSchemaIcon = (type: SchemaType, className = "h-5 w-5") => {
  const iconProps = { className };
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

/** Relative time formatter */
const formatRelativeDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Schema templates for creation wizard
const SCHEMA_TEMPLATES: Record<SchemaType, string> = {
  openapi: JSON.stringify(
    {
      openapi: "3.0.0",
      info: {
        title: "My API",
        description: "API description",
        version: "1.0.0",
      },
      paths: {},
    },
    null,
    2,
  ),
  graphql: `type Query {
  hello: String!
}`,
  json: JSON.stringify(
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "My Schema",
      type: "object",
      properties: {},
      required: [],
    },
    null,
    2,
  ),
  wasm: `(module
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add)
  (export "add" (func $add)))`,
  container: JSON.stringify(
    {
      schemaVersion: 2,
      mediaType: "application/vnd.docker.distribution.manifest.v2+json",
      config: {
        mediaType: "application/vnd.docker.container.image.v1+json",
        size: 1472,
        digest: "sha256:...",
      },
      layers: [],
    },
    null,
    2,
  ),
};

// Demo data
const now = new Date();
const yesterday = new Date(now);
yesterday.setDate(yesterday.getDate() - 1);
const lastWeek = new Date(now);
lastWeek.setDate(lastWeek.getDate() - 7);
const twoWeeksAgo = new Date(now);
twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

const DEMO_SCHEMAS: Schema[] = [
  {
    id: "1",
    name: "E-commerce API",
    description: "OpenAPI specification for our e-commerce platform",
    type: "openapi",
    content: SCHEMA_TEMPLATES.openapi,
    metadata: { version: "2.1.0" },
    createdAt: twoWeeksAgo,
    updatedAt: yesterday,
  },
  {
    id: "2",
    name: "Blog API",
    description: "GraphQL schema for our blog platform",
    type: "graphql",
    content: SCHEMA_TEMPLATES.graphql,
    metadata: { version: "1.3.0" },
    createdAt: lastWeek,
    updatedAt: now,
  },
  {
    id: "3",
    name: "Product Schema",
    description: "JSON Schema for product data validation",
    type: "json",
    content: SCHEMA_TEMPLATES.json,
    metadata: { version: "1.0.0" },
    createdAt: yesterday,
    updatedAt: yesterday,
  },
  {
    id: "4",
    name: "User Service API",
    description: "OpenAPI specification for user management endpoints",
    type: "openapi",
    content: SCHEMA_TEMPLATES.openapi,
    metadata: { version: "3.0.0" },
    createdAt: twoWeeksAgo,
    updatedAt: lastWeek,
  },
  {
    id: "5",
    name: "Analytics API",
    description: "GraphQL schema for analytics data",
    type: "graphql",
    content: SCHEMA_TEMPLATES.graphql,
    metadata: { version: "1.1.0" },
    createdAt: yesterday,
    updatedAt: yesterday,
  },
  {
    id: "6",
    name: "Configuration Schema",
    description: "JSON Schema for application configuration",
    type: "json",
    content: SCHEMA_TEMPLATES.json,
    metadata: { version: "1.2.0" },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "7",
    name: "Calculator Module",
    description: "WebAssembly module for arithmetic operations",
    type: "wasm",
    content: SCHEMA_TEMPLATES.wasm,
    metadata: { version: "1.0.0", runtime: "wasm32-wasi", size: "1.2KB" },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "8",
    name: "API Gateway Image",
    description: "Container image manifest for API gateway service",
    type: "container",
    content: SCHEMA_TEMPLATES.container,
    metadata: {
      version: "latest",
      registry: "ghcr.io",
      digest: "sha256:4b1cd8c9",
    },
    createdAt: lastWeek,
    updatedAt: now,
  },
];

export { DEMO_SCHEMAS, SCHEMA_TEMPLATES, formatRelativeDate, getSchemaIcon };

// Re-export types/constants for convenience
export { SCHEMA_TYPE_COLORS, SCHEMA_TYPE_LABELS } from "@/lib/manifold/types";
