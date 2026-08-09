import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import PhotoGrid from "../components/gallery/PhotoGrid";
import PageHero from "../components/PageHero";
import { loadPhotos } from "../lib/photos";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery — Life at the Dojo",
  description:
    "Photographs from the Shotokan Karate-Do Center, Houston, TX — training, kata, gradings, and dojo life.",
  path: "/gallery",
});

export default function GalleryPage() {
  const items = loadPhotos("gallery", {
    alt: "Shotokan karate training at Shotokan Karate-Do Center, Houston, TX",
  });

  return (
    <>
      <Breadcrumbs name="Gallery" path="/gallery" />
      <PageHero
        eyebrow="Gallery"
        title="Life at the Dojo"
        subtitle="Training, kata, and the moments in between."
        image="/gallery/gallery_27.webp"
      />

      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {items.length ? (
            <PhotoGrid items={items} label="Dojo photographs" />
          ) : (
            <p className="text-center text-sm uppercase tracking-[0.3em] text-ink-soft/60">
              No photographs yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
