import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InternationalWelcome from "../components/InternationalWelcome";
import PageHero from "../components/PageHero";
import Welcome from "../components/Welcome";

export const metadata: Metadata = {
  title: "About — S.K.I.F. Tradition in Houston",
  description:
    "Learn about Shotokan Karate-Do Center, Houston, TX, a proud member dojo of the Shotokan Karate International Federation (S.K.I.F.) founded by Soke Hirokazu Kanazawa.",
};

const lineage = [
  {
    name: "Gichin Funakoshi",
    title: "Founder of Shotokan Karate",
    years: "1868 – 1957",
    text: "Brought karate from Okinawa to mainland Japan and named his style after his pen name, Shōtō (松濤) — “pine waves.”",
  },
  {
    name: "Hirokazu Kanazawa",
    title: "Founder of S.K.I.F.",
    years: "1931 – 2019",
    text: "Soke Kanazawa founded the Shotokan Karate International Federation in 1978 to preserve traditional Shotokan and share it across the world.",
  },
  {
    name: "Our Dojo",
    title: "Shotokan Karate-Do Center, Houston, TX",
    years: "40+ Years · S.K.I.F. Member",
    text: "We carry the lineage forward in Houston — teaching kihon, kata, and kumite with the precision and respect that defines S.K.I.F. Shotokan. For over 40 years, our dojo has called the Trotter Family YMCA of Greater Houston home, with instructors visiting from Japan to keep our training directly connected to the source. Classes are led by Sensei Kayarash Daylami, 7th Dan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Dojo"
        title="Tradition, Discipline, and Lineage"
        subtitle="A proud Shotokan Karate International Federation member dojo in Houston, Texas."
        image="/about_training.webp"
      />

      <Welcome />

      <section className="bg-charcoal py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">
              Our Lineage
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-bone sm:text-5xl">
              From Funakoshi to <span className="text-crimson-light">Houston</span>
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <ol className="mt-16 grid gap-8 md:grid-cols-3">
            {lineage.map((l, i) => (
              <li
                key={l.name}
                className="relative border border-bone/10 bg-ink-soft/60 p-7 backdrop-blur"
              >
                <div className="font-display text-5xl font-bold text-crimson/50">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-4 font-display text-xl font-bold uppercase tracking-wider text-bone">
                  {l.name}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.25em] text-gold">
                  {l.title}
                </div>
                <div className="mt-0.5 text-xs text-bone/50">{l.years}</div>
                <p className="mt-4 text-sm leading-relaxed text-bone/75">
                  {l.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mt-0 grid items-center gap-0 overflow-hidden border border-ink/10 shadow-xl lg:grid-cols-2">
            <div className="w-full">
              <Image
                src="/sensei_kayarash_daylami.webp"
                alt="Sensei Kayarash Daylami"
                width={0}
                height={0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-auto"
              />
            </div>
            <div className="bg-white p-10 lg:p-14 h-full">
              <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
                Lead Instructor
              </p>
              <div className="mt-3 font-display text-3xl font-bold uppercase tracking-wider text-ink sm:text-4xl">
                Sensei Kayarash Daylami
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.3em] text-crimson">
                7th Dan · S.K.I.F.
              </div>
              <div className="mt-5 h-px w-16 bg-gradient-to-r from-crimson/60 to-transparent" />
              <p className="mt-6 text-base leading-relaxed text-ink-soft">
                Sensei Daylami brings decades of S.K.I.F. Shotokan training to
                every class, maintaining strong ties with instructors in Japan to
                ensure our students receive teaching that is true to the tradition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
              Our Instructors
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-ink sm:text-5xl">
              Senior <span className="text-crimson">Instructors</span>
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-crimson to-transparent" />
          </div>

          <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Stephan", rank: "5th Dan", image: "/stephan_1.webp" },
              { name: "Lisa", rank: "5th Dan", image: "/lisa.webp" },
              { name: "Cyril", rank: "3rd Dan", image: "/cyril_1.webp" },
              { name: "Jeff", rank: "2nd Dan", image: "/jeff.webp" },
            ].map((instructor) => (
              <li
                key={instructor.name}
                className="border border-ink/10 bg-white shadow-md"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6 text-center">
                  <div className="font-display text-2xl font-bold uppercase tracking-wider text-ink">
                    {instructor.name}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.3em] text-crimson">
                    {instructor.rank} · S.K.I.F.
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
            What We Teach
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-ink sm:text-5xl">
            The Three Pillars of Training
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-crimson to-transparent" />

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                kanji: "基本",
                romaji: "Kihon",
                desc: "Fundamentals — stances, blocks, strikes, and kicks practiced until they become second nature.",
              },
              {
                kanji: "形",
                romaji: "Kata",
                desc: "Choreographed sequences passing down the techniques and spirit of past masters.",
              },
              {
                kanji: "組手",
                romaji: "Kumite",
                desc: "Sparring — controlled application of technique with a partner, building timing and composure.",
              },
            ].map((p) => (
              <div key={p.romaji} className="border-t-2 border-crimson pt-6">
                <div className="font-display text-4xl text-crimson">
                  {p.kanji}
                </div>
                <div className="mt-2 font-display text-lg font-bold uppercase tracking-widest text-ink">
                  {p.romaji}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/programs"
            className="mt-12 inline-flex items-center rounded-sm bg-crimson px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone shadow-md transition-all hover:bg-crimson-light"
          >
            See Our Programs
          </Link>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
              Affiliated Dojos
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-ink sm:text-5xl">
              Our Extended <span className="text-crimson">Family</span>
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-crimson to-transparent" />
          </div>

          <div className="mx-auto mt-16 max-w-sm">
            <a
              href="https://doshinkaidojo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-ink/10 bg-white shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/ruben.webp"
                  alt="Ruben"
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6 text-center">
                <div className="font-display text-2xl font-bold uppercase tracking-wider text-ink">
                  Ruben
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.3em] text-crimson">
                  6th Dan · S.K.I.F.
                </div>
                <div className="mt-3 text-sm text-ink-soft">
                  Event Director · Shotokan Karate-Do Center
                </div>
                <div className="mx-auto mt-5 h-px w-12 bg-gradient-to-r from-transparent via-crimson to-transparent" />
                <div className="mt-5 font-display text-lg font-bold uppercase tracking-wider text-ink">
                  Doshinkai Dojo
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.25em] text-ink-soft/70">
                  Cincinnati, OH
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-crimson transition-colors group-hover:text-crimson-light">
                  Visit Website →
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <InternationalWelcome
        variant="light"
        eyebrow="Open Doors"
        headlineLead="Beyond Our"
        headlineAccent="Federation"
        body={"Our family extends beyond the dojos we’re directly affiliated with. If you train Shotokan — in any federation, anywhere in the world — you have a place on our floor. Visitors moving to Houston, karatekas passing through, students from other organizations: come train with us. The lineage we share is bigger than any single banner."}
        pillars={["Any Federation", "Any Rank", "Any Background"]}
      />
    </>
  );
}
