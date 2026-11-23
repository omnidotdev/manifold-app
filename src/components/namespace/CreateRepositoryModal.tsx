import { Button } from "@omnidotdev/thornberry/button";
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@omnidotdev/thornberry/dialog";
import { Input } from "@omnidotdev/thornberry/input";
import { Label } from "@omnidotdev/thornberry/label";
import { Textarea } from "@omnidotdev/thornberry/textarea";
import { useState } from "react";

import FormSelect from "@/components/core/FormSelect";
import { useCreateRepositoryMutation } from "@/generated/graphql";
import { ARTIFACT_TYPE_LABELS } from "@/lib/manifold/registry.types";

import type { PropsWithChildren } from "react";
import type { ArtifactType } from "@/lib/manifold/registry.types";

const ARTIFACT_TYPE_OPTIONS = Object.entries(ARTIFACT_TYPE_LABELS).map(
  ([value, label]) => ({ value, label }),
);

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
    <DialogRoot
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      lazyMount
      unmountOnExit
    >
      <DialogTrigger asChild>
        {trigger ?? <Button>Create Repository</Button>}
      </DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogCloseTrigger />
            <div className="flex flex-col gap-1.5">
              <DialogTitle>Create Repository</DialogTitle>
              <DialogDescription>
                Repositories store versioned artifacts
              </DialogDescription>
            </div>
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
                <FormSelect
                  value={artifactType}
                  onValueChange={(v) => setArtifactType(v as ArtifactType)}
                  options={ARTIFACT_TYPE_OPTIONS}
                  placeholder="Select type"
                  ariaLabel="Artifact Type"
                  required
                />
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
        </DialogPositioner>
      </DialogPortal>
    </DialogRoot>
  );
};

export default CreateRepositoryModal;
