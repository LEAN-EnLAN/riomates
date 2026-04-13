import { getProductBySlug, products } from "@/data/products";
import { notFound } from "next/navigation";
import { WHATSAPP } from "@/lib/config";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado — RioMates",
    };
  }

  return {
    title: `${product.name} — ${product.edition} | RioMates`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} — RioMates`,
      description: product.shortDescription,
    },
  };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-AR")}`;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const whatsappUrl = `https://wa.me/543410000000?text=${encodeURIComponent(product.whatsappMessage)}`;

  return (
    <>
      {/* Breadcrumb + Product Header */}
      <section className="pt-24 lg:pt-28 bg-arena">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 lg:mb-12">
            <Link
              href="/"
              className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/30 hover:text-rio-oscuro/60 transition-colors"
            >
              Inicio
            </Link>
            <span className="text-rio-oscuro/20">/</span>
            <Link
              href="/coleccion"
              className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/30 hover:text-rio-oscuro/60 transition-colors"
            >
              Colección
            </Link>
            <span className="text-rio-oscuro/20">/</span>
            <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/60">
              {product.name}
            </span>
          </div>

          {/* Product Layout — Editorial Grid */}
          <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-20">
            {/* Large Image */}
            <div className="aspect-[4/5] lg:aspect-[5/4] overflow-hidden bg-rio-oscuro/5">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Product Details Column */}
            <div className="lg:pt-8">
              <div className="mb-6">
                <p className="font-heading text-[0.65rem] tracking-[0.35em] uppercase text-calabaza/70 mb-3">
                  {product.edition}
                </p>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-[0.05em] uppercase text-rio-oscuro leading-tight mb-6">
                  {product.name}
                </h1>
                <p className="font-heading text-2xl md:text-3xl text-rio-oscuro/80 tracking-tight mb-8">
                  {formatPrice(product.price)}
                </p>
                <p className="font-body text-sm text-rio-oscuro/55 leading-relaxed mb-10">
                  {product.shortDescription}
                </p>
              </div>

              {/* Quick Info */}
              <div className="border-t border-alpaca/20 pt-6 mb-10">
                <div className="grid grid-cols-2 gap-4">
                  {product.details.slice(0, 4).map((d) => (
                    <div key={d.label}>
                      <p className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-rio-oscuro/30 mb-1">
                        {d.label}
                      </p>
                      <p className="font-body text-sm text-rio-oscuro/70">
                        {d.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center justify-center"
                >
                  <span>Consultar Disponibilidad</span>
                </a>
                <Link
                  href="/coleccion"
                  className="text-center font-body text-xs tracking-widest uppercase text-rio-oscuro/40 hover:text-rio-oscuro/70 transition-colors py-2"
                >
                  Volver a la colección
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 bg-arena">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-20">
            {/* Story Label */}
            <div>
              <p className="font-heading text-[0.6rem] tracking-[0.35em] uppercase text-calabaza/70 mb-4">
                La Historia
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-rio-oscuro leading-tight">
                {product.storyTitle}
              </h2>
            </div>
            {/* Story Text */}
            <div className="space-y-5">
              {product.story.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="font-body text-sm md:text-base text-rio-oscuro/55 leading-relaxed max-w-[60ch]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craft Details */}
      <section className="py-20 lg:py-28 bg-rio-oscuro text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-12 lg:mb-16">
            <p className="font-heading text-[0.6rem] tracking-[0.35em] uppercase text-calabaza/70 mb-4">
              Artesanado
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-white leading-tight">
              Cada detalle cuenta
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {product.craftSections.map((section, i) => (
              <div
                key={section.title}
                className="border-t border-alpaca/15 pt-6"
              >
                <p className="font-heading text-[0.6rem] tracking-[0.2em] uppercase text-calabaza/50 mb-1">
                  Paso {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-lg md:text-xl text-white mb-3">
                  {section.title}
                </h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual Guide */}
      <section className="py-20 lg:py-28 bg-arena">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-12 lg:mb-16">
            <p className="font-heading text-[0.6rem] tracking-[0.35em] uppercase text-calabaza/70 mb-4">
              El Ritual
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-rio-oscuro leading-tight">
              Cómo disfrutarlo
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {product.ritualGuide.map((step) => (
              <div
                key={step.step}
                className="border border-alpaca/15 rounded-lg p-8 bg-espuma"
              >
                <p className="font-serif text-4xl text-calabaza/30 italic mb-4">
                  {step.step}
                </p>
                <h4 className="font-heading text-[0.75rem] tracking-[0.15em] uppercase text-rio-oscuro mb-3">
                  {step.title}
                </h4>
                <p className="font-body text-sm text-rio-oscuro/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Details Table */}
      <section className="py-20 lg:py-28 bg-arena">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <p className="font-heading text-[0.6rem] tracking-[0.35em] uppercase text-calabaza/70 mb-4">
              Ficha Técnica
            </p>
            <h2 className="font-serif text-2xl text-rio-oscuro">Detalles</h2>
          </div>
          <div className="space-y-0">
            {product.details.map((detail) => (
              <div
                key={detail.label}
                className="flex justify-between items-center py-4 border-b border-alpaca/15"
              >
                <span className="font-body text-xs tracking-[0.1em] uppercase text-rio-oscuro/40">
                  {detail.label}
                </span>
                <span className="font-body text-sm text-rio-oscuro/70 text-right max-w-[60%]">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-rio-oscuro text-white">
        <div className="max-w-xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-6">
            ¿Tenés dudas?
          </h2>
          <p className="font-body text-sm text-white/50 leading-relaxed mb-10">
            Hablemos por WhatsApp. Te ayudamos a elegir tu mate perfecto.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-light inline-flex"
          >
            Hablemos por WhatsApp
          </a>
          <p className="font-body text-xs text-white/30 mt-10">
            Envíos: Rosario 24–48hs · Interior del país 5–7 días
          </p>
        </div>
      </section>
    </>
  );
}
