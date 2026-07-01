/**
 * Application configuration.
 */
const app = {
  name: "Manifold",
  description:
    "Schema registry and management platform for OpenAPI, GraphQL, JSON Schema, WASM, and Container artifacts.",
  url: "https://manifold.omni.dev",
  docsUrl: "https://docs.omni.dev",
  socials: {
    discord: "https://discord.gg/omnidotdev",
    x: "https://x.com/omnidotdev",
    threads: "https://www.threads.com/@omnidotdev",
  },
  feedbackUrl: "https://backfeed.omni.dev/workspaces/omni/projects/manifold",
  // Legal links mirror the omni-api catalog SSOT
  legal: {
    privacy: "https://omni.dev/legal/privacy",
    terms: "https://omni.dev/legal/terms",
    cookies: "https://omni.dev/legal/cookies",
  },
  organization: {
    name: "Omni",
    supportEmailAddress: "support@omni.dev",
  },
  /** PWA configuration. Values should match public/manifest.json. */
  pwa: {
    themeColor: "#000000",
    backgroundColor: "#000000",
  },
};

export default app;
