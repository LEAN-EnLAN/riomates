// Fallback seed data for blog posts — used when Supabase is unavailable or DB is empty.
// These match the currently live blog content and slug.

export type SeedBlogPost = {
  slug: string;
  title: string;
  meta_description: string;
  og_image: string;
  content_html: string;
  published: boolean;
  legacy_slugs: string[];
};

export const SEED_BLOG_POSTS: SeedBlogPost[] = [
  {
    slug: "como-curar-mate-calabaza",
    title: "Cómo curar un mate de calabaza: la guía definitiva",
    meta_description:
      "El paso más importante antes de cebar tu primer mate. Te enseñamos el método tradicional para que tu calabaza dure años.",
    og_image: "/images/products/mate-laptop-breakfast.jpeg",
    content_html: `
      <p>El paso más importante antes de cebar tu primer mate. Si no curás bien tu calabaza, se raja, se amarga o directamente no sirve. Acá te contamos el método que usamos en RioMates.</p>
      <h2>Paso 1: Lavá la calabaza por dentro</h2>
      <p>Antes de empezar la cura, enjuagá el interior de tu mate con agua tibia (no hirviendo). Retirá los restos de pepas y hollejos sueltos que puedan quedar. <strong>No uses jabón ni detergentes</strong> — la calabaza es porosa y los absorbe. Secalo boca abajo sobre un paño limpio, en un lugar con buena ventilación.</p>
      <h2>Paso 2: Llená con yerba usada</h2>
      <p>Colocá yerba mate ya usada dentro de la calabaza, llenándola aproximadamente tres cuartas partes. La yerba usada funciona como una barrera natural que protege la calabaza y le quita el sabor amargo.</p>
      <h2>Paso 3: Agregá agua caliente</h2>
      <p>Verté agua caliente (no hirviendo, unos 80°C) sobre la yerba hasta llenar la calabaza. Dejalo reposar entre <strong>12 y 24 horas</strong>.</p>
      <h2>Paso 4: Raspá el interior</h2>
      <p>Después del reposo, vaciá la calabaza y raspá suavemente el interior con una cuchara. Retirá todos los restos de yerba y enjuagá con agua tibia. Si todavía sentís sabor muy amargo, repetí el proceso.</p>
      <h2>Paso 5: Secá al aire libre</h2>
      <p>Colocá tu mate curado boca abajo sobre un paño limpio o una rejilla, en un lugar ventilado y preferiblemente al sol. <strong>Nunca guardes un mate húmedo.</strong></p>
      <div class="bg-calabaza/5 border border-calabaza/20 rounded-xl p-8">
        <h3>Consejos de RioMates</h3>
        <ul>
          <li>Curá tu mate <strong>antes</strong> de usarlo por primera vez.</li>
          <li>La primera semana, curalo de nuevo cada vez que lo uses.</li>
          <li>Si tiene virola de metal o cosido al tiento, no lo sumerjas en agua. Solo el interior.</li>
          <li>Un mate bien curado puede durar <strong>años</strong>.</li>
        </ul>
      </div>
    `,
    published: true,
    legacy_slugs: [],
  },
];

export function findSeedPostBySlug(slug: string): SeedBlogPost | undefined {
  return SEED_BLOG_POSTS.find(
    (p) =>
      p.slug === slug ||
      p.legacy_slugs.includes(slug),
  );
}
