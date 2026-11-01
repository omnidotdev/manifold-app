import { Button } from "@omnidotdev/thornberry/button";
import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  Container,
  FileJson,
  GitBranch,
  KeyRound,
  Layers,
  Lock,
  Package,
  Search,
  Server,
  ShieldCheck,
} from "lucide-react";

import authClient from "@/lib/auth/authClient";
import createMetaTags from "@/lib/util/createMetaTags";

import type { LucideIcon } from "lucide-react";

const DOCS_URL = "https://docs.omni.dev/products/manifold";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context: { auth }, preload }) => {
    // skip during preload so hovering this link does not navigate authed users
    if (!preload && auth) throw redirect({ to: "/registry" });
  },
  head: () => ({
    meta: createMetaTags({
      title: "Manifold - Universal Artifact Registry",
      description:
        "One registry for every build artifact: containers, Cargo crates, npm packages, schemas, and WASM. Versioned, private by default, and self-hostable.",
    }),
  }),
  component: HomePage,
});

/** Artifact types Manifold hosts, with the real way you interact with each. */
const ARTIFACTS: Array<{
  icon: LucideIcon;
  name: string;
  blurb: string;
  snippet: string;
}> = [
  {
    icon: Container,
    name: "Containers",
    blurb: "OCI images and artifacts over the standard Distribution API.",
    snippet: "docker push manifold.omni.dev/acme/api:1.4.0",
  },
  {
    icon: Boxes,
    name: "Cargo crates",
    blurb: "A private crate registry that speaks cargo publish and install.",
    snippet: "cargo publish --registry manifold",
  },
  {
    icon: Package,
    name: "npm packages",
    blurb: "Scoped packages, private by default, installed with your token.",
    snippet: "npm publish   # @acme/sdk",
  },
  {
    icon: FileJson,
    name: "Schemas",
    blurb: "Version OpenAPI, GraphQL, and JSON Schema with full history.",
    snippet: "Create & version in the dashboard or API",
  },
  {
    icon: Layers,
    name: "WASM modules",
    blurb: "Distribute WASM components alongside the rest of your stack.",
    snippet: "docker push manifold.omni.dev/acme/plugin.wasm:0.2.0",
  },
];

const FEATURES: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: GitBranch,
    title: "Versioned by default",
    description:
      "Immutable versions and full history for every artifact, so rollbacks and audits are trivial.",
  },
  {
    icon: Lock,
    title: "Private by default",
    description:
      "New repositories are private. Flip to public when you want anonymous pulls.",
  },
  {
    icon: ShieldCheck,
    title: "Per-workspace isolation",
    description:
      "Every artifact is scoped to your workspace. One org can never see another's private repos.",
  },
  {
    icon: KeyRound,
    title: "Scoped access tokens",
    description:
      "Mint read, write, or admin tokens per namespace for CI and local development.",
  },
  {
    icon: Search,
    title: "One place to find anything",
    description:
      "Search and browse containers, crates, packages, and schemas from a single registry.",
  },
  {
    icon: Server,
    title: "Self-hostable",
    description:
      "Run the whole registry yourself with docker compose, or let us host it. Apache-2.0.",
  },
];

function HomePage() {
  // This page only renders for signed-out visitors (authed users are
  // redirected to /registry in beforeLoad), so the primary CTA signs in and
  // lands on the registry afterward rather than linking straight to a gated
  // route. /registry is the real data surface; /schemas is a mock placeholder
  const { mutateAsync: signIn, isPending: isSignInPending } = useMutation({
    mutationFn: async () =>
      await authClient.signIn.social({
        provider: "omni",
        callbackURL: "/registry",
        disableRedirect: false,
      }),
  });

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 font-medium text-muted-foreground text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Universal artifact registry
          </span>

          <h1 className="max-w-3xl text-balance font-bold text-4xl tracking-tight sm:text-6xl">
            Every build artifact.
            <span className="text-primary"> One registry.</span>
          </h1>

          <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
            Manifold stores, versions, and distributes containers, Cargo crates,
            npm packages, schemas, and WASM modules, through the tools you
            already use. Private by default, isolated per workspace, and
            self-hostable.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => signIn()}
              disabled={isSignInPending}
            >
              Get started free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={DOCS_URL}>Read the docs</a>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link to="/pricing">View pricing</Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-muted-foreground text-sm">
            {ARTIFACTS.map(({ icon: Icon, name }) => (
              <span key={name} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* One registry for everything you ship */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-bold text-3xl tracking-tight">
              One registry for everything you ship
            </h2>
            <p className="mt-3 text-muted-foreground">
              Push with standard tooling. No new CLI to learn, no separate
              registry per artifact type.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ARTIFACTS.map(({ icon: Icon, name, blurb, snippet }) => (
              <div
                key={name}
                className="flex flex-col rounded-xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="mt-1 flex-1 text-muted-foreground text-sm">
                  {blurb}
                </p>
                <code className="mt-4 block overflow-x-auto whitespace-nowrap rounded-md bg-muted px-3 py-2 font-mono text-muted-foreground text-xs">
                  {snippet}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-bold text-3xl tracking-tight">
              Built for teams that ship a lot
            </h2>
            <p className="mt-3 text-muted-foreground">
              The guarantees you expect from a registry, across every artifact
              type.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-6 py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2 className="text-balance font-bold text-3xl tracking-tight sm:text-4xl">
            Start pushing artifacts in minutes
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Free to start: 3 private repos, 500 MB storage, and 2 GB of transfer
            a month. Upgrade or self-host whenever you are ready.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => signIn()}
              disabled={isSignInPending}
            >
              Get started free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={DOCS_URL}>Read the docs</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
