import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Schedule from "../components/Schedule";

const title = "Class Schedule — Weekly Training Times";
const description =
  "Weekly Shotokan karate class schedule at the Trotter Family YMCA of Greater Houston — kids, youth, adults, and kata classes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/schedule" },
  openGraph: { title, description, url: "/schedule" },
  twitter: { card: "summary_large_image", title, description },
};

export default function SchedulePage() {
  return (
    <>
      <PageHero
        eyebrow="Weekly Schedule"
        title="When We Train"
        subtitle="Classes run year-round at the Main and Small Dojos inside the Trotter Family YMCA of Greater Houston."
        image="/training.webp"
      />

      <Schedule />
    </>
  );
}
