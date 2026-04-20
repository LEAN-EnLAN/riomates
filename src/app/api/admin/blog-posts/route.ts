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

export async function GET() {
  if (!(await ensureAdmin()) || !supabaseAdmin) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "No se pudieron cargar las notas." }, { status: 500 });
  }

  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(request: NextRequest) {
  if (!(await ensureAdmin()) || !supabaseAdmin) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as BlogPostPayload | null;
  if (!body) {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const slug = typeof body.slug === "string" && body.slug.trim()
    ? body.slug.trim()
    : slugify(title);

  if (!title) {
    return NextResponse.json({ error: "El título es obligatorio." }, { status: 400 });
  }

  const row = {
    title,
    slug,
    legacy_slugs: Array.isArray(body.legacy_slugs) ? body.legacy_slugs : [],
    meta_description: typeof body.meta_description === "string" ? body.meta_description.trim() : "",
    og_image: typeof body.og_image === "string" ? body.og_image.trim() : "",
    content_html: typeof body.content_html === "string" ? body.content_html.trim() : "",
    published: body.published === true,
    published_at: body.published === true ? new Date().toISOString() : null,
  };

  const { error } = await supabaseAdmin.from("blog_posts").upsert(row, { onConflict: "slug" });

  if (error) {
    return NextResponse.json({ error: "No se pudo guardar la nota." }, { status: 500 });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return NextResponse.json({ ok: true, post: row });
}
