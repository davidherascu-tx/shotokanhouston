import Image from "next/image";
import Link from "next/link";

export default function IntroTeaser() {
  return (
    <section className="bg-paper py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-3 -top-3 hidden h-full w-full border-2 border-crimson/30 lg:block" />
            <div className="relative aspect-[5/4] w-full overflow-hidden bg-charcoal shadow-2xl">
              <Image
                src="/training_1.jpg"
                alt="Karate training at Shotokan Houston"
                fill
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-5 hidden bg-crimson px-5 py-3 text-bone shadow-xl lg:block">
              <div className="font-display text-2xl font-bold leading-none">
                S.K.I.F.
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold">
                Member Dojo
              </div>
            </div>
          </div>

          <div>
            <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
              Welcome to the Dojo
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-ink sm:text-5xl">
              Traditional Shotokan, <span className="text-crimson">Houston Heart</span>
            </h2>
            <div className="stitch-divider mt-6 w-32" />
            <p className="mt-8 text-lg leading-relaxed text-ink-soft">
              Shotokan Karate Houston is a proud member of the{" "}
              <strong className="text-ink">
                Shotokan Karate International Federation (S.K.I.F.)
              </strong>{" "}
              — the worldwide federation founded by <em>Soke</em> Hirokazu
              Kanazawa. We teach karate the way it was meant to be taught: with
              respect for tradition, technical precision, and the spirit of{" "}
              <em>budo</em>.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Located inside the YMCA of Greater Houston, our dojo welcomes
              students of all ages — from a child&apos;s first bow to an
              adult&apos;s pursuit of black belt.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center rounded-sm bg-crimson px-6 py-3 text-sm font-semibold uppercase tracking-widest text-bone shadow-md transition-all hover:bg-crimson-light"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-sm border border-ink/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-ink transition-all hover:border-crimson hover:text-crimson"
              >
                Visit the Dojo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
