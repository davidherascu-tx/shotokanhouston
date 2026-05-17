import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    image: "/kids_program.webp",
    age: "Ages 6 – 11",
    title: "Kids Karate",
    subtitle: "Beginner & Intermediate",
    description:
      "A fun, structured environment where young students build focus, coordination, and confidence while learning the fundamentals of Shotokan karate.",
    highlights: [
      "Discipline & respect",
      "Coordination & balance",
      "Anti-bullying skills",
      "Belt progression",
    ],
  },
  {
    image: "/youth_program.webp",
    age: "Ages 12 +",
    title: "Youth Program",
    subtitle: "Intermediate Training",
    description:
      "For teens ready to take their training seriously — sharper technique, deeper kata, and controlled kumite that builds athletes and leaders.",
    highlights: [
      "Strength & conditioning",
      "Advanced kata",
      "Controlled sparring",
      "Self Confidence",
    ],
  },
  {
    image: "/adult_program.webp",
    age: "Adults",
    title: "Adult Karate",
    subtitle: "All Levels Welcome",
    description:
      "Whether you are a beginner or an experienced karateka, our adult classes balance traditional training with practical, real-world skills.",
    highlights: [
      "Traditional karate-do",
      "Fitness & flexibility",
      "Self-defense",
      "Black belt path",
    ],
  },
];

export default function Programs() {
  return (
    <section className="relative bg-charcoal py-24 lg:py-32">
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:60px_60px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">
            Training Programs
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-bone sm:text-5xl">
            Classes for <span className="text-crimson-light">Every Karateka</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mt-6 text-lg leading-relaxed text-bone/70">
            From a child&apos;s first bow of respect to an adult&apos;s pursuit of black belt,
            our programs are designed to meet you where you are and take you
            further than you thought possible.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden bg-ink-soft shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-crimson/20"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center bg-crimson px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-bone">
                  {p.age}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">
                    {p.subtitle}
                  </p>
                  <h3 className="font-display mt-1 text-3xl font-bold uppercase text-bone">
                    {p.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 lg:p-7">
                <p className="text-sm leading-relaxed text-bone/75">
                  {p.description}
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2">
                  {p.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-xs text-bone/80"
                    >
                      <span className="inline-block h-1 w-1 rotate-45 bg-gold" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/schedule"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold transition-all group-hover:text-crimson-light"
                >
                  View Schedule
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
