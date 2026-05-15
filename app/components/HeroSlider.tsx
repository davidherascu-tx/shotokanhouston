"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/slider_1.jpg",
    eyebrow: "Karate-Do · 空手道",
    title: "Discipline. Respect. Strength.",
    body: "Traditional Shotokan training in the heart of Houston — for every age, every belt, every spirit.",
  },
  {
    src: "/slider_2.jpg",
    eyebrow: "Train With Purpose",
    title: "Forge Body and Mind",
    body: "Kihon, kata, and kumite taught the way they have been for generations.",
  },
  {
    src: "/slider_3.jpg",
    eyebrow: "All Ages Welcome",
    title: "From First Step to Black Belt",
    body: "Classes for kids, youth, and adults — beginners are welcomed warmly into the dojo family.",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-charcoal">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.src}
            alt=""
            fill
            sizes="100vw"
            preload={i === 0}
            className={`object-cover ${
              i === index ? "animate-[fadezoom_8s_ease-out_forwards]" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-end pb-24 md:items-center md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            {slides.map((s, i) => (
              <div
                key={s.src}
                className={`transition-all duration-700 ${
                  i === index
                    ? "opacity-100 translate-y-0"
                    : "pointer-events-none absolute opacity-0 translate-y-4"
                }`}
              >
                {i === index && (
                  <>
                    <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">
                      {s.eyebrow}
                    </p>
                    <h1 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-bone drop-shadow-lg sm:text-6xl md:text-7xl">
                      {s.title}
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/90 sm:text-xl">
                      {s.body}
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                      <Link
                        href="/programs"
                        className="inline-flex items-center rounded-sm bg-crimson px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone shadow-lg shadow-black/40 transition-all hover:bg-crimson-light"
                      >
                        Explore Programs
                      </Link>
                      <Link
                        href="/schedule"
                        className="inline-flex items-center rounded-sm border border-bone/40 bg-white/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone backdrop-blur transition-all hover:border-gold hover:text-gold"
                      >
                        View Schedule
                      </Link>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1 transition-all ${
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
