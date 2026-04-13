import { RitualSection } from "@/sections/RitualSection";
import Link from "next/link";
import { WHATSAPP } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "El Ritual — Guías y Cultura del Mate | RioMates",
  description:
    "El mate no es solo una bebida. Es un acto de presencia. Descubí guías, consejos y cultura del mate artesanal en Rosario.",
};

const blogPosts = [
  {
    slug: "como-curar-mate-calabaza",
    title: "Cómo curar tu mate de calabaza: Guía paso a paso",
    excerpt:
      "La cura es el primer ritual. Sin ella, tu mate no está completo. Aprendé el proceso que prepara la calabaza para acompañarte por años.",
    category: "Guía",
    readTime: "5 min",
  },
  {
    slug: "mananas-costanera-ritual-rosarino",
    title: "Las mañanas en la Costanera: Un ritual rosarino",
    excerpt:
      "Hay algo en el amanecer sobre el Paraná que convierte cada mate en una ceremonia. Crónica de una tradición que nos define.",
    category: "Cultura",
    readTime: "4 min",
  },
  {
    slug: "del-arbol-tus-manos-viaje-del-cuero",
    title: "Del árbol a tus manos: El viaje del cuero",
    excerpt:
      "El cuero de un mate RioMates recorre un camino largo antes de llegar a vos. Conocé el proceso de selección y curtido natural.",
    category: "Artesanado",
    readTime: "6 min",
  },
  {
    slug: "cebado-perfecto-temperatura-yerba",
    title: "El cebado perfecto: Temperatura, yerba y paciencia",
    excerpt:
      "75-80°C. Esa es la temperatura justa. Pero el buen cebado va más allá del termómetro: es actitud.",
    category: "Guía",
    readTime: "3 min",
  },
];

export default function RitualPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-off-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="deco-line mx-auto mb-8" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rio-oscuro leading-[1.1] mb-6">
            El <em className="italic text-calabaza">Ritual</em>
          </h1>
          <p className="font-body text-base text-rio-oscuro/60 leading-relaxed max-w-2xl mx-auto">
            El mate no es solo una bebida. Es un acto de presencia. Es el momento
            en que el tiempo se detiene y todo lo que importa es el agua a la
            temperatura justa, la yerba recién cebada, el compañero al lado.
          </p>
        </div>
      </section>

      <RitualSection />

      {/* Blog Posts */}
      <section className="section-padding bg-off-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="deco-line mb-8" />
          <h2 className="font-serif text-3xl md:text-4xl text-rio-oscuro leading-[1.1] mb-12">
            Guías y <em className="italic text-calabaza">historias</em>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {blogPosts.map((post, i) => (
              <article
                key={post.slug}
                className="group cursor-pointer"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="mb-4">
                  <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-calabaza">
                    {post.category}
                  </span>
                  <span className="font-body text-[0.6rem] text-rio-oscuro/40 ml-3">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-rio-oscuro leading-[1.2] mb-3 group-hover:text-rio-primario transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-rio-oscuro/60 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="btn-text text-xs" style={{ color: "#003459" }}>
                  Leer más →
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-rio-primario text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] mb-6">
            ¿Querés la guía <em className="italic text-calabaza">completa</em>?
          </h2>
          <p className="font-body text-base text-white/60 leading-relaxed mb-10">
            Escribinos por WhatsApp y te enviamos nuestra guía paso a paso para
            curar tu mate.
          </p>
          <a
            href={WHATSAPP.catalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-light"
          >
            Pedí la Guía de Cura
          </a>
        </div>
      </section>
    </>
  );
}
