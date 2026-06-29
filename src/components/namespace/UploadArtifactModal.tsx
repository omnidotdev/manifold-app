import { Button } from "@omnidotdev/thornberry/button";
import { useCallback, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateArtifactMutation,
  useCreateTagMutation,
} from "@/generated/graphql";
import { computeDigest, getByteSize } from "@/lib/util/digest";

import type { PropsWithChildren } from "react";

interface Props {
  /** Repository ID to upload the artifact to */
  repositoryId: string;
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Callback when artifact is created */
  onSuccess?: (artifact: { rowId: string; digest: string }) => void;
}

/**
 * Modal for uploading a new artifact (JSON content).
 */
const UploadArtifactModal = ({
  repositoryId,
  trigger,
  onSuccess,
  children,
}: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [mediaType, setMediaType] = useState(
    "application/vnd.omni.persona.v1+json",
  );
  const [tagName, setTagName] = useState("latest");
  const [digestPreview, setDigestPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createArtifact = useCreateArtifactMutation();
  const createTag = useCreateTagMutation();

  const isPending = createArtifact.isPending || createTag.isPending;

  // preview digest as user types
  const updateDigestPreview = useCallback(async (text: string) => {
    if (text.trim()) {
      const digest = await computeDigest(text);
      setDigestPreview(digest);
    } else {
      setDigestPreview(null);
    }
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    updateDigestPreview(value);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await file.text();
      setContent(text);
      updateDigestPreview(text);
    }
  };

  const resetForm = () => {
    setContent("");
    setMediaType("application/vnd.omni.persona.v1+json");
    setTagName("latest");
    setDigestPreview(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const digest = await computeDigest(content);
      const size = getByteSize(content);

      // create artifact
      const artifactResult = await createArtifact.mutateAsync({
        input: {
          artifact: {
            repositoryId,
            digest,
            size: size.toString(),
            mediaType,
            content,
          },
        },
      });

      const artifact = artifactResult.createArtifact?.artifact;
      if (!artifact) {
        throw new Error("Failed to create artifact");
      }

      // create tag if specified
      if (tagName) {
        await createTag.mutateAsync({
          input: {
            tag: {
              repositoryId,
              artifactId: artifact.rowId,
              name: tagName,
            },
          },
        });
      }

      setOpen(false);
      resetForm();
      onSuccess?.({ rowId: artifact.rowId, digest: artifact.digest });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload artifact",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Upload Artifact</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Artifact</DialogTitle>
          <DialogDescription>
            Upload JSON content as a new artifact version
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload File (optional)</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".json"
              onChange={handleFileUpload}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="artifact-content">Content</Label>
            <Textarea
              id="artifact-content"
              value={content}
              onChange={handleContentChange}
              placeholder='{"persona": {...}}'
              className="min-h-[200px] font-mono text-sm"
              required
            />
          </div>
          {digestPreview && (
            <div className="rounded bg-muted p-2">
              <p className="font-mono text-muted-foreground text-xs">
                Digest: {digestPreview}
              </p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="media-type">Media Type</Label>
              <Input
                id="media-type"
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tag-name">Tag (optional)</Label>
              <Input
                id="tag-name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="latest"
              />
            </div>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !content}>
              {isPending ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default UploadArtifactModal;
