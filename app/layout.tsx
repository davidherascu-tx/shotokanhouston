import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";
import { SITE_NAME, SITE_URL } from "./lib/seo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const DEFAULT_TITLE = `${SITE_NAME} — S.K.I.F. Member Dojo`;
const DEFAULT_DESCRIPTION =
  "Traditional Shotokan karate dojo in Houston, Texas — a proud member of the Shotokan Karate International Federation (S.K.I.F.). Classes for kids, youth, and adults inside the Trotter Family YMCA of Greater Houston.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · Shotokan Karate-Do Center, Houston, TX",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Shotokan karate Houston",
    "karate classes Houston TX",
    "S.K.I.F. Houston",
    "kids karate Houston",
    "martial arts Houston",
    "karate dojo Houston",
    "Trotter YMCA karate",
    "adult karate classes Houston",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Sports",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/shotokan_houston_logo.png",
    apple: "/shotokan_houston_logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#a8201a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} h-full antialiased scroll-smooth`}
    >
      <body
        className="min-h-full flex flex-col bg-parchment text-ink"
        suppressHydrationWarning
      >
        <StructuredData />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
