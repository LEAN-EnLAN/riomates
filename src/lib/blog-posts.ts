// Blog posts read helpers — Supabase-first with file fallback.
// Mirrors the products-db.ts pattern: if (!supabase) return staticFallback.

import { supabase } from "@/lib/supabase";
import { SEED_BLOG_POSTS, findSeedPostBySlug, type SeedBlogPost } from "@/data/blog-posts";

export type BlogPostRow = {
  id: string;
  title: string;
  slug: string;
  legacy_slugs: string[];
  meta_description: string;
  og_image: string;
  content_html: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostSummary = Pick<
  BlogPostRow,
  "slug" | "title" | "meta_description" | "og_image" | "published" | "published_at" | "updated_at"
>;

export async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  if (!supabase) {
    return SEED_BLOG_POSTS.filter((p) => p.published).map((p) => ({
      slug: p.slug,
      title: p.title,
      meta_description: p.meta_description,
      og_image: p.og_image,
      published: p.published,
      published_at: null,
      updated_at: new Date().toISOString(),
    }));
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, meta_description, og_image, published, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return SEED_BLOG_POSTS.filter((p) => p.published).map((p) => ({
      slug: p.slug,
      title: p.title,
      meta_description: p.meta_description,
      og_image: p.og_image,
      published: p.published,
      published_at: null,
      updated_at: new Date().toISOString(),
    }));
  }

  return data as BlogPostSummary[];
}

export async function getPostBySlug(slug: string): Promise<BlogPostRow | null> {
  if (!supabase) {
    const seed = findSeedPostBySlug(slug);
    if (!seed) return null;
    return {
      id: "seed",
      title: seed.title,
      slug: seed.slug,
      legacy_slugs: seed.legacy_slugs,
      meta_description: seed.meta_description,
      og_image: seed.og_image,
      content_html: seed.content_html,
      published: seed.published,
      published_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  // Try direct slug match first
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!error && data) return data as BlogPostRow;

  // Try legacy slugs
  const { data: legacyData } = await supabase
    .from("blog_posts")
    .select("*")
    .contains("legacy_slugs", [slug])
    .maybeSingle();

  if (legacyData) return legacyData as BlogPostRow;

  // Fallback to seed
  const seed = findSeedPostBySlug(slug);
  if (!seed) return null;
  return {
    id: "seed",
    title: seed.title,
    slug: seed.slug,
    legacy_slugs: seed.legacy_slugs,
    meta_description: seed.meta_description,
    og_image: seed.og_image,
    content_html: seed.content_html,
    published: seed.published,
    published_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export async function getAdminPosts(): Promise<BlogPostRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as BlogPostRow[];
}
