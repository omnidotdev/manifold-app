import {
  SiDiscord as DiscordIcon,
  SiThreads as ThreadsIcon,
  SiX as XIcon,
} from "@icons-pack/react-simple-icons";
import { AppFooter } from "@omnidotdev/thornberry/app-footer";

import { ExternalLink } from "@/components/core";
import app from "@/lib/config/app.config";

/**
 * Layout footer. Renders the shared Omni `<AppFooter>`, which bakes in the
 * "Made with <symbol> by Omni" credit, the omni.dev link, and the legal links so
 * they can't drift. Manifold supplies only its own logo, catalog symbol, docs
 * link, and social block.
 */
const Footer = () => (
  <AppFooter
    appLogo={
      <img src="/img/favicon-32x32.png" alt="" className="size-4" aria-hidden />
    }
    appSymbol={app.icon}
    docsUrl={app.docsUrl}
    orgUrl={app.organization.url}
    links={
      <ExternalLink variant="ghost" href={app.feedbackUrl}>
        Feedback
      </ExternalLink>
    }
    socials={
      <>
        <ExternalLink
          variant="ghost"
          href={app.socials.discord}
          aria-label="Discord"
        >
          <DiscordIcon className="size-5" />
        </ExternalLink>

        <ExternalLink variant="ghost" href={app.socials.x} aria-label="X">
          <XIcon className="size-5" />
        </ExternalLink>

        <ExternalLink
          variant="ghost"
          href={app.socials.threads}
          aria-label="Threads"
        >
          <ThreadsIcon className="size-5" />
        </ExternalLink>
      </>
    }
  />
);

export default Footer;
