import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";
import Programs from "../components/Programs";

export const metadata: Metadata = {
  title: "Programs — Kids, Youth & Adult Karate",
  description:
    "Shotokan karate classes for kids, youth, and adults in Houston. Beginner through advanced — taught in the S.K.I.F. tradition.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Training Programs"
        title="Classes for Every Karateka"
        subtitle="From a child's first bow to an adult's pursuit of black belt — programs designed to meet you where you are."
        image="/Image_Adults.jpg"
      />

      <Programs />

      <section className="bg-paper py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
            Ready to Start?
          </p>
          <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-ink sm:text-5xl">
            See When We Train
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-crimson to-transparent" />
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Check the full weekly class schedule and find the right time for
            you or your child.
          </p>
          <Link
            href="/schedule"
            className="mt-10 inline-flex items-center rounded-sm bg-crimson px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone shadow-lg transition-all hover:bg-crimson-light"
          >
            View Full Schedule
          </Link>
        </div>
      </section>
    </>
  );
}
