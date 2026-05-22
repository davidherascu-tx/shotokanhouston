import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { type GalleryItem } from "../components/gallery/Lightbox";
import Zigzag from "../components/gallery/Zigzag";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Gallery — Through the Years",
  description:
    "A timeline gallery of the Shotokan Karate-Do Center, Houston, TX — moments from the dojo across the decades.",
};

function loadGalleryItems(): GalleryItem[] {
  const dir = path.join(process.cwd(), "public", "gallery");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  const items: GalleryItem[] = [];
  for (const file of files) {
    if (!/\.(webp|jpe?g|png|gif|avif)$/i.test(file)) continue;
    const match = file.match(/^(\d{4})/);
    if (!match) continue;
    items.push({ src: `/gallery/${file}`, year: Number(match[1]), file });
  }

  // Canonical ordering: newest year first, then by filename within the year.
  items.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.file.localeCompare(b.file);
  });

  return items;
}

export default function GalleryPage() {
  const items = loadGalleryItems();
  const years = items.length
    ? `${items[items.length - 1].year} – ${items[0].year}`
    : null;

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Through the Years"
        subtitle="A look back at our dojo, our students, and our tradition — moment by moment."
        image="/about_training.webp"
      />

      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.5em] text-crimson">
              The Archive
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-ink sm:text-5xl">
              A History in <span className="text-crimson">Plates</span>
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-crimson to-transparent" />
            {years ? (
              <p className="mt-6 text-xs uppercase tracking-[0.4em] text-ink-soft/60">
                Volume {years}
              </p>
            ) : null}
          </div>

          <div className="mt-20 lg:mt-28">
            {items.length ? (
              <Zigzag items={items} />
            ) : (
              <p className="text-center text-sm uppercase tracking-[0.3em] text-ink-soft/60">
                No plates filed yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
