export type SchemaType =
  | "openapi"
  | "graphql"
  | "json"
  | "wasm"
  | "container";

export interface Schema {
  id: string;
  name: string;
  description: string;
  type: SchemaType;
  content: string;
  metadata?: {
    size?: string;
    version?: string;
    runtime?: string;
    registry?: string;
    digest?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface SchemaVersion {
  id: string;
  schemaId: string;
  version: string;
  content: string;
  createdAt: Date;
}

export const SCHEMA_TYPE_LABELS: Record<SchemaType, string> = {
  openapi: "OpenAPI",
  graphql: "GraphQL",
  json: "JSON Schema",
  wasm: "WASM",
  container: "Container",
};

export const SCHEMA_TYPE_COLORS: Record<SchemaType, string> = {
  openapi: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  graphql: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  json: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  wasm: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  container: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};
