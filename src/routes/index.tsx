import { Button } from "@omnidotdev/thornberry/button";
import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import ManifoldMark from "@/components/brand/ManifoldMark";
import authClient from "@/lib/auth/authClient";
import createMetaTags from "@/lib/util/createMetaTags";

const DOCS_URL = "https://docs.omni.dev/products/manifold";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context: { auth, organizations }, preload }) => {
    // skip during preload so hovering this link does not navigate authed users
    if (!preload && auth) {
      // Land on the default workspace's registry (personal workspace, else the
      // first). The workspace lives in the URL per the fleet standard.
      const def =
        organizations.find((o) => o.type === "personal") ?? organizations[0];
      if (def?.slug) {
        throw redirect({
          to: "/@{$workspaceSlug}/~/registry",
          params: { workspaceSlug: def.slug },
        });
      }
    }
  },
  head: () => ({
    meta: createMetaTags({
      title: "Manifold - Universal Artifact Registry",
      description:
        "The hub where your containers, Cargo crates, npm packages, schemas, and WASM live together. Versioned, private by default, and self-hostable.",
    }),
  }),
  component: HomePage,
});

/** Shared stroke props for the original, non-brand category marks. */
const stroke = {
  fill: "none" as const,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Original category marks (deliberately not brand logos). */
const MARK = {
  containers: (
    <>
      <rect x="3.5" y="6.5" width="17" height="11" rx="1.5" />
      <path d="M8 6.5v11M12 6.5v11M16 6.5v11" />
    </>
  ),
  cargo: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M4.6 4.6 19.4 19.4M19.4 4.6 4.6 19.4" />
    </>
  ),
  packages: (
    <>
      <path d="M12 3 20 7.2v9.6L12 21 4 16.8V7.2Z" />
      <path d="M4 7.2 12 11.6l8-4.4M12 11.6V21" />
    </>
  ),
  schemas: (
    <>
      <path d="M10 4c-2 0-2.5 1-2.5 2.5V9c0 1.5-1.5 2-2.5 2 1 0 2.5.5 2.5 2v2.5C7.5 19 8 20 10 20" />
      <path d="M14 4c2 0 2.5 1 2.5 2.5V9c0 1.5 1.5 2 2.5 2-1 0-2.5.5-2.5 2v2.5C16.5 19 16 20 14 20" />
    </>
  ),
  wasm: (
    <>
      <path d="M12 2.5 20 7v10l-8 4.5L4 17V7Z" />
      <path d="M8 9.3 12 11.6l4-2.3M12 11.6v4.4" />
    </>
  ),
};

type Kind = keyof typeof MARK;

const NODES: Array<{
  kind: Kind;
  label: string;
  color: string;
  x: number;
  y: number;
}> = [
  { kind: "containers", label: "Containers", color: "#6aa6ff", x: 200, y: 72 },
  { kind: "cargo", label: "Cargo", color: "#fb923c", x: 315, y: 158 },
  { kind: "packages", label: "Packages", color: "#f87171", x: 270, y: 298 },
  { kind: "schemas", label: "Schemas", color: "#a78bfa", x: 130, y: 298 },
  { kind: "wasm", label: "WASM", color: "#34d399", x: 85, y: 158 },
];

const FLOWS: Array<{
  kind: Kind;
  name: string;
  cmd: string;
  color: string;
  tint: string;
}> = [
  {
    kind: "containers",
    name: "Containers",
    cmd: "docker push",
    color: "#6aa6ff",
    tint: "rgba(106,166,255,.14)",
  },
  {
    kind: "cargo",
    name: "Cargo crates",
    cmd: "cargo publish",
    color: "#fb923c",
    tint: "rgba(251,146,60,.14)",
  },
  {
    kind: "packages",
    name: "npm packages",
    cmd: "npm publish",
    color: "#f87171",
    tint: "rgba(248,113,113,.14)",
  },
  {
    kind: "schemas",
    name: "Schemas",
    cmd: "OpenAPI · GraphQL",
    color: "#a78bfa",
    tint: "rgba(167,139,250,.14)",
  },
  {
    kind: "wasm",
    name: "WASM",
    cmd: "oci artifacts",
    color: "#34d399",
    tint: "rgba(52,211,153,.14)",
  },
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
              "radial-gradient(circle at 50% -2%, #000, transparent 66%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% -2%, #000, transparent 66%)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "-300px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1200px",
            height: "760px",
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.28), rgba(139,92,246,0.08) 55%, transparent 74%)",
            filter: "blur(16px)",
          }}
        />
      </div>

      {/* hero */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-28 pb-14 lg:grid-cols-2">
        <div>
          <h1 className="font-extrabold text-6xl leading-[0.98] tracking-[-0.045em]">
            Every artifact,
            <br />
            <span className="bg-gradient-to-r from-[#6aa6ff] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
              one manifold.
            </span>
          </h1>
          <p className="mt-6 max-w-[42ch] text-[#99a1b5] text-xl">
            The hub where your containers, crates, packages, schemas, and WASM
            live together, versioned, private, and one command away. One surface
            for everything you build.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => signIn()} disabled={isPending}>
              Create your hub
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={DOCS_URL}>Read the docs</a>
            </Button>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#fb923c]/40 bg-[#fb923c]/10 px-3 py-1.5 font-semibold text-[#fb923c] text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#fb923c]" />
              Coming soon
            </span>
          </div>
        </div>

        {/* hub constellation */}
        <div className="mx-auto w-full max-w-[460px]">
          <svg viewBox="0 0 400 420" className="w-full overflow-visible">
            <title>Manifold connects every artifact type in one hub</title>
            <defs>
              <linearGradient
                id="mf-edge"
                gradientUnits="userSpaceOnUse"
                x1="60"
                y1="60"
                x2="340"
                y2="340"
              >
                <stop offset="0" stopColor="#3b82f6" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
              <radialGradient id="mf-core">
                <stop offset="0" stopColor="#6aa6ff" />
                <stop offset="1" stopColor="#3b82f6" />
              </radialGradient>
            </defs>
            <g
              stroke="url(#mf-edge)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
              strokeDasharray="4 6"
            >
              {NODES.map((n) => (
                <line key={n.kind} x1="200" y1="200" x2={n.x} y2={n.y} />
              ))}
            </g>
            {NODES.map((n) => (
              <g key={n.kind} transform={`translate(${n.x},${n.y})`}>
                <circle
                  r="30"
                  fill="#13161f"
                  stroke="#272c3a"
                  strokeWidth="1.5"
                />
                <g transform="translate(-12,-12)" stroke={n.color} {...stroke}>
                  {MARK[n.kind]}
                </g>
                <text
                  y="50"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="#f2f4fa"
                >
                  {n.label}
                </text>
              </g>
            ))}
            <circle
              cx="200"
              cy="200"
              r="46"
              fill="url(#mf-core)"
              style={{ filter: "drop-shadow(0 0 22px rgba(59,130,246,0.75))" }}
            />
            <ManifoldMark
              x={177}
              y={180}
              width={46}
              height={40}
              className="text-white"
            />
          </svg>
        </div>
      </section>

      {/* flows */}
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto mb-11 max-w-[640px] text-center">
          <h2 className="font-extrabold text-4xl tracking-[-0.035em]">
            One surface. Every artifact type.
          </h2>
          <p className="mt-3 text-[#99a1b5] text-lg">
            Push with the tools you already use. Manifold speaks each protocol
            natively, so everything you ship lands in the same connected hub.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {FLOWS.map((f) => (
            <div
              key={f.kind}
              className="rounded-2xl border border-[#1b1f2b] bg-[#0e1016] p-5 text-center"
            >
              <div
                className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: f.tint }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  stroke={f.color}
                  {...stroke}
                  role="img"
                >
                  <title>{f.name}</title>
                  {MARK[f.kind]}
                </svg>
              </div>
              <h4 className="font-bold text-sm">{f.name}</h4>
              <p className="mt-1 font-mono text-[#636b80] text-xs">{f.cmd}</p>
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
            Spin up your hub in minutes
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-[#99a1b5]">
            Free to start, no credit card. Scale as your artifacts do, or
            self-host the whole hub with Run, one command, no seats.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => signIn()} disabled={isPending}>
              Create your hub
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
