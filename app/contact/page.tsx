import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "Contact — Visit the Dojo",
  description:
    "Visit Shotokan Karate Houston at the Trotter Family YMCA of Greater Houston, 1331 Augusta Dr, Houston, TX 77057. Your first class is free.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Visit the Dojo"
        subtitle="We train inside the Trotter Family YMCA of Greater Houston — drop in, observe a class, or book your first free session."
        image="/slider_2.webp"
      />

      <Contact />
    </>
  );
}
