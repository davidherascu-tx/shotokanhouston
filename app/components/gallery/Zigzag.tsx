"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import Lightbox, { groupByYear, type GalleryItem } from "./Lightbox";

type Props = {
  items: GalleryItem[];
};

export default function Zigzag({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const grouped = useMemo(() => groupByYear(items), [items]);
  const indexBySrc = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((p, i) => m.set(p.src, i));
    return m;
  }, [items]);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i + 1) % items.length,
      ),
    [items.length],
  );
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i - 1 + items.length) % items.length,
      ),
    [items.length],
  );

  return (
    <>
      <div className="relative">
        {/* Center vertical line */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-crimson/30 via-crimson/30 to-transparent sm:left-1/2 sm:-translate-x-1/2"
        />

        <ol className="space-y-16 sm:space-y-24">
          {grouped.map((group, i) => {
            const photoSide = i % 2 === 0 ? "left" : "right";

            return (
              <li
                key={group.year}
                className="relative grid grid-cols-1 items-start gap-6 sm:grid-cols-2 sm:gap-16"
              >
                {/* Dot on the line */}
                <span
                  aria-hidden
                  className="absolute left-4 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-crimson ring-4 ring-paper sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2"
                />

                {/* Photo column */}
                <div
                  className={`pl-12 sm:pl-0 ${photoSide === "left" ? "sm:pr-12 sm:order-1" : "sm:pl-12 sm:order-2"}`}
                >
                  <PhotoStack
                    photos={group.photos}
                    indexBySrc={indexBySrc}
                    onOpen={setActiveIndex}
                  />
                </div>

                {/* Year + caption column — sticky while photos are in view */}
                <div
                  className={`pl-12 sm:pl-0 sm:sticky sm:top-24 sm:self-start ${photoSide === "left" ? "sm:pl-12 sm:order-2 sm:text-left" : "sm:pr-12 sm:order-1 sm:text-right"}`}
                >
                  <div className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
                    Chapter {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display mt-2 text-5xl font-bold leading-none text-ink sm:text-6xl">
                    {group.year}
                  </h3>
                  <div
                    className={`mt-3 h-px w-12 bg-crimson/50 ${photoSide === "right" ? "sm:ml-auto" : ""}`}
                  />
                  <p className="mt-3 text-xs uppercase tracking-[0.35em] text-ink-soft/60">
                    {group.photos.length}{" "}
                    {group.photos.length === 1 ? "Photograph" : "Photographs"}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

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

function PhotoStack({
  photos,
  indexBySrc,
  onOpen,
}: {
  photos: GalleryItem[];
  indexBySrc: Map<string, number>;
  onOpen: (i: number) => void;
}) {
  return (
    <div className="grid gap-4">
      {photos.map((photo) => {
        const idx = indexBySrc.get(photo.src) ?? 0;
        return (
          <button
            key={photo.src}
            type="button"
            onClick={() => onOpen(idx)}
            className="group relative block w-full overflow-hidden bg-ink/80 shadow-md transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            aria-label={`Open photo from ${photo.year}`}
          >
            <Image
              src={photo.src}
              alt={`Photo from ${photo.year}`}
              width={1200}
              height={900}
              sizes="(min-width: 640px) 40vw, 100vw"
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/15" />
          </button>
        );
      })}
    </div>
  );
}
