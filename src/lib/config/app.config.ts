/**
 * Application configuration.
 */
const app = {
  name: "Manifold",
  // Product symbol, mirrors the omni-api catalog SSOT (`catalog/products.ts`
  // manifold `icon`). Used in the "Made with <symbol> by Omni" footer credit.
  icon: "➰",
  description:
    "The universal artifact registry. One hub for your containers, Cargo crates, npm packages, schemas, and WASM, versioned, private by default, and self-hostable.",
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
    url: "https://omni.dev",
    supportEmailAddress: "support@omni.dev",
  },
  /** PWA configuration. Values should match public/manifest.json. */
  pwa: {
    themeColor: "#000000",
    backgroundColor: "#000000",
  },
};

export default app;
