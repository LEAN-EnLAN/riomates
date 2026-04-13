import { HeroSection } from "@/sections/HeroSection";
import { OriginSection } from "@/sections/OriginSection";
import { ValuesStrip } from "@/sections/ValuesStrip";
import { CollectionSection } from "@/sections/CollectionSection";
import { RitualSection } from "@/sections/RitualSection";
import { VisitUsSection } from "@/sections/VisitUsSection";
import { SocialShowcase } from "@/sections/SocialShowcase";
import { TestimonialSection } from "@/sections/TestimonialSection";
import { NewsletterSection } from "@/sections/NewsletterSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RioMates — Mates Artesanales de Rosario",
  description:
    "Mates artesanales nacidos donde el Paraná encuentra la tierra. Calabaza curada, alpaca trabajada a mano. Rosario, Santa Fe.",
  openGraph: {
    title: "RioMates — Mates Artesanales de Rosario",
    description:
      "Mates artesanales nacidos donde el Paraná encuentra la tierra.",
    type: "website",
    locale: "es_AR",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <OriginSection />
      <ValuesStrip />
      <CollectionSection />
      <RitualSection />
      <VisitUsSection />
      <SocialShowcase />
      <TestimonialSection />
      <NewsletterSection />
    </>
  );
}
