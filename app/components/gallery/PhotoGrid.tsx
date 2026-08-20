"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Lightbox, { type GalleryItem } from "./Lightbox";

type Props = {
  items: GalleryItem[];
  /**
   * "masonry" keeps each photo's own proportions (nothing is cropped);
   * "grid" crops to uniform squares for a tidier block.
   */
  variant?: "masonry" | "grid";
  /** Accessible name for the list, e.g. "Dojo photos". */
  label: string;
};

export default function PhotoGrid({
  items,
  variant = "masonry",
  label,
}: Props) {
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

  const masonry = variant === "masonry";

  return (
    <>
      <ul
        aria-label={label}
        className={
          masonry
            ? "columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4"
            : "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        }
      >
        {items.map((photo, i) => (
          <li key={photo.src} className={masonry ? "mb-3 sm:mb-4" : ""}>
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Open photo ${i + 1} of ${items.length}`}
              className="group relative block w-full overflow-hidden bg-ink/10 shadow-sm transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {masonry ? (
                <Image
                  src={photo.src}
                  alt={photo.alt ?? ""}
                  width={photo.width ?? 1200}
                  height={photo.height ?? 900}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <span className="relative block aspect-square w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
              )}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/15"
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        items={items}
        activeIndex={activeIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}
