import { CollectionSection } from "@/sections/CollectionSection";
import { getAllProducts } from "@/lib/products-db";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Colección — Mates Artesanales | RioMates",
  description:
    "Cada pieza es única, como el río que le da nombre. Descubrí nuestra colección de mates artesanales de calabaza, alpaca y cuero.",
};

export default async function CollectionPage() {
  const products = await getAllProducts();
  return (
    <>
      {/* Page Header — Clean Editorial */}
      <section className="pt-28 lg:pt-36 bg-arena">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link
              href="/"
              className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/30 hover:text-rio-oscuro/60 transition-colors"
            >
              Inicio
            </Link>
            <span className="text-rio-oscuro/20">/</span>
            <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/60">
              Colección
            </span>
          </div>

          <div className="border-b border-alpaca/20 pb-8 lg:pb-12">
            <h1 className="font-heading text-[0.7rem] tracking-[0.35em] uppercase text-calabaza/70 mb-3">
              Catálogo RioMates
            </h1>
            <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-rio-oscuro leading-[0.95]">
              La <em className="italic text-calabaza/90">Colección</em>
            </p>
            <p className="font-body text-sm text-rio-oscuro/45 leading-relaxed mt-6 max-w-xl">
              {products.length} piezas artesanales. Cada una es única,
              como el río que le da nombre.
            </p>
          </div>
        </div>
      </section>
      <CollectionSection />
    </>
  );
}
