import { describe, expect, test } from "bun:test";

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import WorkspaceSwitcher from "@/components/workspaces/WorkspaceSwitcher";
import { WorkspaceProvider } from "@/lib/context";

import type { Workspace } from "@/lib/context/workspace.context";

const workspaces: Workspace[] = [
  {
    id: "org-personal",
    slug: "ada",
    name: "Ada",
    type: "personal",
    roles: ["owner"],
    teams: [],
  },
  {
    id: "org-team",
    slug: "acme",
    name: "Acme",
    type: "team",
    roles: ["member"],
    teams: [],
  },
];

const renderSwitcher = (list: Workspace[]) => {
  cleanup();
  localStorage.clear();

  return render(
    <WorkspaceProvider workspaces={list}>
      <WorkspaceSwitcher />
    </WorkspaceProvider>,
  );
};

describe("WorkspaceSwitcher", () => {
  test("renders nothing without workspaces", () => {
    const { container } = renderSwitcher([]);

    expect(container.innerHTML).toBe("");
  });

  test("shows the active workspace and marks the personal one", async () => {
    renderSwitcher(workspaces);

    const trigger = screen.getByRole("button", {
      name: "Ada, switch workspace",
    });
    fireEvent.click(trigger);

    expect(await screen.findByText("Personal")).toBeDefined();
  });

  test("selecting a workspace makes it active", async () => {
    renderSwitcher(workspaces);

    fireEvent.click(
      screen.getByRole("button", { name: "Ada, switch workspace" }),
    );
    // The menu selects the highlighted entry, so highlight it before clicking
    const item = await screen.findByRole("menuitem", { name: /Acme/ });
    await act(async () => {
      fireEvent.pointerMove(item, { pointerType: "mouse" });
    });
    await act(async () => {
      fireEvent.click(item);
    });

    expect(
      await screen.findByRole("button", { name: "Acme, switch workspace" }),
    ).toBeDefined();
    expect(localStorage.getItem("activeOrgId")).toBe("org-team");
  });
});
