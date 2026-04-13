import { Reveal } from "@/components/Reveal";
import Link from "next/link";

const ORIGIN_IMAGE = "/n-carrousel/05-lifestyle-ritual.png";

export function OriginSection() {
  return (
    <section id="origen" className="section-padding bg-arena texture-leather">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image - left on desktop */}
          <div className="order-2 lg:order-1">
            <Reveal delay={100}>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={ORIGIN_IMAGE}
                    alt="Persona disfrutando mate en la Costanera de Rosario al atardecer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-calabaza/20 -z-10" />
              </div>
            </Reveal>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2 lg:pl-8">
            <Reveal>
              <div className="deco-line mb-6" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-rio-oscuro font-semibold leading-[1.08] tracking-tight mb-8">
                Nacidos donde
                <br />
                el Paraná
                <br />
                encuentra{" "}
                <span className="text-calabaza">la tierra</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-body text-base leading-relaxed text-rio-oscuro/65 mb-5">
                En Rosario, donde el río Paraná dibuja su orilla y el horizonte
                se pierde en el agua, nace cada mate RioMates. No fabricamos en
                serie. No aceleramos el tiempo.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="font-body text-base leading-relaxed text-rio-oscuro/65 mb-8">
                Cada calabaza es seleccionada a mano, cada pieza de alpaca es
                trabajada con paciencia, cada cuero es curtido con dedicación.
                Cada pieza lleva consigo la calma de un atardecer sobre la Costanera.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="flex items-center gap-8 pt-4 border-t border-rio-oscuro/8">
                <div>
                  <p className="font-heading text-3xl font-semibold text-calabaza leading-none">
                    100%
                  </p>
                  <p className="font-body text-[0.65rem] tracking-wider uppercase text-rio-oscuro/40 mt-1">
                    Artesanal
                  </p>
                </div>
                <div className="w-px h-10 bg-rio-oscuro/10" />
                <div>
                  <p className="font-heading text-3xl font-semibold text-calabaza leading-none">
                    Rosario
                  </p>
                  <p className="font-body text-[0.65rem] tracking-wider uppercase text-rio-oscuro/40 mt-1">
                    Santa Fe, AR
                  </p>
                </div>
                <div className="w-px h-10 bg-rio-oscuro/10" />
                <div>
                  <p className="font-heading text-3xl font-semibold text-calabaza leading-none">
                    Hecho
                  </p>
                  <p className="font-body text-[0.65rem] tracking-wider uppercase text-rio-oscuro/40 mt-1">
                    A mano
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={500}>
              <div className="mt-8">
                <Link href="#coleccion" className="btn-ghost">
                  Ver la colección <span className="ml-1">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
