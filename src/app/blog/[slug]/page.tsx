import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/blog-posts";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    return { title: "Nota no encontrada | RioMates" };
  }

  return {
    title: `${post.title} | RioMates`,
    description: post.meta_description,
    openGraph: {
      title: post.title,
      description: post.meta_description,
      images: post.og_image ? [{ url: post.og_image }] : [],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  // Legacy slug redirect
  if (slug !== post.slug && post.legacy_slugs.includes(slug)) {
    redirect(`/blog/${post.slug}`);
  }

  if (!post.published) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description,
    image: post.og_image || undefined,
    author: { "@type": "Organization", name: "RioMates", url: "https://riomates.com.ar" },
    publisher: { "@type": "Organization", name: "RioMates", url: "https://riomates.com.ar" },
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: `https://riomates.com.ar/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="pt-28 lg:pt-36 bg-arena">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/30 hover:text-rio-oscuro/60 transition-colors">Inicio</Link>
            <span className="text-rio-oscuro/20">/</span>
            <Link href="/blog" className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/30 hover:text-rio-oscuro/60 transition-colors">Blog</Link>
            <span className="text-rio-oscuro/20">/</span>
            <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/60">{post.title}</span>
          </div>

          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rio-oscuro leading-[0.95] mb-6">
              {post.title}
            </h1>
            {post.meta_description ? (
              <p className="font-body text-sm text-rio-oscuro/50 leading-relaxed">
                {post.meta_description}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 lg:py-24 bg-arena">
        <div className="max-w-[720px] mx-auto px-6 lg:px-12">
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />

          {/* CTA */}
          <div className="text-center py-12 border-t border-alpaca/20 mt-16">
            <h3 className="font-serif text-2xl text-rio-oscuro mb-4">¿Necesitás un mate nuevo?</h3>
            <p className="font-body text-sm text-rio-oscuro/50 mb-8 max-w-md mx-auto">
              Todos nuestros mates vienen con instrucciones de cura incluidas. Elegí el tuyo.
            </p>
            <Link href="/coleccion" className="btn-primary">
              <span>Ver colección</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
