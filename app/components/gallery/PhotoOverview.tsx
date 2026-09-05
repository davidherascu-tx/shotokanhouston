"use client";

import Image from "next/image";
import { useEffect } from "react";
import { type GalleryItem } from "./Lightbox";

type Props = {
  items: GalleryItem[];
  /** Heading for the sheet, e.g. "Sensei Kayarash Daylami". */
  title: string;
  /**
   * False while the lightbox is stacked on top. Keeps Escape and the tab order
   * with whichever layer is actually in front.
   */
  topmost: boolean;
  onPick: (index: number) => void;
  onClose: () => void;
};

/**
 * A full-screen contact sheet. Lets someone scan every photo at once and pick
 * the one they want, rather than paging through the lightbox to find it.
 */
export default function PhotoOverview({
  items,
  title,
  topmost,
  onPick,
  onClose,
}: Props) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    // While the lightbox is open it owns Escape, so only one layer closes.
    if (!topmost) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [topmost, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`All photos of ${title}`}
      inert={!topmost}
      className="fixed inset-0 z-[90] flex flex-col bg-ink/95"
    >
      <header className="shrink-0 border-b border-bone/15">
        {/* Same max-width and padding as the grid below, so the title bar
            lines up with the thumbnails instead of spanning the viewport. */}
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
          <div className="min-w-0">
            <p className="font-display truncate text-sm uppercase tracking-[0.3em] text-bone sm:text-base">
              {title}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.4em] text-crimson">
              {items.length} photos — tap to view
            </p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-bone/30 text-bone transition-colors hover:border-crimson hover:bg-crimson focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
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
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {/* Tiles climb with the screen rather than staying a fixed size:
            ~106px 3-up on a phone, ~231px 4-up once the width caps out. Equal
            absolute sizes made the phone look enormous (a 163px tile is 43%
            of a 375px screen) and the desktop look cramped. */}
        <ul className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-2 px-5 py-6 sm:grid-cols-4 sm:gap-3 sm:px-8">
          {items.map((photo, index) => (
            <li key={photo.src}>
              <button
                type="button"
                onClick={() => onPick(index)}
                aria-label={`View photo ${index + 1} of ${items.length}`}
                className="group relative block aspect-square w-full overflow-hidden border border-bone/10 bg-bone/5 transition-colors hover:border-crimson focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt ?? ""}
                  fill
                  // Past lg the grid is width-capped, so tiles stop growing
                  // with the viewport and a fixed px hint beats a vw one.
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 25vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-ink/20 transition-colors group-hover:bg-ink/0"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
