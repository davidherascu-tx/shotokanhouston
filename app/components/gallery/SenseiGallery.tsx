"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Lightbox, { type GalleryItem } from "./Lightbox";

type Props = {
  items: GalleryItem[];
  /** How many thumbnails to show inline before the "+N" tile. */
  thumbCount?: number;
};

export default function SenseiGallery({ items, thumbCount = 5 }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  );
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i - 1 + items.length) % items.length,
      ),
    [items.length],
  );

  if (!items.length) return null;

  const thumbs = items.slice(0, thumbCount);
  const hidden = items.length - thumbs.length;

  return (
    <div className="mt-8">
      <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
        Gallery
      </p>

      <ul className="mt-4 flex flex-wrap gap-3">
        {thumbs.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Open photo ${i + 1} of ${items.length} of Sensei Kayarash Daylami`}
              className="group relative block h-16 w-16 overflow-hidden border border-ink/10 bg-ink/5 shadow-sm transition-all hover:border-crimson hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 sm:h-20 sm:w-20"
            >
              <Image
                src={photo.src}
                alt={photo.alt ?? ""}
                fill
                sizes="80px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/10"
              />
            </button>
          </li>
        ))}

        {hidden > 0 ? (
          <li>
            <button
              type="button"
              onClick={() => setActiveIndex(thumbs.length)}
              aria-label={`Open the remaining ${hidden} photos of Sensei Kayarash Daylami`}
              className="flex h-16 w-16 items-center justify-center border border-dashed border-crimson/40 bg-crimson/5 font-display text-sm font-bold text-crimson transition-all hover:border-crimson hover:bg-crimson hover:text-bone focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 sm:h-20 sm:w-20"
            >
              +{hidden}
            </button>
          </li>
        ) : null}
      </ul>

      <button
        type="button"
        onClick={() => setActiveIndex(0)}
        className="group mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-crimson transition-colors hover:text-ink"
      >
        View all {items.length} photos
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </button>

      <Lightbox
        items={items}
        activeIndex={activeIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
}
