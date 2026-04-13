import { supabase } from "./supabase";
import { products as staticProducts, type Product } from "@/data/products";

function mapRow(row: Record<string, unknown>): Product {
  return {
    slug: row.slug as string,
    name: row.name as string,
    edition: row.edition as string,
    price: Number(row.price),
    shortDescription: row.short_description as string,
    fullDescription: row.full_description as string,
    storyTitle: (row.story_title as string) || "",
    story: (row.story as string) || "",
    craftSections: (row.craft_sections as Product["craftSections"]) || [],
    ritualGuide: (row.ritual_guide as Product["ritualGuide"]) || [],
    details: (row.details as Product["details"]) || [],
    images: (row.images as string[]) || [],
    whatsappMessage: (row.whatsapp_message as string) || "",
  };
}

export async function getAllProducts(): Promise<Product[]> {
  if (!supabase) return staticProducts;

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) return staticProducts;
    return data.map(mapRow);
  } catch {
    return staticProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!supabase) return staticProducts.find((p) => p.slug === slug);

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !data) return staticProducts.find((p) => p.slug === slug);
    return mapRow(data);
  } catch {
    return staticProducts.find((p) => p.slug === slug);
  }
}

export async function getAllSlugs(): Promise<string[]> {
  if (!supabase) return staticProducts.map((p) => p.slug);

  try {
    const { data } = await supabase
      .from("products")
      .select("slug")
      .eq("is_active", true);

    if (!data || data.length === 0) return staticProducts.map((p) => p.slug);
    return data.map((d) => d.slug as string);
  } catch {
    return staticProducts.map((p) => p.slug);
  }
}
