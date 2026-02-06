import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";

/** Parameters for generating page meta tags */
interface Params {
  /** Page title, appended to site name */
  title?: string;
  /** Page description for SEO */
  description?: string;
  /** Open Graph image URL */
  image?: string;
  /** Comma-separated keywords */
  keywords?: string;
  /** Canonical page URL */
  url?: string;
}

/**
 * Create meta tags.
 */
const createMetaTags = ({
  title: _title,
  description: _description,
  url: _url,
  image,
  keywords,
}: Params = {}) => {
  const title = _title ? `${_title} | ${app.name}` : app.name,
    description = _description ?? app.description,
    url = _url ?? BASE_URL;

  const tags = [
    { title },
    {
      name: "description",
      content: description,
    },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    {
      name: "twitter:description",
      content: description,
    },
    { name: "twitter:creator", content: "@omnidotdev" },
    { name: "twitter:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    {
      property: "og:description",
      content: description,
    },
    { property: "og:url", content: url },
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { property: "og:image", content: image },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
        ]
      : [
          // TODO dynamic OG/static improve
          { name: "twitter:image", content: `${BASE_URL}/og.png` },
          { name: "twitter:card", content: "summary_large_image" },
          { property: "og:image", content: `${BASE_URL}/og.png` },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
        ]),
  ];

  return tags;
};

export default createMetaTags;
