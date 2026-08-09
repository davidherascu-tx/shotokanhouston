import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import PageHero from "../components/PageHero";
import Schedule from "../components/Schedule";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Class Schedule — Weekly Training Times",
  description:
    "Weekly Shotokan karate class schedule at the Trotter Family YMCA of Greater Houston — kids, youth, adults, and kata classes.",
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <>
      <Breadcrumbs name="Class Schedule" path="/schedule" />
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
