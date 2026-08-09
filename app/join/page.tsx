import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import JoinForm from "../components/JoinForm";
import PageHero from "../components/PageHero";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Join Now — Register for Classes",
  description:
    "Sign up for Shotokan karate classes at Shotokan Karate-Do Center, Houston, TX. Register online for kids, youth, and adult programs — your first class is free.",
  path: "/join",
});

const steps = [
  {
    kanji: "一",
    title: "Register",
    text: "Fill out the form below. It takes about three minutes, and nothing is charged online.",
  },
  {
    kanji: "二",
    title: "We Confirm",
    text: "We'll email or call within 24 hours to confirm your class and answer any questions.",
  },
  {
    kanji: "三",
    title: "Train Free",
    text: "Come to your first class on us. Just wear comfortable clothes — no gi needed yet.",
  },
];

export default function JoinPage() {
  return (
    <>
      <Breadcrumbs name="Join Now" path="/join" />
      <PageHero
        eyebrow="Join the Dojo"
        title="Your First Class is Free"
        subtitle="Register below and step onto the mat — beginners and experienced karateka are equally welcome."
        image="/class_free.webp"
      />

      <section className="bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ol className="grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.title}
                className="border-l-2 border-crimson/60 pl-5"
              >
                <div className="font-display text-3xl text-crimson">
                  {step.kanji}
                </div>
                <div className="mt-2 font-display text-sm font-bold uppercase tracking-widest text-ink">
                  {step.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative bg-charcoal py-20 lg:py-28">
        <div className="absolute inset-0 [background-image:radial-gradient(ellipse_at_top_left,rgba(180,30,30,0.12)_0%,transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.08)_0%,transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">
              Registration
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-bone sm:text-5xl">
              Sign Up to <span className="text-crimson-light">Train</span>
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="mt-6 text-base leading-relaxed text-bone/70">
              We train inside the Trotter Family YMCA of Greater Houston at 1331
              Augusta Dr. Prefer to ask a question first?{" "}
              <a
                href="/contact"
                className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
              >
                Contact us instead
              </a>
              .
            </p>
          </div>

          <div className="mt-14">
            <JoinForm />
          </div>
        </div>
      </section>
    </>
  );
}
