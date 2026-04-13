"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, isConnected } from "@/lib/supabase";

// ==========================================
// TYPES
// ==========================================

interface ProductRow {
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

// ==========================================
// HELPERS
// ==========================================

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ==========================================
// COMPONENTS
// ==========================================

export default function AdminPage() {
  const [connected, setConnected] = useState(false);
  const [auth, setAuth] = useState<"loading" | "login" | "setup" | "ok">("loading");
  
  useEffect(() => {
    if (isConnected()) {
      setConnected(true);
      checkAuth();
    } else {
      setAuth("login"); // show not connected state later
    }
  }, []);

  const checkAuth = async () => {
    if (localStorage.getItem("riomates_auth") === "1") {
      setAuth("ok");
      return;
    }
    const { data } = await supabase!.from("admin_credentials").select("id").eq("id", 1).single();
    if (!data) setAuth("setup");
    else setAuth("login");
  };

  if (!connected) return <NotConnected />;
  if (auth === "loading") return <LoadingState />;
  if (auth === "login" || auth === "setup") return <AuthScreen mode={auth} onAuth={() => setAuth("ok")} />;
  
  return <Dashboard onLogout={() => { localStorage.removeItem("riomates_auth"); setAuth("login"); }} />;
}

// --- Screens ---

function NotConnected() {
  return (
    <div className="min-h-screen bg-arena flex items-center justify-center p-6">
      <div className="bg-espuma p-10 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-alpaca/10 max-w-md w-full text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6 text-xl">✕</div>
        <h1 className="font-heading text-xl text-rio-oscuro mb-2">Base de datos desconectada</h1>
        <p className="font-body text-sm text-rio-oscuro/60 mb-6">Asegurate de configurar las variables de entorno de Supabase en tu archivo .env.local.</p>
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

function AuthScreen({ mode, onAuth }: { mode: "login" | "setup", onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError("");

    const hash = await sha256(password);

    if (mode === "setup") {
      const { error: err } = await supabase!.from("admin_credentials").upsert({ id: 1, password_hash: hash });
      if (!err) {
        localStorage.setItem("riomates_auth", "1");
        onAuth();
      } else setError("Error al configurar");
    } else {
      const { data } = await supabase!.from("admin_credentials").select("password_hash").eq("id", 1).single();
      if (data?.password_hash === hash) {
        localStorage.setItem("riomates_auth", "1");
        onAuth();
      } else {
        setError("Contraseña incorrecta");
      }
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
      </motion.div>
    </div>
  );
}

// --- Dashboard ---

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await supabase!.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data as ProductRow[]);
    setLoading(false);
  };

  useEffect(() => { loadProducts(); }, []);

  const handleEdit = (p: ProductRow) => { setEditing(p); setIsDrawerOpen(true); };
  const handleNew = () => { setEditing(emptyProduct()); setIsDrawerOpen(true); };
  
  const closeDrawer = () => { setIsDrawerOpen(false); setTimeout(() => setEditing(null), 300); };

  const handleSave = async (form: ProductRow) => {
    const slug = form.slug || slugify(form.name);
    const row = { ...form, slug, whatsapp_message: form.whatsapp_message || `Hola! Me interesa el mate ${form.name}` };
    
    // Check if it's an update (exists in products list)
    const exists = products.some(p => p.slug === slug);
    
    if (exists) {
      await supabase!.from("products").update(row).eq("slug", slug);
    } else {
      await supabase!.from("products").insert(row);
    }
    
    await loadProducts();
    closeDrawer();
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("¿Seguro que querés eliminar este producto?")) return;
    await supabase!.from("products").delete().eq("slug", slug);
    await loadProducts();
    closeDrawer();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-body text-rio-oscuro selection:bg-calabaza/30">
      {/* Topbar */}
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-alpaca/15">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-rio-oscuro rounded flex items-center justify-center">
              <span className="font-serif text-espuma italic text-lg leading-none">R</span>
            </div>
            <div>
              <h1 className="font-heading text-sm font-semibold tracking-wide">Catálogo</h1>
              <p className="text-[0.65rem] text-rio-oscuro/50 tracking-widest uppercase">Admin Panel</p>
            </div>
          </div>
          <button onClick={onLogout} className="text-xs tracking-wider uppercase text-rio-oscuro/40 hover:text-rio-oscuro transition-colors">
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-4xl lg:text-5xl tracking-tight mb-2">Tus piezas.</h2>
            <p className="text-sm text-rio-oscuro/60 max-w-md leading-relaxed">
              Gestioná el catálogo de RioMates. Los cambios se reflejarán inmediatamente en la web.
            </p>
          </div>
          <button 
            onClick={handleNew}
            className="shrink-0 bg-rio-oscuro text-espuma font-heading text-[0.65rem] tracking-[0.2em] uppercase px-8 py-4 rounded-full hover:bg-calabaza hover:text-rio-oscuro transition-all"
          >
            + Nueva Pieza
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
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
                {/* Image Area */}
                <div className="aspect-square bg-[#F5F3ED] relative overflow-hidden p-6 flex items-center justify-center">
                  {p.images[0] ? (
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <span className="text-alpaca text-xs font-mono">Sin imagen</span>
                  )}
                  {!p.is_active && (
                    <div className="absolute top-4 left-4 bg-espuma/90 backdrop-blur text-[0.6rem] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-alpaca/20">
                      Oculto
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-espuma/90 backdrop-blur text-[0.6rem] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-alpaca/20">
                    ${p.price.toLocaleString("es-AR")}
                  </div>
                </div>
                {/* Meta Area */}
                <div className="p-6">
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-calabaza mb-2 line-clamp-1">{p.edition}</p>
                  <h3 className="font-heading text-lg font-medium leading-tight mb-2">{p.name}</h3>
                  <p className="text-xs text-rio-oscuro/50 line-clamp-2 leading-relaxed">{p.short_description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Edit Drawer */}
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
              <DrawerForm 
                initialData={editing} 
                onClose={closeDrawer} 
                onSave={handleSave} 
                onDelete={() => handleDelete(editing.slug)} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Drawer Form ---

function DrawerForm({ 
  initialData, 
  onClose, 
  onSave, 
  onDelete 
}: { 
  initialData: ProductRow; 
  onClose: () => void; 
  onSave: (data: ProductRow) => Promise<void>; 
  onDelete: () => void;
}) {
  const [form, setForm] = useState<ProductRow>(initialData);
  const [saving, setSaving] = useState(false);

  const update = (field: keyof ProductRow, val: any) => setForm(p => ({ ...p, [field]: val }));
  
  const handleSave = async () => {
    if (!form.name || form.price <= 0) return alert("Nombre y precio son obligatorios.");
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-8 py-10 lg:px-12">
        <div className="mb-12">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-rio-oscuro/40 mb-2">
            {form.slug ? form.slug : "Nueva pieza"}
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-rio-oscuro">
            {form.name || "Sin título"}
          </h2>
        </div>

        <div className="space-y-10">
          {/* Basics */}
          <section className="space-y-6">
            <h3 className="font-heading text-sm font-semibold border-b border-alpaca/20 pb-2">Información Principal</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <Field label="Nombre">
                <input value={form.name} onChange={e => update("name", e.target.value)} className="input-minimal" placeholder="Ej: Torpedo Crudo" />
              </Field>
              <Field label="Precio ($)">
                <input type="number" value={form.price || ""} onChange={e => update("price", parseInt(e.target.value)||0)} className="input-minimal font-mono" />
              </Field>
            </div>

            <Field label="Edición / Subtítulo">
              <input value={form.edition} onChange={e => update("edition", e.target.value)} className="input-minimal" placeholder="Ej: Cosido al Tiento con Virola al Lacre" />
            </Field>

            <Field label="Descripción Corta (Catálogo)">
              <textarea value={form.short_description} onChange={e => update("short_description", e.target.value)} rows={2} className="input-minimal resize-none" />
            </Field>

            <Field label="Descripción Larga (Página de Producto)">
              <textarea value={form.full_description} onChange={e => update("full_description", e.target.value)} rows={4} className="input-minimal resize-none" />
            </Field>
          </section>

          {/* Media */}
          <section className="space-y-6">
            <h3 className="font-heading text-sm font-semibold border-b border-alpaca/20 pb-2">Imágenes (URLs)</h3>
            
            {/* AI Prompt Hint Box */}
            <div className="bg-calabaza/5 border border-calabaza/20 rounded-xl p-4 text-[0.65rem] leading-relaxed text-rio-oscuro/70 font-body">
              <span className="font-bold text-calabaza block mb-1">PROMPT SUGERIDO PARA IA:</span>
              <span className="italic">"ahora reemplaza ese mate por este, ese no es criollo este si, gracias, no cambies nada mas, mismo formato, mismo mate duplicado parado y acostado. en este caso tiene base, tener eso en cuenta..."</span>
            </div>

            <div className="space-y-3">
              {form.images.map((img, i) => (
                <div key={i} className="flex gap-3">
                  <input value={img} onChange={e => {
                    const newImgs = [...form.images];
                    newImgs[i] = e.target.value;
                    update("images", newImgs);
                  }} className="input-minimal flex-1 font-mono text-xs" placeholder="https://..." />
                  {form.images.length > 1 && (
                    <button onClick={() => update("images", form.images.filter((_, idx) => idx !== i))} className="text-xs text-red-400 hover:text-red-600 px-2">✕</button>
                  )}
                </div>
              ))}
              <button onClick={() => update("images", [...form.images, ""])} className="text-[0.65rem] tracking-widest uppercase text-calabaza hover:text-rio-oscuro transition-colors mt-2">
                + Agregar URL
              </button>
            </div>
          </section>

          {/* Visibility */}
          <section className="space-y-6">
            <h3 className="font-heading text-sm font-semibold border-b border-alpaca/20 pb-2">Estado</h3>
            <label className="flex items-center gap-3 cursor-pointer p-4 bg-espuma rounded-xl border border-alpaca/15 hover:border-calabaza/50 transition-colors">
              <div className={`w-10 h-5 rounded-full p-1 transition-colors ${form.is_active ? 'bg-yerba' : 'bg-alpaca/40'}`}>
                <div className={`w-3 h-3 bg-white rounded-full transition-transform ${form.is_active ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
              <span className="text-sm">Producto visible en la tienda</span>
            </label>
          </section>
          
          <div className="h-10" />
        </div>
      </div>

      {/* Footer Actions */}
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

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[0.65rem] tracking-[0.1em] uppercase text-rio-oscuro/60 font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
