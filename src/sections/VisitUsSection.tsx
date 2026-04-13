import { Reveal } from "@/components/Reveal";
import { WHATSAPP } from "@/lib/config";

const VISIT_IMAGE = "/n-carrousel/03-atardecer-hero.png";

export function VisitUsSection() {
  return (
    <section id="visitanos" className="section-padding bg-arena texture-wood">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Reveal delay={100}>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={VISIT_IMAGE}
                    alt="Mate artesanal RioMates"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border border-calabaza/15 -z-10" />
              </div>
            </Reveal>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2 lg:pl-4">
            <Reveal>
              <div className="deco-line mb-6" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-rio-oscuro font-semibold leading-[1.08] tracking-tight mb-8">
                Encontranos
                <br />
                en <span className="text-calabaza">Rosario</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-body text-base leading-relaxed text-rio-oscuro/60 mb-10">
                Nada reemplaza sentir la textura de la calabaza, ver cómo la luz
                juega sobre la alpaca labrada. Te esperamos para que conozcas
                las piezas en persona.
              </p>
            </Reveal>

            <div className="space-y-6 mb-10">
              <Reveal delay={300}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-calabaza/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-calabaza" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading text-sm font-medium text-rio-oscuro">
                      San Martín 1234, Rosario Centre
                    </p>
                    <p className="font-body text-sm text-rio-oscuro/45 mt-0.5">
                      Santa Fe, Argentina
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-calabaza/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-calabaza" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading text-sm font-medium text-rio-oscuro">
                      Lunes a Sábado
                    </p>
                    <p className="font-body text-sm text-rio-oscuro/45 mt-0.5">
                      10:00 – 19:00 hs
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={500}>
              <a
                href={WHATSAPP.catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Hablemos</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
