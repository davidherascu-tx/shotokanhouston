import type { MetadataRoute } from "next";
import { loadPhotos } from "./lib/photos";
import { CONTENT_LAST_MODIFIED, SITE_URL } from "./lib/seo";

const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/programs", priority: 0.8, changeFrequency: "monthly" },
  { path: "/schedule", priority: 0.8, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/join", priority: 0.9, changeFrequency: "yearly" },
];

/** Photos worth surfacing in Google Images, listed against the page they live on. */
const imagesByPath: Record<string, string[]> = {
  "/gallery": loadPhotos("gallery").map((p) => `${SITE_URL}${p.src}`),
  "/about": [...loadPhotos("dojo"), ...loadPhotos("sensei")].map(
    (p) => `${SITE_URL}${p.src}`,
  ),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: imagesByPath[route.path],
  }));
}
