import type { Metadata } from "next";

export const SITE_URL = "https://shotokanhouston.org";
export const SITE_NAME = "Shotokan Karate-Do Center, Houston, TX";

export const DEFAULT_TITLE = `${SITE_NAME} — S.K.I.F. Member Dojo`;
export const DEFAULT_DESCRIPTION =
  "Traditional Shotokan karate dojo in Houston, Texas — a proud member of the Shotokan Karate International Federation (S.K.I.F.). Classes for kids, youth, and adults inside the Trotter Family YMCA of Greater Houston.";

// Bump when page content meaningfully changes. Kept static on purpose: a
// build-time `new Date()` would tell crawlers every page changed on every
// deploy, which teaches them to ignore <lastmod> entirely.
export const CONTENT_LAST_MODIFIED = "2026-08-09";

const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: DEFAULT_TITLE,
};

const twitterImage = { ...ogImage, url: "/twitter-image" };

/**
 * Builds a page's metadata with the shared social preview image baked in.
 *
 * Next.js merges metadata *shallowly*, so a page that sets `openGraph` or
 * `twitter` replaces the root layout's resolved value — including the image
 * supplied by the `opengraph-image` file convention. Every page that overrides
 * those keys must therefore restate the images, which is what this does.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage],
    },
  };
}
