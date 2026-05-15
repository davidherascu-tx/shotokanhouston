import Link from "next/link";
import HeroSlider from "./components/HeroSlider";
import IntroTeaser from "./components/IntroTeaser";
import Programs from "./components/Programs";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <IntroTeaser />
      <Programs />

      <section className="relative bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
            Begin Your Journey
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-ink sm:text-5xl">
            Your First Class is <span className="text-crimson">Free</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-crimson to-transparent" />
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Come visit the dojo at the YMCA of Greater Houston, meet our
            instructors, and try a class on us. No commitment — just an open
            mind and a willingness to learn.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/schedule"
              className="inline-flex items-center rounded-sm bg-crimson px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone shadow-lg transition-all hover:bg-crimson-light"
            >
              View Class Schedule
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-sm border border-ink/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition-all hover:border-crimson hover:text-crimson"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
