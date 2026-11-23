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

import { useCreateNamespaceMutation } from "@/generated/graphql";
import { useWorkspace } from "@/lib/context";
import { cleanGraphqlError } from "@/lib/graphql/cleanError";

import type { PropsWithChildren } from "react";

interface Props {
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Callback when namespace is created */
  onSuccess?: (namespace: { rowId: string; name: string }) => void;
}

/**
 * Modal for creating a new namespace.
 */
const CreateNamespaceModal = ({
  trigger,
  onSuccess,
  children,
}: PropsWithChildren<Props>) => {
  const { activeWorkspace } = useWorkspace();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isPending, error } = useCreateNamespaceMutation({
    onSuccess: (data) => {
      const ns = data.createNamespace?.namespace;
      if (ns) {
        setOpen(false);
        setName("");
        setDescription("");
        onSuccess?.({ rowId: ns.rowId, name: ns.name });
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      input: {
        namespace: {
          name,
          description: description || undefined,
          // Scope the namespace to the active workspace so it is owned by the
          // right org (and visible under org-scoped reads)
          organizationId: activeWorkspace?.id,
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
        {trigger ?? <Button>Create Namespace</Button>}
      </DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogCloseTrigger />
            <div className="flex flex-col gap-1.5">
              <DialogTitle>Create Namespace</DialogTitle>
              <DialogDescription>
                Namespaces organize your repositories and artifacts
              </DialogDescription>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="namespace-name">Name</Label>
                <Input
                  id="namespace-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="my-namespace"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="namespace-description">Description</Label>
                <Textarea
                  id="namespace-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description"
                />
              </div>
              {error ? (
                <p className="text-destructive text-sm">
                  {cleanGraphqlError(error, "Failed to create namespace")}
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

export default CreateNamespaceModal;
