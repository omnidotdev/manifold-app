import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Download,
  FileText,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DEMO_SCHEMAS,
  SCHEMA_TYPE_COLORS,
  SCHEMA_TYPE_LABELS,
  getSchemaIcon,
} from "@/lib/manifold/schemas";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute("/_app/schemas/$schemaId")({
  head: () => ({
    meta: createMetaTags({
      title: "Schema Detail | Manifold",
      description: "View schema details and content.",
    }),
  }),
  component: SchemaDetailPage,
});

function SchemaDetailPage() {
  const { schemaId } = Route.useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"content" | "metadata">("content");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const schema = DEMO_SCHEMAS.find((s) => s.id === schemaId);

  if (!schema) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <FileText className="h-12 w-12 text-muted-foreground" />
        <h1 className="font-semibold text-2xl">Schema not found</h1>
        <p className="text-muted-foreground">
          The schema you're looking for doesn't exist
        </p>
        <InternalLink to="/schemas" variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to schemas
        </InternalLink>
      </div>
    );
  }

  const handleDownload = () => {
    const blob = new Blob([schema.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${schema.name.toLowerCase().replace(/\s+/g, "-")}.${schema.type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    setShowDeleteDialog(false);
    navigate({ to: "/schemas" });
  };

  // Pretty-print JSON-based content
  const formatContent = (content: string) => {
    if (
      schema.type === "openapi" ||
      schema.type === "json" ||
      schema.type === "container"
    ) {
      try {
        return JSON.stringify(JSON.parse(content), null, 2);
      } catch {
        return content;
      }
    }
    return content;
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
              <div className="flex items-center gap-3">
                <div className="text-primary">{getSchemaIcon(schema.type)}</div>
                <div>
                  <h1 className="font-semibold text-xl">{schema.name}</h1>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs ${SCHEMA_TYPE_COLORS[schema.type]}`}
                    >
                      {SCHEMA_TYPE_LABELS[schema.type]}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      v{schema.metadata?.version || "1.0.0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Description */}
        <p className="mb-6 text-muted-foreground">{schema.description}</p>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "content" | "metadata")}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === "content" ? (
          <Card>
            <CardHeader className="flex-row items-center justify-between border-b">
              <CardTitle className="text-sm">Schema Content</CardTitle>
              <span className="text-muted-foreground text-xs">
                {SCHEMA_TYPE_LABELS[schema.type]}
              </span>
            </CardHeader>
            <CardContent className="p-0">
              <pre className="max-h-[600px] overflow-auto p-4 font-mono text-sm leading-relaxed">
                {formatContent(schema.content)}
              </pre>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Schema Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Schema Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Name</span>
                  <span className="font-medium text-sm">{schema.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Type</span>
                  <Badge className={SCHEMA_TYPE_COLORS[schema.type]}>
                    {SCHEMA_TYPE_LABELS[schema.type]}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Version</span>
                  <span className="font-medium text-sm">
                    v{schema.metadata?.version || "1.0.0"}
                  </span>
                </div>
                {schema.metadata?.runtime && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Runtime
                    </span>
                    <span className="font-medium text-sm">
                      {schema.metadata.runtime}
                    </span>
                  </div>
                )}
                {schema.metadata?.registry && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Registry
                    </span>
                    <span className="font-medium text-sm">
                      {schema.metadata.registry}
                    </span>
                  </div>
                )}
                {schema.metadata?.size && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Size</span>
                    <span className="font-medium text-sm">
                      {schema.metadata.size}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    <Calendar className="mr-1 inline h-3 w-3" />
                    Created
                  </span>
                  <span className="font-medium text-sm">
                    {schema.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    <Clock className="mr-1 inline h-3 w-3" />
                    Updated
                  </span>
                  <span className="font-medium text-sm">
                    {schema.updatedAt.toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Validation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Validation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-200">
                  <Check className="h-5 w-5" />
                  <span className="font-medium text-sm">Valid Schema</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onOpenChange={(open) => !open && setShowDeleteDialog(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Schema</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{schema.name}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
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
