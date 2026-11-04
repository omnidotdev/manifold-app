import { json } from "@codemirror/lang-json";
import { wast } from "@codemirror/lang-wast";
import { yaml } from "@codemirror/lang-yaml";
import { Button } from "@omnidotdev/thornberry/button";
import { CodeEditor } from "@omnidotdev/thornberry/code-editor";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { graphql } from "cm6-graphql";
import {
  ArrowLeft,
  Box,
  Container,
  FileJson,
  Layers,
  Network,
} from "lucide-react";
import { useMemo, useState } from "react";

import { InternalLink } from "@/components/core";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SCHEMA_TEMPLATES, SCHEMA_TYPE_LABELS } from "@/lib/manifold/schemas";
import createMetaTags from "@/lib/util/createMetaTags";

import type { Extension } from "@codemirror/state";
import type { SchemaType } from "@/lib/manifold/types";

type EditorLanguage = "json" | "yaml" | "graphql" | "wast";

/** CodeMirror language extensions, built once and shared across renders */
const EDITOR_LANGUAGES: Record<EditorLanguage, Extension> = {
  json: json(),
  yaml: yaml(),
  graphql: graphql(),
  wast: wast(),
};

/** Whether the text reads as JSON rather than YAML */
const isLikelyJson = (text: string) => {
  const trimmed = text.trimStart();
  return trimmed.startsWith("{") || trimmed.startsWith("[");
};

/**
 * Pick the CodeMirror language for a schema format. The editor reconfigures its
 * language compartment live, so switching the selected type reflows highlighting
 * without remounting. OpenAPI may be authored as JSON or YAML, so it is resolved
 * from the content (defaulting to JSON). Container (OCI) manifests have no
 * dedicated grammar and stay plain text
 */
const languageIdForSchema = (
  type: SchemaType,
  content: string,
): EditorLanguage | undefined => {
  switch (type) {
    // JSON Schema is always JSON
    case "json":
      return "json";
    // OpenAPI specs come in either JSON or YAML
    case "openapi":
      return isLikelyJson(content) ? "json" : "yaml";
    case "graphql":
      return "graphql";
    // WebAssembly modules are edited as WAST (WebAssembly text)
    case "wasm":
      return "wast";
    // OCI image manifests carry no dedicated grammar, so leave them plain
    default:
      return undefined;
  }
};

const SCHEMA_TYPE_OPTIONS: {
  type: SchemaType;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    type: "openapi",
    icon: <FileJson className="h-6 w-6" />,
    description: "REST API specification",
  },
  {
    type: "graphql",
    icon: <Network className="h-6 w-6" />,
    description: "GraphQL schema definition",
  },
  {
    type: "json",
    icon: <Box className="h-6 w-6" />,
    description: "JSON Schema for validation",
  },
  {
    type: "wasm",
    icon: <Layers className="h-6 w-6" />,
    description: "WebAssembly module",
  },
  {
    type: "container",
    icon: <Container className="h-6 w-6" />,
    description: "Container image manifest",
  },
];

export const Route = createFileRoute(
  "/_app/@{$workspaceSlug}/~/schemas/create",
)({
  head: () => ({
    meta: createMetaTags({
      title: "Create Schema | Manifold",
      description: "Create a new schema.",
    }),
  }),
  component: SchemaCreatePage,
});

function SchemaCreatePage() {
  const { workspaceSlug } = Route.useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [schemaType, setSchemaType] = useState<SchemaType | undefined>();
  const [content, setContent] = useState("");

  const languageId = schemaType
    ? languageIdForSchema(schemaType, content)
    : undefined;
  const language = useMemo(
    () => (languageId ? EDITOR_LANGUAGES[languageId] : undefined),
    [languageId],
  );

  const handleTypeSelect = (type: SchemaType) => {
    setSchemaType(type);
    setContent(SCHEMA_TEMPLATES[type]);
  };

  const handleSave = () => {
    if (!name.trim() || !schemaType) return;
    // In production, this would call a mutation
    navigate({ to: "/@{$workspaceSlug}/~/schemas", params: { workspaceSlug } });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <InternalLink
                to="/@{$workspaceSlug}/~/schemas"
                params={{ workspaceSlug }}
                variant="ghost"
                size="icon"
              >
                <ArrowLeft className="h-4 w-4" />
              </InternalLink>
              <h1 className="font-semibold text-xl">Create Schema</h1>
            </div>

            <div className="flex items-center gap-2">
              <InternalLink
                to="/@{$workspaceSlug}/~/schemas"
                params={{ workspaceSlug }}
                variant="outline"
              >
                Cancel
              </InternalLink>
              <Button
                onClick={handleSave}
                disabled={!name.trim() || !schemaType}
              >
                Save Schema
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl max-w-7xl px-6 py-6">
        {/* Name & Description */}
        <div className="mb-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My API Schema"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your schema..."
              className="min-h-[80px]"
            />
          </div>
        </div>

        {/* Type Selector */}
        <div className="mb-8">
          <Label className="mb-3 block">Schema Type</Label>
          <div className="grid gap-3 sm:grid-cols-5">
            {SCHEMA_TYPE_OPTIONS.map((option) => (
              <Card
                key={option.type}
                className={`cursor-pointer transition-all ${
                  schemaType === option.type
                    ? "bg-primary/5 ring-2 ring-primary"
                    : "hover:border-primary/40"
                }`}
                onClick={() => handleTypeSelect(option.type)}
              >
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <div
                    className={
                      schemaType === option.type
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    {option.icon}
                  </div>
                  <span className="font-medium text-sm">
                    {SCHEMA_TYPE_LABELS[option.type]}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {option.description}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Code Editor */}
        {schemaType && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Content</Label>
              <span className="text-muted-foreground text-xs">
                {SCHEMA_TYPE_LABELS[schemaType]}
              </span>
            </div>
            <Card>
              <CardContent className="p-0">
                <CodeEditor
                  value={content}
                  onChange={setContent}
                  language={language}
                  className="min-h-[400px] w-full overflow-auto p-2 text-sm"
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
