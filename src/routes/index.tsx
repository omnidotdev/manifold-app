import { Button } from "@omnidotdev/thornberry/button";
import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import {
  Box,
  Container,
  FileJson,
  History,
  Layers,
  Network,
  Search,
  Shield,
} from "lucide-react";

import authClient from "@/lib/auth/authClient";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context: { auth }, preload }) => {
    // skip during preload so hovering this link does not navigate authed users
    if (!preload && auth) throw redirect({ to: "/schemas" });
  },
  head: () => ({
    meta: createMetaTags({
      title: "Manifold - Schema Registry",
      description:
        "Centralized schema management for OpenAPI, GraphQL, JSON Schema, WASM, and Container artifacts.",
    }),
  }),
  component: HomePage,
});

/**
 * Home page / Landing.
 */
function HomePage() {
  // This page only renders for signed-out visitors (authed users are
  // redirected to /schemas in beforeLoad), and /schemas is auth-gated, so the
  // primary CTA signs in and lands on /schemas afterward rather than linking
  // straight to the gated route (which would just bounce back here)
  const { mutateAsync: signIn, isPending: isSignInPending } = useMutation({
    mutationFn: async () =>
      await authClient.signIn.social({
        provider: "omni",
        callbackURL: "/schemas",
        disableRedirect: false,
      }),
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-bold text-4xl tracking-tight sm:text-6xl">
            One Place for All Your
            <span className="text-primary"> API Schemas</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Manage, version, and share OpenAPI specs, GraphQL schemas, JSON
            Schema definitions, WASM modules, and container manifests from a
            single registry.
          </p>
        </div>

        <div className="flex gap-4">
          <Button size="lg" onClick={() => signIn()} disabled={isSignInPending}>
            View Schemas
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/pricing">Get Started</Link>
          </Button>
        </div>

        {/* Schema Type Icons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-8">
          <SchemaTypeIcon
            icon={<FileJson className="h-8 w-8" />}
            label="OpenAPI"
          />
          <SchemaTypeIcon
            icon={<Network className="h-8 w-8" />}
            label="GraphQL"
          />
          <SchemaTypeIcon
            icon={<Box className="h-8 w-8" />}
            label="JSON Schema"
          />
          <SchemaTypeIcon icon={<Layers className="h-8 w-8" />} label="WASM" />
          <SchemaTypeIcon
            icon={<Container className="h-8 w-8" />}
            label="Container"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-bold text-3xl">
            Enterprise-ready schema management
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Search className="h-8 w-8" />}
              title="Schema Discovery"
              description="Search and browse all your API schemas in one centralized location."
            />
            <FeatureCard
              icon={<History className="h-8 w-8" />}
              title="Version History"
              description="Track changes over time with full version history and diff views."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Validation"
              description="Automatic schema validation ensures your APIs are always correct."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function SchemaTypeIcon({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-muted-foreground">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-2 font-semibold text-xl">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
