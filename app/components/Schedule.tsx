import Image from "next/image";
import Link from "next/link";

type Tone = "beginner" | "intermediate" | "advanced" | "kata";

type Slot = {
  name: string;
  ages: string;
  time: string;
  location: string;
  tone: Tone;
  note?: string;
};

const schedule: { day: string; slots: Slot[] }[] = [
  {
    day: "Monday",
    slots: [
      {
        name: "Intermediate",
        ages: "6–12 years old",
        time: "5:00 PM – 6:00 PM",
        location: "Main Dojo",
        tone: "intermediate",
        note: "Invitation only",
      },
    ],
  },
  {
    day: "Tuesday",
    slots: [
      {
        name: "Beginners",
        ages: "6–12 years old",
        time: "5:00 PM – 6:00 PM",
        location: "Main Dojo",
        tone: "beginner",
      },
      {
        name: "Intermediate",
        ages: "12 years old & up",
        time: "6:00 PM – 7:00 PM",
        location: "Main Dojo",
        tone: "intermediate",
      },
      {
        name: "Advanced",
        ages: "Invitation only",
        time: "7:00 PM – 8:15 PM",
        location: "Main Dojo",
        tone: "advanced",
      },
    ],
  },
  {
    day: "Wednesday",
    slots: [
      {
        name: "Intermediate",
        ages: "6–12 years old",
        time: "5:00 PM – 6:00 PM",
        location: "Main Dojo",
        tone: "intermediate",
        note: "Invitation only",
      },
    ],
  },
  {
    day: "Thursday",
    slots: [
      {
        name: "Beginners",
        ages: "6–12 years old",
        time: "5:00 PM – 6:00 PM",
        location: "Main Dojo",
        tone: "beginner",
      },
      {
        name: "Intermediate",
        ages: "12 years old & up",
        time: "6:00 PM – 7:00 PM",
        location: "Main Dojo",
        tone: "intermediate",
      },
      {
        name: "Advanced",
        ages: "Invitation only",
        time: "7:00 PM – 8:15 PM",
        location: "Main Dojo",
        tone: "advanced",
      },
    ],
  },
  {
    day: "Saturday",
    slots: [
      {
        name: "Kata — All Students",
        ages: "12 years old & up",
        time: "10:30 AM – 11:15 AM",
        location: "Small Dojo",
        tone: "kata",
      },
      {
        name: "Kata — Brown & Black Belts Only",
        ages: "Brown & black belt",
        time: "11:15 AM – 12:00 PM",
        location: "Small Dojo",
        tone: "kata",
      },
    ],
  },
];

const toneStyles: Record<Tone, string> = {
  beginner: "border-l-emerald-500 bg-emerald-500/5",
  intermediate: "border-l-amber-500 bg-amber-500/5",
  advanced: "border-l-crimson bg-crimson/5",
  kata: "border-l-gold bg-gold/10",
};

const toneLabel: Record<Tone, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  kata: "Kata",
};

const toneDot: Record<Tone, string> = {
  beginner: "bg-emerald-500",
  intermediate: "bg-amber-500",
  advanced: "bg-crimson",
  kata: "bg-gold",
};

export default function Schedule() {
  return (
    <section className="relative bg-paper py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-charcoal/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
              Weekly Class Schedule
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-ink sm:text-5xl">
              Train With <span className="text-crimson">Us</span>
            </h2>
            <div className="stitch-divider mt-6 w-32" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Classes run year-round at our Main and Small Dojos. Drop in to
              observe a class anytime — visitors are always welcome.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {(Object.keys(toneLabel) as Tone[]).map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-ink-soft">
                <span className={`inline-block h-3 w-3 ${toneDot[t]}`} />
                <span className="font-medium">{toneLabel[t]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {schedule.map((d) => (
            <div
              key={d.day}
              className="relative overflow-hidden border border-ink/10 bg-bone shadow-md"
            >
              <div className="flex items-baseline justify-between bg-charcoal px-5 py-4">
                <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-bone">
                  {d.day}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                  {d.slots.length} {d.slots.length === 1 ? "class" : "classes"}
                </span>
              </div>
              <ul className="divide-y divide-ink/10">
                {d.slots.map((s, idx) => (
                  <li
                    key={idx}
                    className={`border-l-4 px-5 py-4 ${toneStyles[s.tone]}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-display text-base font-bold uppercase tracking-wide text-ink">
                          {s.name}
                        </div>
                        <div className="mt-0.5 text-xs uppercase tracking-wider text-ink-soft">
                          {s.ages}
                          {s.note ? ` · ${s.note}` : ""}
                        </div>
                      </div>
                      <span
                        className={`shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] ${
                          s.tone === "advanced"
                            ? "text-crimson"
                            : s.tone === "kata"
                            ? "text-gold"
                            : "text-ink-soft"
                        }`}
                      >
                        {toneLabel[s.tone]}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <span className="font-semibold text-ink">{s.time}</span>
                      <span className="text-ink-soft">·</span>
                      <span className="text-ink-soft">{s.location}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-10 overflow-hidden border border-ink/10 bg-charcoal lg:grid-cols-2">
          <div className="relative h-64 w-full lg:h-full">
            <Image
              src="/training_1.jpg"
              alt="Karate training session"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-transparent" />
          </div>
          <div className="p-8 lg:p-12">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">
              Ready to Begin?
            </p>
            <h3 className="font-display mt-3 text-3xl font-bold uppercase text-bone sm:text-4xl">
              Your First Class is Free
            </h3>
            <p className="mt-4 text-bone/75">
              Come visit the dojo, meet our instructors, and try a class on us.
              No commitment, no pressure — just bring an open mind and a clean
              pair of socks.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center rounded-sm bg-crimson px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone shadow-lg transition-all hover:bg-crimson-light"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
