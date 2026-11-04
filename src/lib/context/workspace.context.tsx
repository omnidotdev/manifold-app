import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

/**
 * Workspace from IDP JWT claims.
 */
export interface Workspace {
  id: string;
  slug: string;
  /** Human-readable workspace name (falls back to the slug) */
  name: string;
  logo?: string | null;
  /** Discriminator: 'personal' (auto-created, immutable) or 'team' (collaborative) */
  type: "personal" | "team";
  roles: string[];
  teams: { id: string; name: string }[];
}

interface WorkspaceContextValue {
  /** All workspaces the user is a member of */
  workspaces: Workspace[];
  /** Currently active workspace */
  activeWorkspace: Workspace | null;
  /** Set the active workspace by ID */
  setActiveWorkspace: (orgId: string) => void;
  /** User's personal workspace (always exists) */
  personalWorkspace: Workspace | null;
  /** Check if user has a specific role in the active org */
  hasRole: (role: string) => boolean;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

interface WorkspaceProviderProps {
  children: ReactNode;
  workspaces: Workspace[];
  initialOrgId?: string;
}

/**
 * Provider for workspace context.
 * Parses workspace claims from IDP session.
 */
export function WorkspaceProvider({
  children,
  workspaces,
  initialOrgId,
}: WorkspaceProviderProps) {
  const [activeOrgId, setActiveOrgId] = useState<string | null>(
    initialOrgId ?? workspaces[0]?.id ?? null,
  );

  // Restore the last-selected workspace from this browser after hydration.
  // Kept out of the initial state (which must be deterministic across SSR and
  // client to avoid a hydration mismatch): the server has no localStorage, so
  // both render workspaces[0] first, then the client adjusts to the stored
  // selection. Only honored when the user is still a member of that workspace,
  // so a stale/removed org cannot stick. An explicit initialOrgId always wins.
  useEffect(() => {
    if (initialOrgId) return;
    try {
      const stored = localStorage.getItem("activeOrgId");
      if (
        stored &&
        stored !== activeOrgId &&
        workspaces.some((o) => o.id === stored)
      ) {
        setActiveOrgId(stored);
      }
    } catch {
      // localStorage unavailable (private mode, blocked): fall back silently
    }
  }, [initialOrgId, workspaces, activeOrgId]);

  const activeWorkspace = workspaces.find((o) => o.id === activeOrgId) ?? null;
  const personalWorkspace =
    workspaces.find((o) => o.type === "personal") ?? null;

  const setActiveWorkspace = useCallback((orgId: string) => {
    setActiveOrgId(orgId);
    // Optionally persist to localStorage/cookie
    if (typeof window !== "undefined") {
      localStorage.setItem("activeOrgId", orgId);
    }
  }, []);

  const hasRole = useCallback(
    (role: string) => {
      return activeWorkspace?.roles.includes(role) ?? false;
    },
    [activeWorkspace],
  );

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        activeWorkspace,
        setActiveWorkspace,
        personalWorkspace,
        hasRole,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

/**
 * Hook to access workspace context.
 * Must be used within WorkspaceProvider.
 */
export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}

/**
 * Parse workspace claims from IDP ID token.
 * Claims are namespaced under https://manifold.omni.dev/@omni/claims/organizations
 */
export function parseWorkspaceClaims(
  idToken: Record<string, unknown>,
): Workspace[] {
  const claimsKey = "https://manifold.omni.dev/@omni/claims/organizations";
  const claims = idToken[claimsKey];

  if (!Array.isArray(claims)) {
    return [];
  }

  return claims.map((org) => ({
    id: org.id,
    slug: org.slug,
    name: org.name ?? org.slug,
    logo: org.logo ?? null,
    type: org.type ?? "team",
    roles: org.roles ?? [],
    teams: org.teams ?? [],
  }));
}
