import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";
import Welcome from "../components/Welcome";

export const metadata: Metadata = {
  title: "About — S.K.I.F. Tradition in Houston",
  description:
    "Learn about Shotokan Karate Houston, a proud member dojo of the Shotokan Karate International Federation (S.K.I.F.) founded by Soke Hirokazu Kanazawa.",
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
    title: "Shotokan Karate Houston",
    years: "S.K.I.F. Member",
    text: "We carry the lineage forward in Houston — teaching kihon, kata, and kumite with the precision and respect that defines S.K.I.F. Shotokan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Dojo"
        title="Tradition, Discipline, and Lineage"
        subtitle="A proud Shotokan Karate International Federation member dojo in Houston, Texas."
        image="/seiza.jpg"
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
    </>
  );
}
