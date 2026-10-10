import Image from "next/image";
import Link from "next/link";
import GasshukuCountdown from "./GasshukuCountdown";

export const GASSHUKU_REGISTER_URL = "https://forms.gle/uAkYtjLMUjMnr6Xt8";

export default function GasshukuBanner() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-crimson/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="order-2 lg:order-1">
          <p className="inline-flex items-center gap-3 font-display text-xs uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-10 bg-gold" />
            Once a Year · March 6–7, 2027
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-[1.05] text-bone sm:text-5xl lg:text-6xl">
            Annual SKIF <span className="text-crimson-light">Gasshuku</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-bone/80">
            Train with{" "}
            <strong className="font-semibold text-bone">
              Shuseki Shihan Manabu Murakami (8th Dan)
            </strong>
            , Chief Instructor of SKIF, for a weekend of traditional Karate-Do
            at the Trotter Family YMCA in Houston. Open to all traditional
            styles.
          </p>

          <div className="mt-8">
            <GasshukuCountdown />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={GASSHUKU_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-sm border border-gold/80 bg-crimson px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone shadow-lg transition-all hover:bg-crimson-light"
            >
              Register Now
            </a>
            <Link
              href="/gasshuku"
              className="inline-flex items-center rounded-sm border border-bone/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone transition-all hover:border-gold hover:text-gold"
            >
              Event Details
            </Link>
          </div>
        </div>

        <Link
          href="/gasshuku"
          className="group order-1 mx-auto block w-full max-w-md lg:order-2"
          aria-label="View Annual SKIF Gasshuku details"
        >
          <div className="relative rotate-1 rounded-sm border border-gold/50 bg-parchment p-2 shadow-2xl shadow-black/60 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.02]">
            <Image
              src="/Houston_Gasshuku_2027.webp"
              alt="Annual SKIF Gasshuku poster — March 6–7, 2027, Houston, with Shuseki Shihan Manabu Murakami"
              width={835}
              height={1080}
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="h-auto w-full"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
