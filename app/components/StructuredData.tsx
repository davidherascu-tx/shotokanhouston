import { SITE_NAME, SITE_URL } from "../lib/seo";

/** Stable node ids so every schema on the site refers to the same entities. */
const DOJO_ID = `${SITE_URL}/#dojo`;
const SITE_ID = `${SITE_URL}/#website`;

// Verified against the postal address via OpenStreetMap's geocoder.
const LATITUDE = 29.7533721;
const LONGITUDE = -95.4825878;

const dojo = {
  "@type": ["SportsActivityLocation", "ExerciseGym"],
  "@id": DOJO_ID,
  name: SITE_NAME,
  alternateName: "Shotokan Karate-Do Center",
  description:
    "Traditional Shotokan karate dojo in Houston, Texas — a proud member of the Shotokan Karate International Federation (S.K.I.F.). Classes for kids, youth, and adults inside the Trotter Family YMCA of Greater Houston.",
  url: SITE_URL,
  logo: `${SITE_URL}/shotokan_houston_logo.png`,
  image: [
    `${SITE_URL}/gallery/gallery_27.webp`,
    `${SITE_URL}/about_training.webp`,
    `${SITE_URL}/shotokan_houston_logo.png`,
  ],
  telephone: "+1-832-513-0058",
  email: "shotokankaratedocenter@gmail.com",
  priceRange: "$",
  currenciesAccepted: "USD",
  sport: "Karate",
  slogan: "Respect. Strength. Discipline.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1331 Augusta Dr",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77057",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: LATITUDE,
    longitude: LONGITUDE,
  },
  hasMap: `https://www.openstreetmap.org/?mlat=${LATITUDE}&mlon=${LONGITUDE}#map=17/${LATITUDE}/${LONGITUDE}`,
  areaServed: [
    { "@type": "City", name: "Houston" },
    { "@type": "AdministrativeArea", name: "Harris County, Texas" },
  ],
  memberOf: {
    "@type": "SportsOrganization",
    name: "Shotokan Karate International Federation",
    alternateName: "S.K.I.F.",
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
  // Mirrors the three programs on /programs so search engines can surface them.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Training Programs",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kids Karate",
          description:
            "Shotokan karate for ages 6–11 — discipline, coordination, confidence, and belt progression.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Youth Program",
          description:
            "Shotokan karate for ages 12 and up — advanced kata, conditioning, and controlled kumite.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adult Karate",
          description:
            "Shotokan karate for adults at all levels — traditional karate-do, fitness, and self-defense.",
        },
      },
    ],
  },
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en-US",
  publisher: { "@id": DOJO_ID },
};

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [dojo, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
