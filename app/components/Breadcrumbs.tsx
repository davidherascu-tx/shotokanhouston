import { SITE_URL } from "../lib/seo";

type Props = {
  /** Label for the current page, e.g. "About the Dojo". */
  name: string;
  /** Path of the current page, e.g. "/about". */
  path: string;
};

/**
 * Emits BreadcrumbList JSON-LD so search results show "Home › About" rather
 * than a bare URL. Home is always the first crumb; the site is only one level
 * deep, so two crumbs is the whole trail.
 */
export default function Breadcrumbs({ name, path }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
