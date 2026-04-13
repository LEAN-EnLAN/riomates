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
  title: `${SITE.name} — Mates Artesanales de Rosario`,
  description: SITE.tagline,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} — Mates Artesanales de Rosario`,
    description: SITE.tagline,
    type: "website",
    locale: "es_AR",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "RioMates — Mates Artesanales de Rosario",
    description: "Mates artesanales nacidos donde el Paraná encuentra la tierra.",
  },
  robots: {
    index: true,
    follow: true,
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
        <div className="loading-overlay" id="loadingOverlay">
          <div className="text-center">
            <img
              src="/images/products/logo-riomates.png"
              alt="RioMates"
              className="w-20 h-20 mx-auto mb-4 opacity-80"
            />
            <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-calabaza/70">
              Rosario, Santa Fe
            </p>
          </div>
        </div>
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
