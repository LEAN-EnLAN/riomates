import type { Metadata } from "next";
import { Outfit, Source_Sans_3, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SITE, SOCIAL, LOCATION } from "@/lib/config";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${SITE.name} — Mates Artesanales de Rosario | Tienda Online`,
  description:
    "Mates artesanales nacidos donde el Paraná encuentra la tierra. Calabaza curada, alpaca trabajada a mano, cosido al tiento. Comprá online tu mate artesanal en Rosario, Santa Fe.",
  keywords: [
    "mates artesanales",
    "mate artesanal rosario",
    "mate de calabaza",
    "mate cosido al tiento",
    "mate de alpaca",
    "mates rosario santa fe",
    "comprar mate artesanal online",
    "mate torpedo",
    "mate criollo",
    "bombilla de alpaca",
    "mate premium argentina",
    "regalo artesanal rosario",
  ],
  authors: [{ name: "RioMates", url: "https://riomates.com.ar" }],
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: "https://riomates.com.ar",
  },
  openGraph: {
    title: `${SITE.name} — Mates Artesanales de Rosario`,
    description: SITE.tagline,
    type: "website",
    locale: "es_AR",
    siteName: SITE.name,
    url: "https://riomates.com.ar",
  },
  twitter: {
    card: "summary_large_image",
    title: "RioMates — Mates Artesanales de Rosario",
    description: "Mates artesanales nacidos donde el Paraná encuentra la tierra.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${sourceSans.variable} ${cormorant.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="canonical" href="https://riomates.com.ar" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: SITE.name,
              description: SITE.tagline,
              url: SITE.url,
              telephone: "+543410000000",
              address: {
                "@type": "PostalAddress",
                streetAddress: LOCATION.address,
                addressLocality: LOCATION.city,
                addressRegion: LOCATION.region,
                postalCode: LOCATION.postalCode,
                addressCountry: "AR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: LOCATION.lat,
                longitude: LOCATION.lng,
              },
              openingHours: ["Mo-Sa 10:00-19:00"],
              priceRange: "$$$",
              sameAs: [
                SOCIAL.instagram.url,
                SOCIAL.tiktok.url,
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <LoadingScreen />
        <div className="grain-overlay" />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
