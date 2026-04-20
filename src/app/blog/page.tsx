import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/blog-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Consejos, Guías y Cultura Matera | RioMates",
  description: "Aprendé a curar tu mate, conocé los distintos tipos de mates artesanales y descubrí la cultura del mate argentino.",
  keywords: ["cómo curar un mate", "tipos de mate artesanal", "guía del mate", "cultura matera argentina"],
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      {/* Header */}
      <section className="pt-28 lg:pt-36 bg-arena">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-8">
            <Link
              href="/"
              className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/30 hover:text-rio-oscuro/60 transition-colors"
            >
              Inicio
            </Link>
            <span className="text-rio-oscuro/20">/</span>
            <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/60">
              Blog
            </span>
          </div>

          <div className="border-b border-alpaca/20 pb-8 lg:pb-12">
            <h1 className="font-heading text-[0.7rem] tracking-[0.35em] uppercase text-calabaza/70 mb-3">
              El Blog de RioMates
            </h1>
            <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-rio-oscuro leading-[0.95]">
              Cultura <em className="italic text-calabaza/90 font-serif">matera</em>
            </p>
            <p className="font-body text-sm text-rio-oscuro/45 leading-relaxed mt-6 max-w-xl">
              Guías, consejos y relatos sobre el mundo del mate artesanal argentino.
            </p>
          </div>
        </div>
      </section>

        {/* Articles */}
      <section className="py-16 lg:py-24 bg-arena">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {posts.length === 0 ? (
            <div className="py-32 text-center border border-dashed border-alpaca/30 rounded-3xl">
              <p className="font-serif text-2xl text-rio-oscuro/40 mb-4">No hay notas publicadas todavía.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-5 bg-rio-oscuro/5">
                    <img
                      src={article.og_image || "/images/products/mate-laptop-breakfast.jpeg"}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="font-heading text-lg tracking-tight text-rio-oscuro mb-2 group-hover:text-calabaza transition-colors leading-snug">
                    {article.title}
                  </h2>
                  {article.meta_description ? (
                    <p className="font-body text-sm text-rio-oscuro/50 leading-relaxed line-clamp-2">
                      {article.meta_description}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
