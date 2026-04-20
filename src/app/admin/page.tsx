"use client";

import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { normalizeProductImages, resolveProductImage } from "@/lib/product-media";

// ==========================================
// TYPES
// ==========================================

interface ProductRow {
  original_slug?: string;
  slug: string;
  name: string;
  edition: string;
  price: number;
  short_description: string;
  full_description: string;
  story_title: string;
  story: string;
  craft_sections: unknown[];
  ritual_guide: unknown[];
  details: unknown[];
  images: string[];
  whatsapp_message: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface BlogPostRow {
  id: string;
  original_slug?: string;
  slug: string;
  title: string;
  legacy_slugs: string[];
  meta_description: string;
  og_image: string;
  content_html: string;
  published: boolean;
  published_at: string | null;
  created_at?: string;
  updated_at?: string;
}

const emptyProduct = (): ProductRow => ({
  slug: "",
  name: "",
  edition: "",
  price: 0,
  short_description: "",
  full_description: "",
  story_title: "",
  story: "",
  craft_sections: [],
  ritual_guide: [],
  details: [],
  images: [""],
  whatsapp_message: "",
  is_active: true,
});

const emptyBlogPost = (): BlogPostRow => ({
  id: "",
  slug: "",
  title: "",
  legacy_slugs: [],
  meta_description: "",
  og_image: "",
  content_html: "",
  published: false,
  published_at: null,
});

type AdminBootstrap = {
  connected: boolean;
  authenticated: boolean;
  setupRequired: boolean;
  googleEnabled: boolean;
};

// ==========================================
// HELPERS
// ==========================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function readJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

// ==========================================
// ADMIN PAGE WRAPPER
// ==========================================

function AdminPageContent() {
  const [connected, setConnected] = useState(false);
  const [auth, setAuth] = useState<"loading" | "login" | "setup" | "ok">("loading");
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const searchParams = useSearchParams();
  const authError = searchParams.get("error") || "";

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/session", { cache: "no-store" });
      const data = await readJson<AdminBootstrap>(response);

      setConnected(data.connected);
      setGoogleEnabled(Boolean(data.googleEnabled));

      if (!data.connected) {
        setAuth("login");
        return;
      }

      if (data.authenticated) {
        setAuth("ok");
        return;
      }

      setAuth(data.setupRequired ? "setup" : "login");
    } catch {
      setConnected(false);
      setGoogleEnabled(false);
      setAuth("login");
    }
  };

  if (!connected) return <NotConnected />;
  if (auth === "loading") return <LoadingState />;
  if (auth === "login" || auth === "setup") {
    return <AuthScreen mode={auth} onAuth={() => setAuth("ok")} googleEnabled={googleEnabled} errorCode={authError} />;
  }

  return <Dashboard onLogout={() => setAuth("login")} />;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AdminPageContent />
    </Suspense>
  );
}

// ==========================================
// SCREENS
// ==========================================

function NotConnected() {
  return (
    <div className="min-h-screen bg-arena flex items-center justify-center p-6">
      <div className="bg-espuma p-10 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-alpaca/10 max-w-md w-full text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6 text-xl">✕</div>
        <h1 className="font-heading text-xl text-rio-oscuro mb-2">Panel no configurado</h1>
        <p className="font-body text-sm text-rio-oscuro/60 mb-6">Faltan variables privadas del panel en Vercel o en tu entorno local.</p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-arena flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-rio-oscuro/20 border-t-rio-oscuro rounded-full animate-spin" />
    </div>
  );
}

function AuthScreen({
  mode,
  onAuth,
  googleEnabled,
  errorCode,
}: {
  mode: "login" | "setup";
  onAuth: () => void;
  googleEnabled: boolean;
  errorCode: string;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const authBanner =
    errorCode === "google_disabled"
      ? "Google no está configurado en este entorno."
      : errorCode === "oauth_failed"
        ? "No se pudo completar el ingreso con Google."
        : errorCode === "oauth_denied"
          ? "Google rechazó el acceso."
          : errorCode === "oauth" || errorCode === "oauth_error"
            ? "No se pudo iniciar Google."
            : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const result = await readJson<{ error?: string }>(response);

    if (response.ok) {
      onAuth();
    } else {
      setError(result.error || (mode === "setup" ? "Error al configurar" : "Contraseña incorrecta"));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-arena flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-espuma p-10 lg:p-12 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-alpaca/10 w-full max-w-sm"
      >
        <div className="mb-10 text-center">
          <img src="/logo.svg" alt="RioMates" className="w-12 h-12 mx-auto mb-6 opacity-80 invert" />
          <h1 className="font-heading text-xl text-rio-oscuro tracking-tight mb-1">
            {mode === "setup" ? "Bienvenido" : "Acceso Admin"}
          </h1>
          <p className="font-body text-xs text-rio-oscuro/50">
            {mode === "setup" ? "Creá tu contraseña maestra" : "Ingresá al panel de control"}
          </p>
        </div>

        {authBanner ? (
          <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-xs text-amber-900">
            {authBanner}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña..."
              className="w-full bg-arena/30 border border-alpaca/20 rounded-xl px-4 py-3.5 text-rio-oscuro font-mono text-sm placeholder:text-rio-oscuro/30 focus:outline-none focus:border-rio-oscuro focus:bg-espuma transition-all"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 font-body text-xs text-center">{error}</p>}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-rio-oscuro text-espuma font-heading text-xs tracking-widest uppercase py-4 rounded-xl hover:bg-calabaza hover:text-rio-oscuro transition-colors disabled:opacity-50"
          >
            {loading ? "Verificando..." : (mode === "setup" ? "Configurar" : "Ingresar")}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.3em] text-rio-oscuro/30">
          <span className="h-px flex-1 bg-alpaca/20" />
          <span>o</span>
          <span className="h-px flex-1 bg-alpaca/20" />
        </div>

        {googleEnabled ? (
          <a
            href="/api/admin/auth/google"
            className="flex w-full items-center justify-center rounded-xl border border-alpaca/20 bg-white px-4 py-3.5 text-sm font-medium text-rio-oscuro transition-colors hover:border-rio-oscuro hover:bg-rio-oscuro hover:text-white"
          >
            Ingresar con Google
          </a>
        ) : (
          <p className="text-center text-xs leading-relaxed text-rio-oscuro/45">
            Google deshabilitado por configuración.
          </p>
        )}
      </motion.div>
    </div>
  );
}

// ==========================================
// DASHBOARD
// ==========================================

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<"products" | "blog">("products");

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-body text-rio-oscuro selection:bg-calabaza/30">
      {/* Topbar */}
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-alpaca/15">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-rio-oscuro rounded flex items-center justify-center">
                <span className="font-serif text-espuma italic text-lg leading-none">R</span>
              </div>
              <div>
                <h1 className="font-heading text-sm font-semibold tracking-wide">RioMates</h1>
                <p className="text-[0.65rem] text-rio-oscuro/50 tracking-widest uppercase">Admin</p>
              </div>
            </div>
            {/* Tabs */}
            <nav className="flex gap-1 bg-alpaca/5 rounded-xl p-1">
              {(["products", "blog"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2 rounded-lg text-xs font-heading tracking-wider uppercase transition-all ${
                    tab === t
                      ? "bg-rio-oscuro text-espuma"
                      : "text-rio-oscuro/50 hover:text-rio-oscuro"
                  }`}
                >
                  {t === "products" ? "Productos" : "Blog"}
                </button>
              ))}
            </nav>
          </div>
          <button onClick={onLogout} className="text-xs tracking-wider uppercase text-rio-oscuro/40 hover:text-rio-oscuro transition-colors">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
        {tab === "products" ? <ProductsTab /> : <BlogTab />}
      </main>
    </div>
  );
}

// ==========================================
// PRODUCTS TAB
// ==========================================

function ProductsTab() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/products", { cache: "no-store" });
    const payload = await readJson<{ error?: string; products?: ProductRow[] }>(response);

    if (response.ok && payload.products) {
      setProducts(
        payload.products.map((row) => ({
          ...row,
          original_slug: row.slug,
          images: normalizeProductImages(row.images),
        })),
      );
    } else {
      setError(payload.error || "No se pudo cargar el catálogo.");
    }
    setLoading(false);
  };

  useEffect(() => { loadProducts(); }, []);

  const handleEdit = (p: ProductRow) => { setEditing({ ...p, original_slug: p.slug }); setIsDrawerOpen(true); };
  const handleNew = () => { setEditing(emptyProduct()); setIsDrawerOpen(true); };
  const closeDrawer = () => { setIsDrawerOpen(false); setTimeout(() => setEditing(null), 300); };

  const handleSave = async (form: ProductRow) => {
    const slug = form.slug || slugify(form.name);
    const row = {
      ...form,
      slug,
      original_slug: form.original_slug,
      whatsapp_message: form.whatsapp_message || `Hola! Me interesa el mate ${form.name}`,
    };

    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });

    if (!response.ok) {
      const payload = await readJson<{ error?: string }>(response);
      alert(payload.error || "No se pudo guardar la pieza.");
      return;
    }

    await loadProducts();
    closeDrawer();
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("¿Seguro que querés eliminar este producto?")) return;
    const response = await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    if (!response.ok) {
      const payload = await readJson<{ error?: string }>(response);
      alert(payload.error || "No se pudo eliminar la pieza.");
      return;
    }
    await loadProducts();
    closeDrawer();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight mb-2">Tus piezas.</h2>
          <p className="text-sm text-rio-oscuro/60 max-w-md leading-relaxed">
            Gestioná el catálogo de RioMates.
          </p>
        </div>
        <button
          onClick={handleNew}
          className="shrink-0 bg-rio-oscuro text-espuma font-heading text-[0.65rem] tracking-[0.2em] uppercase px-8 py-4 rounded-full hover:bg-calabaza hover:text-rio-oscuro transition-all"
        >
          + Nueva Pieza
        </button>
      </div>

      {error ? (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[4/5] bg-alpaca/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="py-32 text-center border border-dashed border-alpaca/30 rounded-3xl">
          <p className="font-serif text-2xl text-rio-oscuro/40 mb-4">El catálogo está vacío.</p>
        </div>
      ) : (
        <motion.div
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((p) => (
            <motion.div
              key={p.slug}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              onClick={() => handleEdit(p)}
              className="group relative bg-espuma rounded-2xl border border-alpaca/15 overflow-hidden cursor-pointer hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-square bg-[#F5F3ED] relative overflow-hidden p-6 flex items-center justify-center">
                <img src={resolveProductImage(p.images)} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                {!p.is_active && (
                  <div className="absolute top-4 left-4 bg-espuma/90 backdrop-blur text-[0.6rem] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-alpaca/20">
                    Oculto
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-espuma/90 backdrop-blur text-[0.6rem] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-alpaca/20">
                  ${p.price.toLocaleString("es-AR")}
                </div>
              </div>
              <div className="p-6">
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-calabaza mb-2 line-clamp-1">{p.edition}</p>
                <h3 className="font-heading text-lg font-medium leading-tight mb-2">{p.name}</h3>
                <p className="text-xs text-rio-oscuro/50 line-clamp-2 leading-relaxed">{p.short_description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {isDrawerOpen && editing && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-rio-oscuro/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[#FDFBF7] z-50 shadow-2xl flex flex-col border-l border-alpaca/20"
            >
              <ProductDrawerForm
                initialData={editing}
                onClose={closeDrawer}
                onSave={handleSave}
                onDelete={() => handleDelete(editing.slug)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ==========================================
// BLOG TAB
// ==========================================

function BlogTab() {
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPostRow | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/blog-posts", { cache: "no-store" });
    const payload = await readJson<{ error?: string; posts?: BlogPostRow[] }>(response);

    if (response.ok && payload.posts) {
      setPosts(payload.posts.map((p) => ({ ...p, original_slug: p.slug })));
    } else {
      setError(payload.error || "No se pudieron cargar las notas.");
    }
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, []);

  const handleEdit = (p: BlogPostRow) => { setEditing({ ...p, original_slug: p.slug }); setIsDrawerOpen(true); };
  const handleNew = () => { setEditing(emptyBlogPost()); setIsDrawerOpen(true); };
  const closeDrawer = () => { setIsDrawerOpen(false); setTimeout(() => setEditing(null), 300); };

  const handleSave = async (form: BlogPostRow) => {
    const isNew = !form.id || form.id === "";

    const response = await fetch(
      isNew ? "/api/admin/blog-posts" : `/api/admin/blog-posts/${form.original_slug || form.slug}`,
      {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );

    if (!response.ok) {
      const payload = await readJson<{ error?: string }>(response);
      alert(payload.error || "No se pudo guardar la nota.");
      return;
    }

    await loadPosts();
    closeDrawer();
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("¿Seguro que querés eliminar esta nota?")) return;
    const response = await fetch(`/api/admin/blog-posts/${slug}`, { method: "DELETE" });
    if (!response.ok) {
      const payload = await readJson<{ error?: string }>(response);
      alert(payload.error || "No se pudo eliminar la nota.");
      return;
    }
    await loadPosts();
    closeDrawer();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight mb-2">Blog.</h2>
          <p className="text-sm text-rio-oscuro/60 max-w-md leading-relaxed">
            Escribí notas sobre mates, guías y cultura matera.
          </p>
        </div>
        <button
          onClick={handleNew}
          className="shrink-0 bg-rio-oscuro text-espuma font-heading text-[0.65rem] tracking-[0.2em] uppercase px-8 py-4 rounded-full hover:bg-calabaza hover:text-rio-oscuro transition-all"
        >
          + Nueva Nota
        </button>
      </div>

      {error ? (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>
      ) : null}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-alpaca/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="py-32 text-center border border-dashed border-alpaca/30 rounded-3xl">
          <p className="font-serif text-2xl text-rio-oscuro/40 mb-4">No hay notas todavía.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.slug}
              onClick={() => handleEdit(post)}
              className="bg-espuma rounded-2xl border border-alpaca/15 p-6 cursor-pointer hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[0.6rem] font-mono tracking-widest uppercase px-3 py-1 rounded-full border ${
                      post.published
                        ? "bg-yerba/10 border-yerba/30 text-yerba"
                        : "bg-alpaca/10 border-alpaca/30 text-rio-oscuro/40"
                    }`}>
                      {post.published ? "Publicado" : "Borrador"}
                    </span>
                    <span className="text-[0.6rem] text-rio-oscuro/30 font-mono">{post.slug}</span>
                  </div>
                  <h3 className="font-heading text-lg text-rio-oscuro leading-tight truncate">{post.title}</h3>
                  {post.meta_description ? (
                    <p className="text-sm text-rio-oscuro/50 mt-1 line-clamp-1">{post.meta_description}</p>
                  ) : null}
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[0.6rem] text-rio-oscuro/30 font-mono">
                    {post.updated_at ? new Date(post.updated_at).toLocaleDateString("es-AR") : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isDrawerOpen && editing && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-rio-oscuro/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[#FDFBF7] z-50 shadow-2xl flex flex-col border-l border-alpaca/20"
            >
              <BlogDrawerForm
                initialData={editing}
                onClose={closeDrawer}
                onSave={handleSave}
                onDelete={() => handleDelete(editing.slug || editing.original_slug || "")}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ==========================================
// PRODUCT DRAWER FORM
// ==========================================

function ProductDrawerForm({
  initialData,
  onClose,
  onSave,
  onDelete,
}: {
  initialData: ProductRow;
  onClose: () => void;
  onSave: (data: ProductRow) => Promise<void>;
  onDelete: () => void;
}) {
  const [form, setForm] = useState<ProductRow>(initialData);
  const [saving, setSaving] = useState(false);
  const [assets, setAssets] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<"basic" | "story" | "specs" | "media">("basic");

  const update = (field: keyof ProductRow, val: any) => setForm((p) => ({ ...p, [field]: val }));

  useEffect(() => {
    const loadAssets = async () => {
      const response = await fetch("/api/admin/assets", { cache: "no-store" });
      if (!response.ok) return;
      const payload = await readJson<{ assets?: string[] }>(response);
      setAssets(payload.assets ?? []);
    };
    loadAssets();
  }, []);

  const applyAsset = (assetPath: string, index?: number) => {
    const next = [...form.images];
    if (typeof index === "number") {
      next[index] = assetPath;
    } else {
      next.push(assetPath);
    }
    update("images", Array.from(new Set(next.filter(Boolean))));
  };

  const handleSave = async () => {
    if (!form.name || form.price <= 0) return alert("Nombre y precio son obligatorios.");
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const sections = [
    { key: "basic", label: "Básico" },
    { key: "story", label: "Historia" },
    { key: "specs", label: "Specs" },
    { key: "media", label: "Imágenes" },
  ] as const;

  return (
    <>
      <div className="flex-1 overflow-y-auto px-8 py-10 lg:px-12">
        <div className="mb-8">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-rio-oscuro/40 mb-2">
            {form.slug ? form.slug : "Nueva pieza"}
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-rio-oscuro">
            {form.name || "Sin título"}
          </h2>
        </div>

        {/* Section tabs */}
        <div className="flex gap-1 bg-alpaca/5 rounded-xl p-1 mb-8">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`flex-1 px-3 py-2 rounded-lg text-[0.65rem] font-heading tracking-wider uppercase transition-all ${
                activeSection === s.key
                  ? "bg-rio-oscuro text-espuma"
                  : "text-rio-oscuro/50 hover:text-rio-oscuro"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {/* BASIC */}
          {activeSection === "basic" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Nombre">
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} className="input-minimal" placeholder="Ej: Torpedo Crudo" />
                </Field>
                <Field label="Precio ($)">
                  <input type="number" value={form.price || ""} onChange={(e) => update("price", parseInt(e.target.value) || 0)} className="input-minimal font-mono" />
                </Field>
              </div>

              <Field label="Edición / Subtítulo">
                <input value={form.edition} onChange={(e) => update("edition", e.target.value)} className="input-minimal" placeholder="Ej: Cosido al Tiento con Virola al Lacre" />
              </Field>

              <Field label="Descripción Corta (Catálogo)">
                <textarea value={form.short_description} onChange={(e) => update("short_description", e.target.value)} rows={2} className="input-minimal resize-none" />
              </Field>

              <Field label="Descripción Larga (Página de Producto)">
                <textarea value={form.full_description} onChange={(e) => update("full_description", e.target.value)} rows={4} className="input-minimal resize-none" />
              </Field>

              <label className="flex items-center gap-3 cursor-pointer p-4 bg-espuma rounded-xl border border-alpaca/15 hover:border-calabaza/50 transition-colors">
                <div className={`w-10 h-5 rounded-full p-1 transition-colors ${form.is_active ? "bg-yerba" : "bg-alpaca/40"}`}>
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${form.is_active ? "translate-x-5" : "translate-x-0"}`} />
                </div>
                <span className="text-sm">Visible en la tienda</span>
              </label>
            </>
          )}

          {/* STORY */}
          {activeSection === "story" && (
            <>
              <Field label="Título de la Historia">
                <input value={form.story_title} onChange={(e) => update("story_title", e.target.value)} className="input-minimal" placeholder="Ej: De la mano de los artesanos rosarinos" />
              </Field>
              <Field label="Historia / Contenido">
                <textarea value={form.story} onChange={(e) => update("story", e.target.value)} rows={8} className="input-minimal resize-none" placeholder="Escribí la historia o contenido del producto..." />
              </Field>
            </>
          )}

          {/* SPECS */}
          {activeSection === "specs" && (
            <>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Field label="Secciones de Artesanía">
                      <p className="text-[0.65rem] text-rio-oscuro/40">Array de objetos {`{title, text}`}. JSON editable.</p>
                    </Field>
                    <button
                      onClick={() => update("craft_sections", [...(form.craft_sections as any[] || []), { title: "", text: "" }])}
                      className="text-[0.65rem] tracking-widest uppercase text-calabaza hover:text-rio-oscuro transition-colors"
                    >
                      + Agregar
                    </button>
                  </div>
                  {((form.craft_sections as any[]) || []).map((section: any, i: number) => (
                    <div key={i} className="bg-white rounded-xl border border-alpaca/15 p-4 mb-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[0.6rem] text-rio-oscuro/40 font-mono">#{i + 1}</span>
                        <button onClick={() => update("craft_sections", (form.craft_sections as any[]).filter((_: any, idx: number) => idx !== i))} className="text-xs text-red-400 hover:text-red-600">✕</button>
                      </div>
                      <input value={section.title || ""} onChange={(e) => {
                        const next = [...(form.craft_sections as any[])]; next[i] = { ...next[i], title: e.target.value }; update("craft_sections", next);
                      }} className="input-minimal" placeholder="Título" />
                      <textarea value={section.text || ""} onChange={(e) => {
                        const next = [...(form.craft_sections as any[])]; next[i] = { ...next[i], text: e.target.value }; update("craft_sections", next);
                      }} rows={3} className="input-minimal resize-none" placeholder="Texto..." />
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Field label="Guía del Ritual">
                      <p className="text-[0.65rem] text-rio-oscuro/40">Array de pasos. JSON editable.</p>
                    </Field>
                    <button
                      onClick={() => update("ritual_guide", [...(form.ritual_guide as any[] || []), { step: "", description: "" }])}
                      className="text-[0.65rem] tracking-widest uppercase text-calabaza hover:text-rio-oscuro transition-colors"
                    >
                      + Agregar
                    </button>
                  </div>
                  {((form.ritual_guide as any[]) || []).map((step: any, i: number) => (
                    <div key={i} className="bg-white rounded-xl border border-alpaca/15 p-4 mb-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[0.6rem] text-rio-oscuro/40 font-mono">Paso {i + 1}</span>
                        <button onClick={() => update("ritual_guide", (form.ritual_guide as any[]).filter((_: any, idx: number) => idx !== i))} className="text-xs text-red-400 hover:text-red-600">✕</button>
                      </div>
                      <input value={step.step || ""} onChange={(e) => {
                        const next = [...(form.ritual_guide as any[])]; next[i] = { ...next[i], step: e.target.value }; update("ritual_guide", next);
                      }} className="input-minimal" placeholder="Nombre del paso" />
                      <textarea value={step.description || ""} onChange={(e) => {
                        const next = [...(form.ritual_guide as any[])]; next[i] = { ...next[i], description: e.target.value }; update("ritual_guide", next);
                      }} rows={2} className="input-minimal resize-none" placeholder="Descripción..." />
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Field label="Detalles del Producto">
                      <p className="text-[0.65rem] text-rio-oscuro/40">Array de características. JSON editable.</p>
                    </Field>
                    <button
                      onClick={() => update("details", [...(form.details as any[] || []), ""])}
                      className="text-[0.65rem] tracking-widest uppercase text-calabaza hover:text-rio-oscuro transition-colors"
                    >
                      + Agregar
                    </button>
                  </div>
                  {((form.details as any[]) || []).map((detail: string, i: number) => (
                    <div key={i} className="bg-white rounded-xl border border-alpaca/15 p-4 mb-3 flex gap-3 items-center">
                      <input value={detail || ""} onChange={(e) => {
                        const next = [...(form.details as any[])]; next[i] = e.target.value; update("details", next);
                      }} className="input-minimal flex-1" placeholder="Detalle..." />
                      <button onClick={() => update("details", (form.details as any[]).filter((_: any, idx: number) => idx !== i))} className="text-xs text-red-400 hover:text-red-600 shrink-0">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* MEDIA */}
          {activeSection === "media" && (
            <>
              <div className="space-y-3">
                {form.images.map((img, i) => (
                  <div key={i} className="grid gap-3 md:grid-cols-[6rem_1fr_auto] md:items-center">
                    <div className="aspect-square overflow-hidden rounded-xl border border-alpaca/20 bg-white">
                      {img ? (
                        <img src={img} alt={`Preview ${i + 1}`} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[0.6rem] uppercase tracking-[0.2em] text-rio-oscuro/30">Vacía</div>
                      )}
                    </div>
                    <input value={img} onChange={(e) => {
                      const newImgs = [...form.images]; newImgs[i] = e.target.value; update("images", newImgs);
                    }} className="input-minimal flex-1 font-mono text-xs" placeholder="https://... o /images/products/..." />
                    {form.images.length > 1 && (
                      <button onClick={() => update("images", form.images.filter((_, idx) => idx !== i))} className="text-xs text-red-400 hover:text-red-600 px-2">✕</button>
                    )}
                  </div>
                ))}
                <button onClick={() => update("images", [...form.images, ""])} className="text-[0.65rem] tracking-widest uppercase text-calabaza hover:text-rio-oscuro transition-colors mt-2">
                  + Agregar URL
                </button>
              </div>

              {assets.length > 0 && (
                <div className="space-y-4 rounded-2xl border border-alpaca/15 bg-white/60 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.65rem] tracking-[0.2em] uppercase text-rio-oscuro/40 mb-1">Galería local</p>
                      <p className="text-sm text-rio-oscuro/55">Tocá una imagen para sumarla.</p>
                    </div>
                    <button type="button" onClick={() => applyAsset(assets[0]!)} className="text-[0.65rem] tracking-widest uppercase text-calabaza hover:text-rio-oscuro transition-colors">
                      + Usar primera
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                    {assets.map((assetPath) => (
                      <button
                        key={assetPath}
                        type="button"
                        onClick={() => applyAsset(assetPath)}
                        className="group overflow-hidden rounded-2xl border border-alpaca/15 bg-espuma text-left transition-colors hover:border-calabaza/40"
                      >
                        <div className="aspect-square overflow-hidden bg-white">
                          <img src={assetPath} alt={assetPath} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                        </div>
                        <div className="px-3 py-3">
                          <p className="line-clamp-2 text-[0.7rem] leading-relaxed text-rio-oscuro/60">
                            {assetPath.replace("/images/products/", "")}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-espuma border-t border-alpaca/15 px-8 py-5 flex items-center justify-between">
        {form.slug ? (
          <button onClick={onDelete} className="text-xs tracking-wider uppercase text-red-500 hover:text-red-700 transition-colors">
            Eliminar Pieza
          </button>
        ) : <div />}
        <div className="flex gap-4">
          <button onClick={onClose} className="text-xs tracking-wider uppercase text-rio-oscuro/50 hover:text-rio-oscuro transition-colors px-4">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-rio-oscuro text-espuma font-heading text-xs tracking-widest uppercase px-8 py-3.5 rounded-xl hover:bg-calabaza hover:text-rio-oscuro transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .input-minimal {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(168, 178, 184, 0.25);
          border-radius: 12px;
          padding: 12px 16px;
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--color-rio-oscuro);
          outline: none;
          transition: all 0.2s ease;
        }
        .input-minimal:focus {
          border-color: var(--color-rio-oscuro);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .input-minimal::placeholder {
          color: rgba(0, 43, 73, 0.3);
        }
      `}</style>
    </>
  );
}

// ==========================================
// BLOG DRAWER FORM
// ==========================================

function BlogDrawerForm({
  initialData,
  onClose,
  onSave,
  onDelete,
}: {
  initialData: BlogPostRow;
  onClose: () => void;
  onSave: (data: BlogPostRow) => Promise<void>;
  onDelete: () => void;
}) {
  const [form, setForm] = useState<BlogPostRow>(initialData);
  const [saving, setSaving] = useState(false);

  const update = (field: keyof BlogPostRow, val: any) => setForm((p) => ({ ...p, [field]: val }));

  const isNew = !form.id || form.id === "";

  const handleSave = async () => {
    if (!form.title) return alert("El título es obligatorio.");
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-8 py-10 lg:px-12">
        <div className="mb-8">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-rio-oscuro/40 mb-2">
            {isNew ? "Nueva nota" : form.slug}
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-rio-oscuro">
            {form.title || "Sin título"}
          </h2>
        </div>

        <div className="space-y-8">
          <Field label="Título">
            <input
              value={form.title}
              onChange={(e) => {
                update("title", e.target.value);
                if (isNew && !form.slug) {
                  update("slug", slugify(e.target.value));
                }
              }}
              className="input-minimal"
              placeholder="Ej: Cómo curar un mate de calabaza"
            />
          </Field>

          <Field label="Slug (URL)">
            <input
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              className="input-minimal font-mono"
              placeholder="como-curar-mate-calabaza"
            />
          </Field>

          <Field label="Meta descripción (SEO)">
            <textarea
              value={form.meta_description}
              onChange={(e) => update("meta_description", e.target.value)}
              rows={2}
              className="input-minimal resize-none"
              placeholder="Descripción corta para buscadores..."
            />
          </Field>

          <Field label="URL imagen OG">
            <input
              value={form.og_image}
              onChange={(e) => update("og_image", e.target.value)}
              className="input-minimal font-mono"
              placeholder="/images/products/mate-laptop-breakfast.jpeg"
            />
          </Field>

          <Field label="Contenido HTML">
            <textarea
              value={form.content_html}
              onChange={(e) => update("content_html", e.target.value)}
              rows={12}
              className="input-minimal resize-none font-mono text-xs"
              placeholder="<h2>Título</h2>&#10;<p>Contenido...</p>"
            />
            <p className="text-[0.65rem] text-rio-oscuro/40 mt-1">
              HTML directo. Usá etiquetas: h2, p, strong, ul, li, div.
            </p>
          </Field>

          <label className="flex items-center gap-3 cursor-pointer p-4 bg-espuma rounded-xl border border-alpaca/15 hover:border-calabaza/50 transition-colors">
            <div className={`w-10 h-5 rounded-full p-1 transition-colors ${form.published ? "bg-yerba" : "bg-alpaca/40"}`}>
              <div className={`w-3 h-3 bg-white rounded-full transition-transform ${form.published ? "translate-x-5" : "translate-x-0"}`} />
            </div>
            <span className="text-sm">
              {form.published ? "Publicado — visible en el blog público" : "Borrador — no visible"}
            </span>
          </label>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-espuma border-t border-alpaca/15 px-8 py-5 flex items-center justify-between">
        {!isNew && form.slug ? (
          <button onClick={onDelete} className="text-xs tracking-wider uppercase text-red-500 hover:text-red-700 transition-colors">
            Eliminar Nota
          </button>
        ) : <div />}
        <div className="flex gap-4">
          <button onClick={onClose} className="text-xs tracking-wider uppercase text-rio-oscuro/50 hover:text-rio-oscuro transition-colors px-4">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-rio-oscuro text-espuma font-heading text-xs tracking-widest uppercase px-8 py-3.5 rounded-xl hover:bg-calabaza hover:text-rio-oscuro transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .input-minimal {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(168, 178, 184, 0.25);
          border-radius: 12px;
          padding: 12px 16px;
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--color-rio-oscuro);
          outline: none;
          transition: all 0.2s ease;
        }
        .input-minimal:focus {
          border-color: var(--color-rio-oscuro);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .input-minimal::placeholder {
          color: rgba(0, 43, 73, 0.3);
        }
      `}</style>
    </>
  );
}

// ==========================================
// SHARED
// ==========================================

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[0.65rem] tracking-[0.1em] uppercase text-rio-oscuro/60 font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
