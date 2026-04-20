import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/products-db";
import { getPublishedPosts } from "@/lib/blog-posts";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, posts] = await Promise.all([getAllSlugs(), getPublishedPosts()]);
  
  const products = slugs.map((slug) => ({
    url: `https://riomates.com.ar/coleccion/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPosts = posts.map((post) => ({
    url: `https://riomates.com.ar/blog/${post.slug}`,
    lastModified: new Date(post.published_at ?? post.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: "https://riomates.com.ar",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://riomates.com.ar/coleccion",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://riomates.com.ar/el-origen",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://riomates.com.ar/guias",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...products,
    ...blogPosts,
  ];
}
