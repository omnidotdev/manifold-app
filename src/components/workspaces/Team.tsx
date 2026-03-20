import { useQuery } from "@tanstack/react-query";
import { useParams, useRouteContext } from "@tanstack/react-router";
import {
  CheckIcon,
  ChevronDownIcon,
  MoreHorizontalIcon,
  PlusIcon,
  RefreshCwIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  // @ts-expect-error pending dialog component migration
  DialogBackdrop,
  // @ts-expect-error pending dialog component migration
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  // @ts-expect-error pending dialog component migration
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useOrganization } from "@/lib/context";
import {
  useCancelInvitation,
  useRemoveMember,
  useResendInvitation,
  useUpdateMemberRole,
} from "@/lib/hooks/useOrganizationMembers";
import organizationInvitationsOptions from "@/lib/options/organizationInvitations.options";
import organizationMembersOptions from "@/lib/options/organizationMembers.options";
import cn from "@/lib/utils";
import { getInviteTimeInfo } from "@/lib/validation/invitation";
import InviteMemberDialog from "./InviteMemberDialog";

type Role = "owner" | "admin" | "member";

/**
 * Check if the acting role can modify the target role
 */
const canModifyMember = (actorRole: Role, targetRole: Role): boolean => {
  const hierarchy: Record<Role, number> = { owner: 3, admin: 2, member: 1 };
  return hierarchy[actorRole] > hierarchy[targetRole];
};

/**
 * Derive management permissions from a user's role
 */
const getPermissions = (role: Role | undefined) => ({
  canInvite: role === "owner" || role === "admin",
  canChangeRoles: role === "owner" || role === "admin",
  canRemoveMembers: role === "owner" || role === "admin",
});

const Team = () => {
  const inviteRef = useRef<HTMLButtonElement>(null);
  const { orgSlug } = useParams({ strict: false });
  const { auth } = useRouteContext({ strict: false });
  const { organizations } = useOrganization();

  const org = organizations.find((o) => o.slug === orgSlug);
  const organizationId = org?.id;

  const [selectedMember, setSelectedMember] = useState<{
    name: string;
    avatarUrl?: string | null;
    id: string;
  }>();

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isDeleteMemberOpen, setIsDeleteMemberOpen] = useState(false);
  const [isCancelInvitationOpen, setIsCancelInvitationOpen] = useState(false);

  const [selectedInvitation, setSelectedInvitation] = useState<{
    id: string;
    email: string;
  }>();

  // Fetch members from Gatekeeper (IDP is source of truth)
  const { data: membersData } = useQuery({
    ...organizationMembersOptions({
      organizationId: organizationId ?? "",
      accessToken: auth?.accessToken ?? "",
    }),
    enabled: !!organizationId && !!auth?.accessToken,
  });

  const members = membersData?.data ?? [];

  // Find current user's role from Gatekeeper members
  const currentUserMember = members.find(
    (m) => m.user.id === auth?.user?.identityProviderId,
  );
  const currentUserRole = currentUserMember?.role as Role | undefined;
  const { canInvite, canChangeRoles, canRemoveMembers } =
    getPermissions(currentUserRole);

  // Fetch pending invitations (visible to admins+)
  const { data: invitationsData } = useQuery({
    ...organizationInvitationsOptions({
      organizationId: organizationId ?? "",
    }),
    enabled: !!organizationId && canInvite,
  });

  const activeInvitations = invitationsData?.active ?? [];
  const expiredInvitations = invitationsData?.expired ?? [];

  const { mutate: removeMember } = useRemoveMember();
  const { mutate: updateMemberRole } = useUpdateMemberRole();
  const { mutate: cancelInvitation } = useCancelInvitation();
  const { mutate: resendInvitation, isPending: isResending } =
    useResendInvitation();

  if (!organizationId) return null;

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-1 flex h-10 items-center justify-between">
          <h2 className="ml-2 flex items-center gap-2 font-medium text-muted-foreground text-sm lg:ml-0">
            Team Members
          </h2>

          {canInvite && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Invite team member"
              className="mr-2 size-7"
              onClick={() => setIsInviteOpen(true)}
              ref={inviteRef}
            >
              <PlusIcon />
            </Button>
          )}
        </div>

        {members.length ? (
          <div className="flex flex-col divide-y border-y">
            {members.map((member) => {
              const canModifyThisMember =
                currentUserRole &&
                member.role &&
                canModifyMember(currentUserRole, member.role as Role);

              const isSelf = member.user.id === auth?.user?.identityProviderId;

              return (
                <div
                  key={member.id}
                  className="group flex h-10 w-full items-center px-2 hover:bg-accent lg:px-0"
                >
                  <div className="flex w-full items-center">
                    <div className="flex size-10 items-center justify-center">
                      <AvatarRoot
                        size="xs"
                        className="size-6 rounded-full border bg-background font-medium text-sm uppercase shadow"
                      >
                        <AvatarImage
                          src={member.user.image ?? undefined}
                          alt={member.user.name}
                        />
                        <AvatarFallback>
                          {member.user.name?.charAt(0)}
                        </AvatarFallback>
                      </AvatarRoot>
                    </div>

                    <span className="px-3 text-xs md:text-sm">
                      {member.user.name}
                    </span>

                    <MenuRoot
                      positioning={{
                        strategy: "fixed",
                        placement: "bottom-start",
                      }}
                      onSelect={({ value }) =>
                        updateMemberRole({
                          organizationId: organizationId ?? "",
                          memberId: member.id,
                          role: value as "owner" | "admin" | "member",
                        })
                      }
                    >
                      <MenuTrigger
                        disabled={isSelf || !canModifyThisMember}
                        asChild
                      >
                        <Badge variant="outline">
                          <p className="first-letter:uppercase">
                            {member.role}
                          </p>
                          <ChevronDownIcon
                            className={cn(
                              "hidden",
                              canChangeRoles &&
                                !isSelf &&
                                canModifyThisMember &&
                                "inline-flex",
                            )}
                          />
                        </Badge>
                      </MenuTrigger>

                      <MenuPositioner>
                        <MenuContent>
                          <MenuItem
                            value="admin"
                            disabled={member.role === "admin"}
                          >
                            Admin
                            {member.role === "admin" && (
                              <CheckIcon className="text-green-500" />
                            )}
                          </MenuItem>
                          <MenuItem
                            value="member"
                            disabled={member.role === "member"}
                            className="justify-between"
                          >
                            Member
                            {member.role === "member" && (
                              <CheckIcon className="text-green-500" />
                            )}
                          </MenuItem>
                        </MenuContent>
                      </MenuPositioner>
                    </MenuRoot>

                    <div className="mr-2 ml-auto flex gap-1">
                      <MenuRoot
                        positioning={{
                          strategy: "fixed",
                          placement: "left",
                        }}
                      >
                        <MenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "hidden size-7 text-muted-foreground",
                              canRemoveMembers &&
                                canModifyThisMember &&
                                "inline-flex",
                            )}
                            aria-label="More team member options"
                          >
                            <MoreHorizontalIcon />
                          </Button>
                        </MenuTrigger>

                        <MenuPositioner>
                          <MenuContent className="focus-within:outline-none">
                            <MenuItem
                              value="delete"
                              className="text-destructive"
                              onClick={() => {
                                setIsDeleteMemberOpen(true);
                                setSelectedMember({
                                  name: member.user.name,
                                  avatarUrl: member.user.image,
                                  id: member.id,
                                });
                              }}
                              disabled={isSelf}
                            >
                              <Trash2Icon />
                              <span>Delete</span>
                            </MenuItem>
                          </MenuContent>
                        </MenuPositioner>
                      </MenuRoot>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="ml-2 flex items-center text-muted-foreground text-sm lg:ml-0">
            No team members
          </div>
        )}
      </div>

      {canInvite && (
        <div className="mt-8 flex flex-col">
          <div className="mb-1 flex h-10 items-center">
            <h2 className="ml-2 font-medium text-muted-foreground text-sm lg:ml-0">
              Pending Invitations
            </h2>
          </div>

          {activeInvitations.length || expiredInvitations.length ? (
            <div className="flex flex-col divide-y border-y">
              {[...activeInvitations, ...expiredInvitations].map(
                (invitation) => {
                  const timeInfo = getInviteTimeInfo(invitation);

                  return (
                    <div
                      key={invitation.id}
                      className={cn(
                        "group flex h-10 w-full items-center px-2 hover:bg-accent lg:px-0",
                        timeInfo.isExpired && "opacity-60 hover:opacity-100",
                      )}
                    >
                      <div className="flex w-full items-center">
                        <div className="flex size-10 items-center justify-center">
                          <AvatarRoot
                            size="xs"
                            className="size-6 rounded-full border bg-background font-medium text-sm uppercase shadow"
                          >
                            <AvatarFallback>
                              {invitation.email.charAt(0)}
                            </AvatarFallback>
                          </AvatarRoot>
                        </div>

                        <span className="px-3 text-xs md:text-sm">
                          {invitation.email}
                        </span>

                        {timeInfo.isExpired ? (
                          <Badge
                            variant="outline"
                            className="border-destructive/40 text-destructive"
                          >
                            Expired
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            <p className="first-letter:uppercase">
                              {invitation.role ?? "member"}
                            </p>
                          </Badge>
                        )}

                        <span className="ml-2 hidden text-muted-foreground text-xs group-hover:inline">
                          {timeInfo.expiresLabel}
                        </span>

                        <div className="mr-2 ml-auto flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 text-muted-foreground hover:text-primary"
                            aria-label={`Resend invitation to ${invitation.email}`}
                            disabled={isResending}
                            onClick={() =>
                              resendInvitation(
                                {
                                  organizationId: organizationId ?? "",
                                  email: invitation.email,
                                  role:
                                    (invitation.role as
                                      | "admin"
                                      | "member"
                                      | null) ?? "member",
                                },
                                {
                                  onSuccess: () =>
                                    toast.success(
                                      `Invitation resent to ${invitation.email}`,
                                    ),
                                  onError: (error) =>
                                    toast.error(
                                      error instanceof Error
                                        ? error.message
                                        : "Failed to resend invitation",
                                    ),
                                },
                              )
                            }
                          >
                            <RefreshCwIcon className="size-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 text-muted-foreground hover:text-destructive"
                            aria-label={`Revoke invitation for ${invitation.email}`}
                            onClick={() => {
                              setSelectedInvitation({
                                id: invitation.id,
                                email: invitation.email,
                              });
                              setIsCancelInvitationOpen(true);
                            }}
                          >
                            <XIcon className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          ) : (
            <div className="ml-2 flex items-center text-muted-foreground text-sm lg:ml-0">
              No pending invitations
            </div>
          )}
        </div>
      )}

      {/* Delete member confirmation dialog */}
      <DialogRoot
        open={isDeleteMemberOpen}
        onOpenChange={(details: { open: boolean }) =>
          setIsDeleteMemberOpen(details.open)
        }
      >
        <DialogBackdrop />
        <DialogContent>
          <DialogCloseTrigger />
          <DialogTitle>Remove Team Member</DialogTitle>
          <DialogDescription>
            This will remove{" "}
            <span className="font-medium">{selectedMember?.name}</span> from the
            organization. This action cannot be undone.
          </DialogDescription>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteMemberOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (!selectedMember) return;

                removeMember(
                  {
                    organizationId: organizationId ?? "",
                    memberId: selectedMember.id,
                  },
                  {
                    onSuccess: () => {
                      toast.success(
                        `${selectedMember.name} removed from the organization`,
                      );
                      setIsDeleteMemberOpen(false);
                    },
                    onError: (error) => {
                      toast.error(
                        error instanceof Error
                          ? error.message
                          : "Failed to remove member",
                      );
                    },
                  },
                );
              }}
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </DialogRoot>

      {/* Cancel invitation confirmation dialog */}
      <DialogRoot
        open={isCancelInvitationOpen}
        onOpenChange={(details: { open: boolean }) =>
          setIsCancelInvitationOpen(details.open)
        }
      >
        <DialogBackdrop />
        <DialogContent>
          <DialogCloseTrigger />
          <DialogTitle>Revoke Invitation</DialogTitle>
          <DialogDescription>
            This will revoke the invitation sent to{" "}
            <span className="font-medium">{selectedInvitation?.email}</span>.
            You can always send a new invitation later.
          </DialogDescription>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCancelInvitationOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (!selectedInvitation) return;

                cancelInvitation(
                  {
                    invitationId: selectedInvitation.id,
                    organizationId: organizationId ?? "",
                  },
                  {
                    onSuccess: () => {
                      toast.success(
                        `Invitation to ${selectedInvitation.email} revoked`,
                      );
                      setIsCancelInvitationOpen(false);
                    },
                    onError: (error) => {
                      toast.error(
                        error instanceof Error
                          ? error.message
                          : "Failed to revoke invitation",
                      );
                    },
                  },
                );
              }}
            >
              Revoke
            </Button>
          </div>
        </DialogContent>
      </DialogRoot>

      <InviteMemberDialog
        isOpen={isInviteOpen}
        onOpenChange={setIsInviteOpen}
        triggerRef={inviteRef}
      />
    </>
  );
};

export default Team;
