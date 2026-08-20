"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type TouchEvent as ReactTouchEvent,
} from "react";

export type GalleryItem = {
  src: string;
  file: string;
  /** Optional label shown in the lightbox footer. Most sets don't use one. */
  caption?: string;
  /**
   * Descriptive alt text for screen readers and image search. Deliberately
   * separate from `caption` so photos can be indexable without printing a
   * label on the page.
   */
  alt?: string;
};

type Props = {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/** Must match the transition below — it's how long we wait before committing. */
const SETTLE_MS = 300;
const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";
/**
 * Fingers never move in a straight line; ignore the first few px so we can
 * tell a horizontal swipe from a vertical one before hijacking the gesture.
 */
const AXIS_LOCK_PX = 8;
/** Furthest a swipe has to travel to flip the page, in px. */
const MAX_THRESHOLD = 72;

export default function Lightbox({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const start = useRef({ x: 0, y: 0 });
  const axis = useRef<"x" | "y" | null>(null);
  const dragging = useRef(false);
  const swiped = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Park the track on the middle slide. This runs after every slide change,
  // which is also what lands a just-committed swipe back at centre without a
  // visible jump: the neighbour it animated to is now the middle cell.
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.transform = "translate3d(-100%, 0, 0)";
  }, [activeIndex]);

  useEffect(
    () => () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    },
    [],
  );

  if (activeIndex === null) return null;
  const active = items[activeIndex];
  if (!active) return null;

  const count = items.length;
  const label = active.caption ?? "";
  const description = active.caption ?? "Photo";

  // Only the two neighbours are mounted. They sit off-screen but load eagerly,
  // so a swipe reveals an image that is already decoded instead of a blank
  // frame while it downloads.
  const slides: (number | null)[] =
    count > 1
      ? [
          (activeIndex - 1 + count) % count,
          activeIndex,
          (activeIndex + 1) % count,
        ]
      : [null, activeIndex, null];

  /** Animate the track to `to`, then hand the slide change to the parent. */
  const settle = (to: string, commit: (() => void) | null) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = `transform ${SETTLE_MS}ms ${EASE}`;
    el.style.transform = `translate3d(${to}, 0, 0)`;
    if (!commit) return;
    settleTimer.current = setTimeout(() => {
      settleTimer.current = null;
      commit();
    }, SETTLE_MS);
  };

  const onTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    // Ignore gestures that start mid-settle, and anything multi-touch so
    // pinch-to-zoom is left to the browser.
    if (settleTimer.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    start.current = { x: touch.clientX, y: touch.clientY };
    axis.current = null;
    dragging.current = true;
    swiped.current = false;
    const el = trackRef.current;
    if (el) el.style.transition = "none";
  };

  const onTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - start.current.x;
    const dy = touch.clientY - start.current.y;

    if (axis.current === null) {
      if (Math.abs(dx) < AXIS_LOCK_PX && Math.abs(dy) < AXIS_LOCK_PX) return;
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (axis.current !== "x") return;

    // Written straight to the DOM: re-rendering on every touchmove is what
    // makes a React-state carousel stutter.
    swiped.current = true;
    const el = trackRef.current;
    if (el) el.style.transform = `translate3d(calc(-100% + ${dx}px), 0, 0)`;
  };

  const endDrag = (dx: number | null) => {
    if (!dragging.current) return;
    dragging.current = false;
    const horizontal = axis.current === "x";
    axis.current = null;

    const el = trackRef.current;
    if (!el || !horizontal) return;
    if (dx === null || count < 2) {
      settle("-100%", null);
      return;
    }

    const threshold = Math.min(MAX_THRESHOLD, el.clientWidth * 0.16);
    if (dx <= -threshold) settle("-200%", onNext);
    else if (dx >= threshold) settle("0%", onPrev);
    else settle("-100%", null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={description}
      className="fixed inset-0 z-[100] bg-ink/95"
      onClick={() => {
        // A swipe that lifts off over the backdrop still fires a click in some
        // browsers — don't let it close the lightbox.
        if (swiped.current) {
          swiped.current = false;
          return;
        }
        onClose();
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ touchAction: "pan-y pinch-zoom" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={(e) =>
          endDrag(e.changedTouches[0].clientX - start.current.x)
        }
        onTouchCancel={() => endDrag(null)}
      >
        <div
          ref={trackRef}
          className="flex h-full w-full will-change-transform"
          style={{ transform: "translate3d(-100%, 0, 0)" }}
        >
          {slides.map((index, position) => {
            const photo = index === null ? null : items[index];
            return (
              <div
                key={position}
                aria-hidden={position !== 1}
                className="flex h-full w-full shrink-0 items-center justify-center px-4 pb-24 pt-20 sm:px-20"
              >
                {photo ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt ?? photo.caption ?? "Photo"}
                    width={1600}
                    height={1200}
                    sizes="100vw"
                    draggable={false}
                    loading="eager"
                    fetchPriority={position === 1 ? "high" : "low"}
                    className="h-auto max-h-full w-auto max-w-full select-none object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center border border-bone/30 text-bone transition-colors hover:border-crimson hover:bg-crimson sm:right-8 sm:top-8"
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

      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-bone/30 text-bone transition-colors hover:border-crimson hover:bg-crimson sm:left-8 sm:inline-flex"
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
            className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-bone/30 text-bone transition-colors hover:border-crimson hover:bg-crimson sm:right-8 sm:inline-flex"
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

      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex items-center justify-center gap-4 px-6 text-bone/75">
        {label ? (
          <>
            <span className="font-display text-xl text-bone">{label}</span>
            <span className="h-px w-8 bg-bone/30" />
          </>
        ) : null}
        <span className="text-[11px] uppercase tracking-[0.4em]">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
