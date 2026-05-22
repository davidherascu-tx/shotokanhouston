"use client";

import Image from "next/image";
import { useEffect } from "react";

export type GalleryItem = {
  src: string;
  year: number;
  file: string;
};

type Props = {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: Props) {
  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, onClose, onNext, onPrev]);

  if (activeIndex === null) return null;
  const active = items[activeIndex];
  if (!active) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo from ${active.year}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center border border-bone/30 text-bone transition-colors hover:border-crimson hover:bg-crimson sm:right-8 sm:top-8"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center border border-bone/30 text-bone transition-colors hover:border-crimson hover:bg-crimson sm:left-8"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center border border-bone/30 text-bone transition-colors hover:border-crimson hover:bg-crimson sm:right-8"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      ) : null}

      <div
        className="relative flex max-h-full max-w-6xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={active.src}
          alt={`Photo from ${active.year}`}
          width={1600}
          height={1200}
          sizes="100vw"
          className="max-h-[80vh] w-auto object-contain"
          priority
        />
        <div className="mt-5 flex items-center gap-4 text-bone/75">
          <span className="font-display text-xl text-bone">{active.year}</span>
          <span className="h-px w-8 bg-bone/30" />
          <span className="text-[11px] uppercase tracking-[0.4em]">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper used by every variant: groups items by year (newest first)
export function groupByYear(items: GalleryItem[]) {
  const map = new Map<number, GalleryItem[]>();
  for (const item of items) {
    const arr = map.get(item.year) ?? [];
    arr.push(item);
    map.set(item.year, arr);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, photos]) => ({ year, photos }));
}
