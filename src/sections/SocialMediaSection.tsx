import { Reveal } from "@/components/Reveal";
import { SocialCard } from "@/components/SocialCard";
import { InstagramPreview } from "@/components/InstagramPreview";
import { TikTokPreview } from "@/components/TikTokPreview";
import { SOCIAL } from "@/lib/config";

const galleryImages = [
  {
    src: "/images/products/mate-parana-patas-doradas.jpeg",
    alt: "Mate Paraná con patas doradas y alpaca labrada",
  },
  {
    src: "/images/products/mate-encuentro-top.jpeg",
    alt: "Mate Encuentro vista superior",
  },
  {
    src: "/images/products/mate-atardecer-table.jpeg",
    alt: "Mate Atardecer sobre la mesa",
  },
  {
    src: "/images/products/bombilla-top-view.jpeg",
    alt: "Detalle de bombilla de alpaca trenzada",
  },
  {
    src: "/images/products/mates-madera-duo.jpeg",
    alt: "Dos mates de madera con alpaca decorada",
  },
  {
    src: "/images/products/mate-cuero-oscuro-solo.jpeg",
    alt: "Mate con envolvente de cuero oscuro",
  },
  {
    src: "/images/products/mate-stanley-thermos.jpeg",
    alt: "Mate RioMates con termo Stanley",
  },
  {
    src: "/images/products/mate-laptop-breakfast.jpeg",
    alt: "Mate con desayuno y laptop, ritual diario",
  },
];

export function SocialMediaSection() {
  return (
    <section id="comunidad" className="py-24 lg:py-32 bg-[#f5f3f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16 lg:mb-20">
          <Reveal>
            <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-calabaza mb-4">
              Seguinos
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rio-oscuro leading-[1.05] mb-6 max-w-2xl">
              El proceso,{" "}
              <em className="italic text-calabaza">el ritual</em> y las
              historias
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-base text-zinc-500 leading-relaxed max-w-xl">
              Cada pieza tiene un proceso. Cada proceso tiene una historia.
              Seguinos en redes para ver el trabajo artesanal, los rituales
              diarios y lo que pasa detrás de cada mate.
            </p>
          </Reveal>
        </div>

        {/* Asymmetric social cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 mb-20">
          {/* Instagram - wider card (3 cols) */}
          <div className="md:col-span-3">
            <SocialCard
              platform="instagram"
              handle={SOCIAL.instagram.handle}
              followUrl={SOCIAL.instagram.url}
              featured
            >
              <InstagramPreview />
            </SocialCard>
          </div>

          {/* TikTok - narrower card (2 cols) */}
          <div className="md:col-span-2">
            <SocialCard
              platform="tiktok"
              handle={SOCIAL.tiktok.handle}
              followUrl={SOCIAL.tiktok.url}
            >
              <TikTokPreview />
            </SocialCard>
          </div>
        </div>

        {/* Gallery grid - product detail shots */}
        <div className="mb-16">
          <Reveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-calabaza mb-3">
                  Las piezas
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-rio-oscuro leading-tight">
                  En{" "}
                  <em className="italic text-calabaza">detalle</em>
                </h3>
              </div>
              <div className="hidden md:block w-16 h-px bg-zinc-300" />
            </div>
          </Reveal>

          {/* Asymmetric grid: 4 cols with varied spans */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.map((img, i) => {
              // First image spans 2 cols for visual interest
              const isFeatured = i === 0;
              return (
                <Reveal
                  key={i}
                  delay={i * 60}
                  className={isFeatured ? "md:col-span-2 md:row-span-2" : ""}
                >
                  <div
                    className={`img-zoom overflow-hidden rounded-md bg-zinc-100 group ${
                      isFeatured ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                        isFeatured ? "h-full" : "h-full"
                      }`}
                      loading={i < 4 ? "eager" : "lazy"}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Section footer CTA */}
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-200/60">
            <p className="font-body text-sm text-zinc-400">
              Compartí tu momento con{" "}
              <span className="text-calabaza font-medium">#MiRioMates</span>
            </p>
            <div className="flex items-center gap-6">
              <a
                href={SOCIAL.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[0.7rem] tracking-widest uppercase text-zinc-500 hover:text-rio-oscuro transition-colors duration-300"
              >
                {SOCIAL.instagram.handle}
              </a>
              <span className="w-1 h-1 rounded-full bg-zinc-300" />
              <a
                href={SOCIAL.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[0.7rem] tracking-widest uppercase text-zinc-500 hover:text-rio-oscuro transition-colors duration-300"
              >
                {SOCIAL.tiktok.handle}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
