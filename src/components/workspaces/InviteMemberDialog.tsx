import { Button } from "@omnidotdev/thornberry/button";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouteContext } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useOrganization } from "@/lib/context";
import { useInviteMember } from "@/lib/hooks/useOrganizationMembers";
import organizationInvitationsOptions from "@/lib/options/organizationInvitations.options";
import organizationMembersOptions from "@/lib/options/organizationMembers.options";
import { validateInvitation } from "@/lib/validation/invitation";

import type { RefObject } from "react";

const emailSchema = z.string().email();

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
}

/**
 * Dialog for inviting new members to the organization
 */
const InviteMemberDialog = ({ isOpen, onOpenChange }: Props) => {
  const { workspaceSlug } = useParams({ strict: false });
  const { auth } = useRouteContext({ strict: false });
  const { organizations } = useOrganization();

  const org = organizations.find((o) => o.slug === workspaceSlug);
  const organizationId = org?.id;

  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const emailRef = useRef<HTMLInputElement>(null);

  // Fetch current members to check limits
  const { data: membersData } = useQuery({
    ...organizationMembersOptions({
      organizationId: organizationId ?? "",
      accessToken: auth?.accessToken ?? "",
    }),
    enabled: !!organizationId && !!auth?.accessToken,
  });

  const memberEmails = membersData?.data?.map((m) => m.user.email) ?? [];

  // Fetch pending invitations for dedup validation
  const { data: invitationsData } = useQuery({
    ...organizationInvitationsOptions({ organizationId: organizationId ?? "" }),
    enabled: !!organizationId,
  });
  const pendingInvitations = invitationsData?.active ?? [];

  const { mutateAsync: inviteMember, isPending } = useInviteMember();

  const addEmail = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newEmails = trimmed
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    for (const email of newEmails) {
      if (!emailSchema.safeParse(email).success) {
        toast.error(`Invalid email: ${email}`);
        return;
      }

      if (emails.includes(email)) {
        toast.error("This email is already in the invite list");
        return;
      }

      const result = validateInvitation({
        email,
        pendingInvitations,
        memberEmails,
      });

      if (!result.valid) {
        toast.error(result.reason);
        return;
      }
    }

    setEmails((prev) => [...prev, ...newEmails]);
    setEmailInput("");
  };

  const removeEmail = (email: string) => {
    setEmails((prev) => prev.filter((e) => e !== email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add any remaining input
    if (emailInput.trim()) {
      addEmail(emailInput);
      return;
    }

    if (!emails.length || !organizationId) return;

    for (const email of emails) {
      try {
        await inviteMember({
          organizationId,
          email,
          role: "member",
        });
        toast.success(`Invitation sent to ${email}`);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : `Failed to send invitation to ${email}`,
        );
      }
    }

    setEmails([]);
    setEmailInput("");
    onOpenChange(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          setEmails([]);
          setEmailInput("");
        }
      }}
    >
      <DialogContent>
        <DialogTitle>Invite Team Member</DialogTitle>
        <DialogDescription>
          Invite new members to your organization
        </DialogDescription>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="invite-email" className="font-medium text-sm">
              Email(s)
            </label>

            {emails.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {emails.map((email) => (
                  <span
                    key={email}
                    className="inline-flex items-center gap-1 rounded-full border bg-muted px-2.5 py-0.5 text-xs"
                  >
                    {email}
                    <button
                      type="button"
                      onClick={() => removeEmail(email)}
                      className="ml-0.5 text-muted-foreground hover:text-foreground"
                      aria-label={`Remove ${email}`}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}

            <Input
              id="invite-email"
              ref={emailRef}
              type="text"
              placeholder="hello@omni.dev"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addEmail(emailInput);
                }
              }}
            />
            <p className="text-muted-foreground text-xs">
              Press Enter or comma to add multiple emails
            </p>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEmails([]);
                setEmailInput("");
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending || (!emails.length && !emailInput.trim())}
            >
              <PlusIcon className="size-4" />
              Invite Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;
