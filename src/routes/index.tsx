import { Button } from "@omnidotdev/thornberry/button";
import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  GitBranch,
  Lock,
  Server,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

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

type Line = { c?: "d" | "c" | "p" | "g"; t: string };
const CLS: Record<string, string> = {
  d: "text-[#636b80]",
  c: "text-[#38bdf8]",
  p: "text-[#6aa6ff]",
  g: "text-[#34d399]",
};

const PROTOCOLS: Array<{ key: string; label: string; lines: Line[] }> = [
  {
    key: "oci",
    label: "OCI",
    lines: [
      { c: "d", t: "$ " },
      { t: "docker push " },
      { c: "c", t: "manifold.omni.dev/acme/api:1.4.0\n" },
      {
        c: "d",
        t: "The push refers to repository [manifold.omni.dev/acme/api]\n",
      },
      { c: "g", t: "1.4.0: digest: sha256:9f2a…e1 size: 2847" },
    ],
  },
  {
    key: "cargo",
    label: "Cargo",
    lines: [
      { c: "d", t: "$ " },
      { t: "cargo publish " },
      { c: "p", t: "--registry manifold\n" },
      { c: "g", t: "   Packaging engine v1.4.0\n" },
      { c: "g", t: "   Uploading engine v1.4.0 (manifold)" },
    ],
  },
  {
    key: "npm",
    label: "npm",
    lines: [
      { c: "d", t: "$ " },
      { t: "npm publish " },
      { c: "d", t: "# @acme/sdk\n" },
      { c: "g", t: "npm notice publishing to manifold\n" },
      { c: "g", t: "+ @acme/sdk@1.4.0 " },
      { c: "d", t: "(private)" },
    ],
  },
  {
    key: "schema",
    label: "Schema",
    lines: [
      { c: "d", t: "$ " },
      { t: "curl -XPOST " },
      { c: "c", t: "api.manifold.omni.dev/graphql\n" },
      { c: "d", t: "# createSchema(openapi) …\n" },
      { c: "g", t: '{ "schema": { "name": "orders", "version": "1.4.0" } }' },
    ],
  },
];

const FEATURES: Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  span: string;
  feat?: boolean;
}> = [
  {
    icon: Boxes,
    title: "Five protocols, one home",
    body: "OCI, Cargo, npm, schemas, and WASM, side by side, each spoken natively.",
    span: "md:col-span-3",
    feat: true,
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "New repos are private; make them public for anonymous pulls.",
    span: "md:col-span-3",
  },
  {
    icon: ShieldCheck,
    title: "Workspace isolation",
    body: "Scoped to your workspace, always.",
    span: "md:col-span-2",
  },
  {
    icon: GitBranch,
    title: "Versioned history",
    body: "Immutable versions, instant rollback.",
    span: "md:col-span-2",
  },
  {
    icon: Server,
    title: "Self-host or cloud",
    body: "docker compose up, or let us run it.",
    span: "md:col-span-2",
  },
];

const TRUST = [
  "5 protocols",
  "Private by default",
  "Self-host or cloud",
  "Apache-2.0",
];

function HomePage() {
  // Only renders for signed-out visitors (authed users redirect to /registry)
  const { mutateAsync: signIn, isPending } = useMutation({
    mutationFn: async () =>
      await authClient.signIn.social({
        provider: "omni",
        callbackURL: "/registry",
        disableRedirect: false,
      }),
  });
  const [proto, setProto] = useState("oci");
  const active = PROTOCOLS.find((p) => p.key === proto) ?? PROTOCOLS[0];

  return (
    <div className="dark relative -mt-[66px] overflow-hidden bg-[#060709] text-[#f2f4fa]">
      {/* atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "radial-gradient(circle at 50% -5%, #000, transparent 68%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% -5%, #000, transparent 68%)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "-320px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1200px",
            height: "760px",
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.3), rgba(139,92,246,0.08) 55%, transparent 74%)",
            filter: "blur(16px)",
          }}
        />
      </div>

      {/* hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-28 pb-16">
        <div className="grid items-center gap-[52px] lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="font-extrabold text-6xl leading-[0.98] tracking-[-0.045em] sm:text-7xl">
              Ship anything.
              <br />
              <span className="bg-gradient-to-r from-[#6aa6ff] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
                One registry.
              </span>
            </h1>
            <p className="mt-6 max-w-[40ch] text-[#99a1b5] text-xl">
              Containers, Cargo crates, npm packages, schemas, and WASM,
              versioned, private by default, pushed with the tools you already
              use.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => signIn()} disabled={isPending}>
                Start free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={DOCS_URL}>Read the docs</a>
              </Button>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[#636b80] text-sm">
              {TRUST.map((t, i) => (
                <span key={t} className="inline-flex items-center gap-2">
                  {i > 0 && (
                    <span className="h-1 w-1 rounded-full bg-[#272c3a]" />
                  )}
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* protocol switcher + terminal */}
          <div>
            <div className="mb-3.5 inline-flex gap-0.5 rounded-xl border border-[#1b1f2b] bg-[#0e1016] p-1">
              {PROTOCOLS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setProto(p.key)}
                  className={`rounded-lg px-3 py-2 font-semibold text-xs transition-colors ${
                    p.key === proto
                      ? "bg-[#191d29] text-white shadow-[inset_0_0_0_1px_#272c3a]"
                      : "text-[#99a1b5] hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#272c3a] bg-gradient-to-b from-[#13161f] to-[#0e1016] shadow-[0_44px_100px_-46px_#000]">
              <div className="flex items-center gap-2 border-[#1b1f2b] border-b px-4 py-3">
                <span className="h-[11px] w-[11px] rounded-full bg-[#f4645f]" />
                <span className="h-[11px] w-[11px] rounded-full bg-[#f5be4f]" />
                <span className="h-[11px] w-[11px] rounded-full bg-[#4fc758]" />
                <span className="ml-2 font-mono text-[#636b80] text-xs">
                  ~/acme
                </span>
              </div>
              <pre className="min-h-[164px] whitespace-pre-wrap p-5 font-mono text-[13.5px] leading-[1.95]">
                {active.lines.map((l, i) => (
                  <span
                    key={`${active.key}-${i}`}
                    className={l.c ? CLS[l.c] : "text-[#f2f4fa]"}
                  >
                    {l.t}
                  </span>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* bento */}
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto mb-11 max-w-[640px] text-center">
          <h2 className="font-extrabold text-4xl tracking-[-0.035em]">
            One registry for everything you ship
          </h2>
          <p className="mt-3 text-[#99a1b5] text-lg">
            Standard tooling, one auth model, every artifact type. No new CLI to
            learn.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-6">
          {FEATURES.map(({ icon: Icon, title, body, span, feat }) => (
            <div
              key={title}
              className={`rounded-[18px] border border-[#1b1f2b] p-6 transition-all hover:-translate-y-0.5 hover:border-[#272c3a] ${span} ${
                feat
                  ? "bg-gradient-to-br from-[#3b82f6]/10 to-[#0e1016]"
                  : "bg-[#0e1016]"
              }`}
            >
              <div className="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#3b82f6]/12 text-[#6aa6ff]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg tracking-tight">{title}</h3>
              <p className="mt-2 text-[#99a1b5] text-sm">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div
          className="rounded-[22px] border border-[#272c3a] px-6 py-14 text-center"
          style={{
            background:
              "radial-gradient(640px 220px at 50% 0%, rgba(59,130,246,0.16), #0e1016)",
          }}
        >
          <h2 className="font-extrabold text-4xl tracking-[-0.035em]">
            Start pushing in minutes
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[#99a1b5]">
            Free to start, no credit card. Upgrade or self-host whenever you are
            ready.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => signIn()} disabled={isPending}>
              Get started free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
