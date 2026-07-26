import { SITE_NAME, SITE_URL } from "../lib/seo";

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "ExerciseGym"],
    name: SITE_NAME,
    alternateName: "Shotokan Karate-Do Center",
    description:
      "Traditional Shotokan karate dojo in Houston, Texas — a proud member of the Shotokan Karate International Federation (S.K.I.F.). Classes for kids, youth, and adults inside the Trotter Family YMCA of Greater Houston.",
    url: SITE_URL,
    image: `${SITE_URL}/shotokan_houston_logo.png`,
    logo: `${SITE_URL}/shotokan_houston_logo.png`,
    telephone: "+1-832-513-0058",
    email: "shotokankaratedocenter@gmail.com",
    priceRange: "$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1331 Augusta Dr",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77057",
      addressCountry: "US",
    },
    sameAs: ["https://www.facebook.com/ShotokanKarateDoCenterHoustonTexas"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
        opens: "17:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Tuesday",
        opens: "17:00",
        closes: "20:15",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Wednesday",
        opens: "17:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Thursday",
        opens: "17:00",
        closes: "20:15",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:30",
        closes: "12:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
