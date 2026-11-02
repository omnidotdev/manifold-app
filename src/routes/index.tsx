import { Button } from "@omnidotdev/thornberry/button";
import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  Container,
  FileJson,
  GitBranch,
  Layers,
  Lock,
  Package,
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

const CHIPS: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Container, label: "Containers" },
  { icon: Boxes, label: "Cargo" },
  { icon: Package, label: "npm" },
  { icon: FileJson, label: "Schemas" },
  { icon: Layers, label: "WASM" },
];

const BENTO: Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  wide?: boolean;
}> = [
  {
    icon: Boxes,
    title: "Containers, crates, packages, schemas & WASM",
    body: "OCI over the standard Distribution API, a real Cargo registry, scoped npm, versioned schemas, and WASM modules, side by side in one place.",
    wide: true,
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "New repositories are private; flip to public for anonymous pulls.",
  },
  {
    icon: ShieldCheck,
    title: "Per-workspace isolation",
    body: "Every artifact is scoped to your workspace. Full stop.",
  },
  {
    icon: GitBranch,
    title: "Versioned history",
    body: "Immutable versions, full history, instant rollback.",
  },
  {
    icon: Server,
    title: "Self-host or let us run it",
    body: "Bring it up with docker compose, or use the hosted cloud. Apache-2.0, no lock-in.",
    wide: true,
  },
];

function HomePage() {
  // Only renders for signed-out visitors (authed users redirect to /registry);
  // the primary CTA signs in and lands there
  const { mutateAsync: signIn, isPending } = useMutation({
    mutationFn: async () =>
      await authClient.signIn.social({
        provider: "omni",
        callbackURL: "/registry",
        disableRedirect: false,
      }),
  });

  return (
    <div className="relative overflow-hidden bg-[#07080c] text-[#eef1f8]">
      {/* atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(circle at 50% 0%, #000 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 0%, #000 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "-260px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1100px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.26), rgba(59,130,246,0.05) 60%, transparent 75%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#262c3d] bg-[#3b82f6]/10 px-3 py-1.5 font-semibold text-[#60a5fa] text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
              Universal artifact registry
            </span>

            <h1 className="mt-5 font-extrabold text-5xl leading-[1.03] tracking-tight sm:text-6xl">
              Every build artifact.
              <br />
              <span className="bg-gradient-to-r from-[#60a5fa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
                One registry.
              </span>
            </h1>

            <p className="mt-6 max-w-[34ch] text-[#9aa3b8] text-lg">
              Containers, Cargo crates, npm packages, schemas, and WASM,
              versioned, private by default, and pushed with the tools you
              already use.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => signIn()}
                disabled={isPending}
                className="shadow-[0_8px_28px_-8px_rgba(59,130,246,0.8)]"
              >
                Start free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                asChild
              >
                <a href={DOCS_URL}>Read the docs</a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[#9aa3b8] text-sm">
              {CHIPS.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#60a5fa]" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* terminal mock */}
          <div className="overflow-hidden rounded-2xl border border-[#262c3d] bg-gradient-to-b from-[#131726] to-[#0f121b] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2 border-[#1c2130] border-b px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#f4645f]" />
              <span className="h-3 w-3 rounded-full bg-[#f5be4f]" />
              <span className="h-3 w-3 rounded-full bg-[#4fc758]" />
              <span className="ml-2 font-mono text-[#697086] text-xs">
                ~/acme/api
              </span>
            </div>
            <div className="space-y-1 p-5 font-mono text-[13.5px] leading-[1.9]">
              <div>
                <span className="text-[#697086]">$</span> docker push{" "}
                <span className="text-[#38bdf8]">
                  manifold.omni.dev/acme/api:1.4.0
                </span>
              </div>
              <div className="text-[#697086]">
                The push refers to repository [manifold.omni.dev/acme/api]
              </div>
              <div className="text-[#4fc758]">
                1.4.0: digest: sha256:9f2a…e1 size: 2847
              </div>
              <div className="h-2.5" />
              <div>
                <span className="text-[#697086]">$</span> cargo publish{" "}
                <span className="text-[#60a5fa]">--registry manifold</span>
              </div>
              <div className="text-[#4fc758]">
                {"   "}Uploading engine v1.4.0 (manifold)
              </div>
              <div className="h-2.5" />
              <div>
                <span className="text-[#697086]">$</span> npm publish{" "}
                <span className="text-[#697086]"># @acme/sdk</span>
              </div>
              <div>
                <span className="text-[#4fc758]">+ @acme/sdk@1.4.0</span>{" "}
                <span className="text-[#697086]">(private)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* bento */}
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto mb-11 max-w-[620px] text-center">
          <h2 className="font-extrabold text-4xl tracking-tight">
            One registry for everything you ship
          </h2>
          <p className="mt-3 text-[#9aa3b8]">
            Standard tooling, one auth model, every artifact type. No new CLI to
            learn.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {BENTO.map(({ icon: Icon, title, body, wide }) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-2xl border border-[#1c2130] bg-[#0f121b] p-6 transition-all hover:-translate-y-0.5 hover:border-[#262c3d] ${
                wide ? "md:col-span-2" : ""
              }`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px 120px at 20% 0%, rgba(59,130,246,0.1), transparent)",
                }}
              />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#3b82f6]/12 text-[#60a5fa]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="mt-1.5 text-[#9aa3b8] text-sm">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div
          className="rounded-2xl border border-[#262c3d] px-6 py-14 text-center"
          style={{
            background:
              "radial-gradient(600px 200px at 50% 0%, rgba(59,130,246,0.14), #0f121b)",
          }}
        >
          <h2 className="font-extrabold text-4xl tracking-tight">
            Start pushing in minutes
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[#9aa3b8]">
            Free to start, no credit card. Upgrade or self-host whenever you are
            ready.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => signIn()} disabled={isPending}>
              Get started free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              asChild
            >
              <Link to="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
