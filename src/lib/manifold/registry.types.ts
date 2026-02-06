/**
 * Supported artifact types in the registry.
 */
export type ArtifactType =
  | "persona"
  | "openapi"
  | "graphql"
  | "jsonschema"
  | "wasm"
  | "container";

/**
 * Human-readable labels for artifact types.
 */
export const ARTIFACT_TYPE_LABELS: Record<ArtifactType, string> = {
  persona: "Persona",
  openapi: "OpenAPI",
  graphql: "GraphQL",
  jsonschema: "JSON Schema",
  wasm: "WebAssembly",
  container: "Container",
};

/**
 * Color classes for artifact type badges.
 */
export const ARTIFACT_TYPE_COLORS: Record<ArtifactType, string> = {
  persona:
    "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  openapi: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  graphql: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  jsonschema:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  wasm: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  container: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

/**
 * Check if a string is a valid artifact type.
 */
export const isValidArtifactType = (type: string): type is ArtifactType =>
  Object.keys(ARTIFACT_TYPE_LABELS).includes(type);
