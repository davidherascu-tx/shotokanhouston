import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "../components/Breadcrumbs";
import GasshukuCountdown from "../components/GasshukuCountdown";
import { GASSHUKU_REGISTER_URL } from "../components/GasshukuBanner";
import { SITE_NAME, SITE_URL, pageMetadata } from "../lib/seo";

const title = "Annual SKIF Gasshuku 2027 — Houston, March 6–7";
const description =
  "Train with Shuseki Shihan Manabu Murakami (8th Dan), Chief Instructor of SKIF, March 6–7, 2027 at the Trotter Family YMCA in Houston, Texas. Open to all traditional karate styles.";

export const metadata: Metadata = {
  ...pageMetadata({ title, description, path: "/gasshuku" }),
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "Annual SKIF Gasshuku 2027",
  description,
  startDate: "2027-03-06",
  endDate: "2027-03-07",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  sport: "Karate",
  image: [`${SITE_URL}/Houston_Gasshuku_2027.webp`],
  url: `${SITE_URL}/gasshuku`,
  location: {
    "@type": "Place",
    name: "Trotter Family YMCA of Greater Houston",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1331 Augusta Dr",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77057",
      addressCountry: "US",
    },
  },
  performer: {
    "@type": "Person",
    name: "Manabu Murakami",
    jobTitle: "Shuseki Shihan, Chief Instructor of SKIF (8th Dan)",
  },
  organizer: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  offers: {
    "@type": "Offer",
    url: GASSHUKU_REGISTER_URL,
    availability: "https://schema.org/InStock",
  },
};

const details = [
  { label: "Dates", value: "March 6–7, 2027" },
  { label: "Location", value: "Trotter Family YMCA\n1331 Augusta Dr, Houston, TX 77057" },
  { label: "Guest Instructor", value: "Shuseki Shihan Manabu Murakami\n8th Dan · Chief Instructor, SKIF" },
  { label: "Open To", value: "Adults, teens & youth\nAll traditional karate styles" },
];

export default function GasshukuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <Breadcrumbs name="SKIF Gasshuku 2027" path="/gasshuku" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal pb-20 pt-32 lg:pb-28 lg:pt-40">
        <div className="pointer-events-none absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full bg-crimson/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10">
          <div>
            <p className="inline-flex items-center gap-3 font-display text-xs uppercase tracking-[0.4em] text-gold">
              <span className="h-px w-10 bg-gold" />
              Once a Year · Houston, Texas
            </p>
            <h1 className="font-display mt-4 text-5xl font-bold uppercase leading-[1.02] text-bone sm:text-6xl lg:text-7xl">
              Annual SKIF
              <br />
              <span className="text-crimson-light">Gasshuku</span>
            </h1>
            <p className="font-display mt-4 text-2xl uppercase tracking-[0.25em] text-gold sm:text-3xl">
              March 6–7, 2027
            </p>
            <div className="mt-6 h-px w-24 bg-gold" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/85">
              Join us for an unforgettable weekend of traditional Karate-Do
              training, learning, and friendship.
            </p>

            <div className="mt-8 max-w-xl">
              <GasshukuCountdown />
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={GASSHUKU_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-sm border border-gold/80 bg-crimson px-8 py-4 text-sm font-semibold uppercase tracking-widest text-bone shadow-lg shadow-crimson/30 transition-all hover:bg-crimson-light"
              >
                Register Today
              </a>
              <a
                href="mailto:shotokankaratedocenter@gmail.com?subject=SKIF%20Gasshuku%202027"
                className="inline-flex items-center rounded-sm border border-bone/40 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-bone transition-all hover:border-gold hover:text-gold"
              >
                Ask a Question
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rotate-1 rounded-sm border border-gold/50 bg-parchment p-2 shadow-2xl shadow-black/60 transition-transform duration-500 hover:rotate-0">
              <Image
                src="/Houston_Gasshuku_2027.webp"
                alt="Annual SKIF Gasshuku poster — March 6–7, 2027, Houston, with Shuseki Shihan Manabu Murakami"
                width={835}
                height={1080}
                preload
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
              Event Details
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold uppercase text-ink sm:text-4xl">
              Everything You Need to Know
            </h2>
            <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-crimson to-transparent" />
          </div>

          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((d) => (
              <div
                key={d.label}
                className="rounded-sm border border-ink/10 border-t-2 border-t-crimson bg-bone p-6 shadow-sm"
              >
                <dt className="font-display text-xs uppercase tracking-[0.3em] text-crimson">
                  {d.label}
                </dt>
                <dd className="mt-3 whitespace-pre-line text-base font-medium leading-relaxed text-ink">
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* About the instructor */}
      <section className="bg-parchment-dark/60 py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
            Guest Instructor
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold uppercase text-ink sm:text-4xl">
            Shuseki Shihan Manabu Murakami
          </h2>
          <p className="font-display mt-2 text-sm uppercase tracking-[0.3em] text-gold">
            8th Dan · Chief Instructor of SKIF
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-crimson to-transparent" />
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Don&rsquo;t miss this incredible opportunity to train with a
            world-renowned instructor, improve your skills, and connect with
            fellow karateka. Practitioners of all traditional karate styles and
            affiliations are welcome — invite your students and your dojo.
          </p>
        </div>
      </section>

      {/* Register CTA */}
      <section className="relative overflow-hidden bg-crimson-dark py-20 text-center lg:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 stitch-divider opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">
            Secure Your Place
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold uppercase text-bone sm:text-5xl">
            Register Today
          </h2>
          <p className="mt-5 text-lg text-bone/85">
            Come train with us in Houston and celebrate the true spirit of
            Karate-Do. Oss!
          </p>
          <a
            href={GASSHUKU_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-sm border border-gold bg-bone px-9 py-4 text-sm font-semibold uppercase tracking-widest text-crimson-dark shadow-xl transition-all hover:bg-gold hover:text-ink"
          >
            Open Registration Form
          </a>
          <p className="mt-8 text-sm text-bone/80">
            Questions? Contact Rubén Fung at{" "}
            <a href="tel:+18325130058" className="font-semibold text-bone underline-offset-4 hover:underline">
              832-513-0058
            </a>{" "}
            or{" "}
            <a
              href="mailto:shotokankaratedocenter@gmail.com"
              className="font-semibold text-bone underline-offset-4 hover:underline"
            >
              shotokankaratedocenter@gmail.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
