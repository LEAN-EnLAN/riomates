import { products } from "@/data/products";
import { WHATSAPP } from "@/lib/config";
import Link from "next/link";

const WHATSAPP_BASE = WHATSAPP.baseUrl;

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-AR")}`;
}

export function CollectionSection() {
  return (
    <section id="coleccion" className="section-padding bg-arena">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Category Header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-end justify-between border-b border-alpaca/20 pb-4">
            <div>
              <h2 className="font-heading text-[0.7rem] tracking-[0.35em] uppercase text-rio-oscuro/40 mb-2">
                Catálogo RioMates
              </h2>
              <p className="font-serif text-3xl md:text-4xl text-rio-oscuro leading-tight">
                Mates
              </p>
            </div>
            <p className="font-body text-xs text-rio-oscuro/40 hidden md:block">
              {products.length} piezas artesanales
            </p>
          </div>
        </div>

        {/* Product Grid — Editorial Catalog Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/coleccion/${product.slug}`}
              className="group cursor-pointer"
            >
              {/* Product Image — Catalog style */}
              <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-rio-oscuro/5">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                {/* Subtle overlay on hover — edition only */}
                <div className="absolute inset-0 bg-rio-oscuro/0 group-hover:bg-rio-oscuro/15 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-heading text-xs tracking-widest uppercase text-white/90 drop-shadow-lg">
                    {product.edition}
                  </p>
                </div>
              </div>

              {/* Product Info — Clean catalog style */}
              <div className="px-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-heading text-[0.85rem] tracking-[0.15em] uppercase text-rio-oscuro font-medium leading-snug group-hover:text-calabaza transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="font-heading text-sm font-semibold text-rio-oscuro/80 flex-shrink-0 tracking-tight">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <p className="font-body text-xs text-rio-oscuro/40 leading-relaxed line-clamp-2">
                  {product.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-alpaca/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-body text-sm text-rio-oscuro/50">
            Consultá disponibilidad y envíos por WhatsApp.
          </p>
          <a
            href={WHATSAPP.catalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <span>Colección Completa</span>
          </a>
        </div>
      </div>
    </section>
  );
}
