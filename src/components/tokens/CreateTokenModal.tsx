import { Badge } from "@omnidotdev/thornberry/badge";
import { Button } from "@omnidotdev/thornberry/button";
import { useMutation } from "@tanstack/react-query";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import {
  useNamespacesQuery,
  useRepositoriesByNamespaceQuery,
} from "@/generated/graphql";
import { createToken } from "@/server/functions/tokens";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const EXPIRY_OPTIONS = [
  { label: "30 days", value: "30" },
  { label: "90 days", value: "90" },
  { label: "1 year", value: "365" },
  { label: "Never", value: "never" },
];

/**
 * Compute expiration date from days offset
 */
const computeExpiresAt = (days: string): string | undefined => {
  if (days === "never") return undefined;
  const date = new Date();
  date.setDate(date.getDate() + Number.parseInt(days, 10));
  return date.toISOString();
};

/**
 * Modal for creating a new API token
 */
const CreateTokenModal = ({ open, onOpenChange, onSuccess }: Props) => {
  // Form state
  const [name, setName] = useState("");
  const [scope, setScope] = useState("read");
  const [namespaceId, setNamespaceId] = useState("");
  const [repositoryId, setRepositoryId] = useState("");
  const [expiryDays, setExpiryDays] = useState("90");

  // Result state (shown after creation)
  const [plaintextToken, setPlaintextToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Fetch namespaces for dropdown
  const { data: namespacesData } = useNamespacesQuery();
  const namespaces = namespacesData?.namespaces?.nodes?.filter(Boolean) ?? [];

  // Fetch repositories when a namespace is selected
  const { data: reposData } = useRepositoriesByNamespaceQuery(
    { namespaceId },
    { enabled: !!namespaceId },
  );
  const repositories = reposData?.repositories?.nodes?.filter(Boolean) ?? [];

  const mutation = useMutation({
    mutationFn: (body: {
      name: string;
      scope: string;
      namespaceId: string;
      repositoryId?: string;
      expiresAt?: string;
    }) => createToken({ data: body }),
    onSuccess: (result) => {
      setPlaintextToken(result.plaintextToken);
      onSuccess?.();
    },
  });

  const resetForm = () => {
    setName("");
    setScope("read");
    setNamespaceId("");
    setRepositoryId("");
    setExpiryDays("90");
    setPlaintextToken(null);
    setCopied(false);
    mutation.reset();
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name,
      scope,
      namespaceId,
      repositoryId: repositoryId || undefined,
      expiresAt: computeExpiresAt(expiryDays),
    });
  };

  const handleCopy = async () => {
    if (!plaintextToken) return;
    await navigator.clipboard.writeText(plaintextToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // After successful creation, show the plaintext token
  if (plaintextToken) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Token Created</DialogTitle>
            <DialogDescription>
              Copy your token now. It will not be shown again.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-md border bg-muted p-4">
              <div className="flex items-center justify-between gap-2">
                <code className="break-all font-mono text-sm">
                  {plaintextToken}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Badge variant="destructive" className="text-xs">
              Store this token securely — it cannot be retrieved again
            </Badge>

            <div className="flex justify-end">
              <Button onClick={() => handleClose(false)}>Done</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create API Token</DialogTitle>
          <DialogDescription>
            Generate a token for programmatic access to your registries
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="token-name">Name</Label>
            <Input
              id="token-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. CI/CD Pipeline"
              required
            />
          </div>

          {/* Scope */}
          <div className="space-y-2">
            <Label>Scope</Label>
            <Select value={scope} onValueChange={setScope} required>
              <SelectTrigger>
                <SelectValue placeholder="Select scope" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="write">Write</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Namespace */}
          <div className="space-y-2">
            <Label>Namespace</Label>
            <Select
              value={namespaceId}
              onValueChange={(val) => {
                setNamespaceId(val);
                // Reset repository when namespace changes
                setRepositoryId("");
              }}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select namespace" />
              </SelectTrigger>
              <SelectContent>
                {namespaces.map((ns) =>
                  ns ? (
                    <SelectItem key={ns.rowId} value={ns.rowId}>
                      {ns.name}
                    </SelectItem>
                  ) : null,
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Repository (optional) */}
          {namespaceId && repositories.length > 0 && (
            <div className="space-y-2">
              <Label>Repository (optional)</Label>
              <Select value={repositoryId} onValueChange={setRepositoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="All repositories" />
                </SelectTrigger>
                <SelectContent>
                  {repositories.map((repo) =>
                    repo ? (
                      <SelectItem key={repo.rowId} value={repo.rowId}>
                        {repo.name}
                      </SelectItem>
                    ) : null,
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Expiry */}
          <div className="space-y-2">
            <Label>Expires</Label>
            <Select value={expiryDays} onValueChange={setExpiryDays}>
              <SelectTrigger>
                <SelectValue placeholder="Select expiry" />
              </SelectTrigger>
              <SelectContent>
                {EXPIRY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {mutation.error ? (
            <p className="text-destructive text-sm">
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Failed to create token"}
            </p>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending || !name || !namespaceId}
            >
              {mutation.isPending ? "Creating..." : "Create Token"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTokenModal;
