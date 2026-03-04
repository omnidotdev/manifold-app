import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Box,
  Container,
  FileJson,
  Layers,
  Network,
} from "lucide-react";
import { useRef, useState } from "react";

import { InternalLink } from "@/components/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SCHEMA_TEMPLATES, SCHEMA_TYPE_LABELS } from "@/lib/manifold/schemas";
import createMetaTags from "@/lib/util/createMetaTags";

import type { SchemaType } from "@/lib/manifold/types";

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

export const Route = createFileRoute("/_auth/schemas/create")({
  head: () => ({
    meta: createMetaTags({
      title: "Create Schema | Manifold",
      description: "Create a new schema.",
    }),
  }),
  component: SchemaCreatePage,
});

function SchemaCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [schemaType, setSchemaType] = useState<SchemaType | undefined>();
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const handleTypeSelect = (type: SchemaType) => {
    setSchemaType(type);
    setContent(SCHEMA_TEMPLATES[type]);
  };

  const handleSave = () => {
    if (!name.trim() || !schemaType) return;
    // In production, this would call a mutation
    navigate({ to: "/schemas" });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <InternalLink to="/schemas" variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </InternalLink>
              <h1 className="font-semibold text-xl">Create Schema</h1>
            </div>

            <div className="flex items-center gap-2">
              <InternalLink to="/schemas" variant="outline">
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

      <div className="container mx-auto max-w-4xl px-6 py-6">
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
                <textarea
                  ref={editorRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  spellCheck={false}
                  className="min-h-[400px] w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed outline-none"
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
