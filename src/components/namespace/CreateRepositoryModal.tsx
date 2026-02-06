import { useState } from "react";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRepositoryMutation } from "@/generated/graphql";
import { ARTIFACT_TYPE_LABELS } from "@/lib/manifold/registry.types";

import type { PropsWithChildren } from "react";
import type { ArtifactType } from "@/lib/manifold/registry.types";

interface Props {
  /** Namespace ID to create the repository in */
  namespaceId: string;
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Callback when repository is created */
  onSuccess?: (repository: { rowId: string; name: string }) => void;
}

/**
 * Modal for creating a new repository within a namespace.
 */
const CreateRepositoryModal = ({
  namespaceId,
  trigger,
  onSuccess,
  children,
}: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [artifactType, setArtifactType] = useState<ArtifactType>("persona");
  const [isPublic, setIsPublic] = useState(false);

  const resetForm = () => {
    setName("");
    setDescription("");
    setArtifactType("persona");
    setIsPublic(false);
  };

  const { mutate, isPending, error } = useCreateRepositoryMutation({
    onSuccess: (data) => {
      const repo = data.createRepository?.repository;
      if (repo) {
        setOpen(false);
        resetForm();
        onSuccess?.({ rowId: repo.rowId, name: repo.name });
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      input: {
        repository: {
          namespaceId,
          name,
          description: description || undefined,
          artifactType,
          isPublic,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>Create Repository</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Repository</DialogTitle>
          <DialogDescription>
            Repositories store versioned artifacts
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repo-name">Name</Label>
            <Input
              id="repo-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="my-persona"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repo-description">Description</Label>
            <Textarea
              id="repo-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </div>
          <div className="space-y-2">
            <Label>Artifact Type</Label>
            <Select
              value={artifactType}
              onValueChange={(v) => setArtifactType(v as ArtifactType)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ARTIFACT_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is-public"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <Label htmlFor="is-public">Public repository</Label>
          </div>
          {error ? (
            <p className="text-destructive text-sm">
              {error instanceof Error
                ? error.message
                : "Failed to create repository"}
            </p>
          ) : null}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !name}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CreateRepositoryModal;
