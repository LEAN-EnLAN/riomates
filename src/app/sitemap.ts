import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/products-db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  
  const products = slugs.map((slug) => ({
    url: `https://riomates.com.ar/coleccion/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
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
      url: "https://riomates.com.ar/el-ritual",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...products,
  ];
}
