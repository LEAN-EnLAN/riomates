import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { isAdminBackendReady, supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

type BlogPostPayload = {
  title?: string;
  slug?: string;
  legacy_slugs?: string[];
  meta_description?: string;
  og_image?: string;
  content_html?: string;
  published?: boolean;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function ensureAdmin() {
  return isAdminBackendReady() && supabaseAdmin && (await hasAdminSession());
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await ensureAdmin()) || !supabaseAdmin) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { slug: currentSlug } = await params;
  const body = (await request.json().catch(() => null)) as BlogPostPayload | null;
  if (!body) {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  // Fetch current row to check if published changed
  const { data: current } = await supabaseAdmin
    .from("blog_posts")
    .select("slug, legacy_slugs, published, published_at")
    .eq("slug", currentSlug)
    .maybeSingle();

  if (!current) {
    return NextResponse.json({ error: "Nota no encontrada." }, { status: 404 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const newSlug = typeof body.slug === "string" && body.slug.trim()
    ? body.slug.trim()
    : slugify(title);

  // Build legacy_slugs: keep existing slug if slug changes
  let legacy_slugs = Array.isArray(body.legacy_slugs) ? body.legacy_slugs : (current.legacy_slugs ?? []);
  if (newSlug !== currentSlug && !legacy_slugs.includes(currentSlug)) {
    legacy_slugs = [...legacy_slugs, currentSlug];
  }

  // Handle published flip
  const wasPublished = current.published === true;
  const nowPublished = body.published === true;
  let published_at = current.published_at;
  if (!wasPublished && nowPublished) {
    published_at = new Date().toISOString();
  } else if (wasPublished && !nowPublished) {
    published_at = null;
  }

  const row = {
    title: title || current.title,
    slug: newSlug,
    legacy_slugs,
    meta_description: typeof body.meta_description === "string" ? body.meta_description.trim() : "",
    og_image: typeof body.og_image === "string" ? body.og_image.trim() : "",
    content_html: typeof body.content_html === "string" ? body.content_html.trim() : "",
    published: nowPublished,
    published_at,
  };

  const { error } = await supabaseAdmin
    .from("blog_posts")
    .update(row)
    .eq("slug", currentSlug);

  if (error) {
    return NextResponse.json({ error: "No se pudo actualizar la nota." }, { status: 500 });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${currentSlug}`);
  if (newSlug !== currentSlug) {
    revalidatePath(`/blog/${newSlug}`);
  }

  return NextResponse.json({ ok: true, post: { ...current, ...row } });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await ensureAdmin()) || !supabaseAdmin) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { slug } = await params;

  const { error } = await supabaseAdmin
    .from("blog_posts")
    .delete()
    .eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: "No se pudo eliminar la nota." }, { status: 500 });
  }

  revalidatePath("/blog");

  return NextResponse.json({ ok: true });
}
