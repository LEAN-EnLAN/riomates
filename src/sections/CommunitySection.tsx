import { Reveal } from "@/components/Reveal";
import { InstagramFeed } from "@/components/InstagramFeed";
import { TikTokFeed } from "@/components/TikTokFeed";
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

export function CommunitySection() {
  return (
    <section id="comunidad" className="section-padding bg-[#f5f3f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <div className="deco-line mx-auto mb-8" />
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rio-oscuro leading-[1.1] mb-6">
              La <em className="italic text-calabaza">comunidad</em>
              <br />
              RioMates
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="font-body text-base text-rio-oscuro/60 leading-relaxed">
              Cada mate cuenta una historia. Seguinos en redes para ver el
              proceso, los rituales y las historias detrás de cada pieza.
            </p>
          </Reveal>
        </div>

        {/* Social feeds side by side */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Instagram */}
          <Reveal>
            <div className="bg-off-white rounded-sm p-8 lg:p-12 text-center">
              <div className="mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mx-auto text-calabaza mb-3"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
                <h3 className="font-serif text-2xl text-rio-oscuro">Instagram</h3>
                <p className="font-body text-sm text-rio-oscuro/50 mt-1">
                  @riomatess
                </p>
              </div>
              <InstagramFeed />
            </div>
          </Reveal>

          {/* TikTok */}
          <Reveal delay={200}>
            <div className="bg-off-white rounded-sm p-8 lg:p-12 text-center">
              <div className="mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mx-auto text-calabaza mb-3"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z" />
                </svg>
                <h3 className="font-serif text-2xl text-rio-oscuro">TikTok</h3>
                <p className="font-body text-sm text-rio-oscuro/50 mt-1">
                  @rio.mates
                </p>
              </div>
              <TikTokFeed />
            </div>
          </Reveal>
        </div>

        {/* Gallery grid with real images */}
        <Reveal>
          <h3 className="font-serif text-2xl md:text-3xl text-rio-oscuro text-center mb-8">
            Las <em className="italic text-calabaza">piezas</em> en detalle
          </h3>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
          {galleryImages.map((img, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="img-zoom aspect-square overflow-hidden rounded-sm bg-[#f5f0e8]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="text-center">
            <p className="font-body text-sm text-rio-oscuro/50 mb-4">
              Compartí tu momento con #MiRioMates
            </p>
            <div className="flex justify-center gap-6">
              <a
                href={SOCIAL.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text"
                style={{ color: "#003459" }}
              >
                {SOCIAL.instagram.handle} →
              </a>
              <a
                href={SOCIAL.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text"
                style={{ color: "#003459" }}
              >
                {SOCIAL.tiktok.handle} →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
