"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

const slides = [
  {
    src: "/slider_1.webp",
    eyebrow: "Karate-Do · 空手道",
    title: "Respect. Strength. Discipline.",
    body: "Traditional Shotokan karate training in the heart of Houston — for every age, every experience level, every spirit.",
    position: "object-top",
  },
  {
    src: "/slider_2.webp",
    eyebrow: "All Ages Welcome",
    title: "From First Step to Black Belt",
    body: "Classes for kids, youth, and adults — beginners are welcomed warmly into the dojo family.",
    position: "object-center",
  },
  {
    src: "/slider_3.webp",
    eyebrow: "Train With Purpose",
    title: "Forge Your Body and Mind",
    body: "Kihon, kata, and kumite taught traditionally, the way they have been taught for generations.",
    position: "object-center",
  },
];

const SLIDE_DURATION = 5000;
const FADE = 1200;
/** Slow, natural deceleration — no bounce at the end of the crossfade. */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const TITLE_CLASS =
  "font-display mt-4 text-4xl font-bold uppercase leading-tight text-bone drop-shadow-lg sm:text-6xl md:text-7xl";

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reducedMotion = useReducedMotion();

  // Advancing on a timeout keyed to `index` (rather than a fixed interval)
  // restarts the clock whenever the slide changes, so tapping a dot always
  // buys a full dwell instead of a stub of one.
  useEffect(() => {
    if (hovered || hidden) return;
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      SLIDE_DURATION,
    );
    return () => clearTimeout(id);
  }, [index, hovered, hidden]);

  // Background tabs throttle timers, which otherwise leaves the slider
  // mid-fade when you come back to it.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <section
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-charcoal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.src}
            aria-hidden={!active}
            className={`absolute inset-0 will-change-[opacity,transform] ${
              active ? "opacity-100 scale-100" : "opacity-0 scale-[1.06]"
            }`}
            style={{
              transitionProperty: "opacity, transform",
              // The scale eases across the whole dwell while on screen — a slow
              // Ken Burns drift — but snaps back over the fade when leaving, so
              // the outgoing frame never jumps.
              transitionDuration: reducedMotion
                ? "0ms, 0ms"
                : active
                  ? `${FADE}ms, ${SLIDE_DURATION + FADE}ms`
                  : `${FADE}ms, ${FADE}ms`,
              transitionTimingFunction: `${EASE}, ${EASE}`,
            }}
          >
            <Image
              src={s.src}
              alt=""
              fill
              sizes="100vw"
              preload={i === 0}
              className={`object-cover ${s.position}`}
            />
          </div>
        );
      })}

      {/* One static overlay pair for the whole slider. Per-slide copies used to
          cross-fade over each other and visibly darken mid-transition. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full items-end pb-24 md:items-center md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          {/* Every slide's copy stays mounted and is stacked in one grid cell,
              so the outgoing text can actually fade out instead of vanishing. */}
          <div className="grid max-w-2xl">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <div
                  key={s.src}
                  aria-hidden={!active}
                  className={`col-start-1 row-start-1 self-center transition-all ease-out ${
                    active
                      ? "opacity-100 translate-y-0 delay-200"
                      : "pointer-events-none opacity-0 translate-y-5"
                  }`}
                  style={{
                    transitionDuration: reducedMotion ? "0ms" : `${FADE}ms`,
                  }}
                >
                  <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">
                    {s.eyebrow}
                  </p>
                  {/* Every slide stays mounted for the cross-fade, so only the
                      first title is an <h1> — three would dilute the page's
                      heading signal. The rest are visually identical <h2>s. */}
                  {i === 0 ? (
                    <h1 className={TITLE_CLASS}>{s.title}</h1>
                  ) : (
                    <h2 className={TITLE_CLASS}>{s.title}</h2>
                  )}
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/90 sm:text-xl">
                    {s.body}
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                      href="/programs"
                      tabIndex={active ? undefined : -1}
                      className="inline-flex items-center rounded-sm bg-crimson px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone shadow-lg shadow-black/40 transition-all hover:bg-crimson-light"
                    >
                      Explore Programs
                    </Link>
                    <Link
                      href="/schedule"
                      tabIndex={active ? undefined : -1}
                      className="inline-flex items-center rounded-sm border border-bone/40 bg-white/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone backdrop-blur transition-all hover:border-gold hover:text-gold"
                    >
                      View Schedule
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}: ${s.title}`}
            aria-current={i === index}
            className={`h-1 transition-all duration-500 ease-out ${
              i === index ? "w-12 bg-gold" : "w-6 bg-bone/40 hover:bg-bone/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-2 right-6 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-bone/60">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="block h-10 w-px bg-gradient-to-b from-bone/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
