import { OriginSection } from "@/sections/OriginSection";
import { ValuesStrip } from "@/sections/ValuesStrip";
import { Reveal } from "@/components/Reveal";
import { FOUNDERS, SOCIAL } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "El Origen — Nuestra Historia | RioMates",
  description:
    "Nacidos donde el Paraná encuentra la tierra. Conocé la historia detrás de cada mate artesanal de RioMates, Rosario, Santa Fe.",
};

export default function OriginPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-off-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="deco-line mx-auto mb-8" />
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rio-oscuro leading-[1.1] mb-6">
            El <em className="italic text-calabaza">Origen</em>
          </h1>
          <p className="font-body text-base text-rio-oscuro/60 leading-relaxed max-w-2xl mx-auto">
            Donde el río Paraná dibuja su orilla y el horizonte se pierde en el
            agua, nace cada mate RioMates. Una historia de paciencia, manos y
            naturaleza.
          </p>
        </div>
      </section>
      <OriginSection />
      <ValuesStrip />

      {/* Extended Story */}
      <section className="section-padding bg-off-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-3xl md:text-4xl text-rio-oscuro leading-[1.1] mb-8">
            Nuestro <em className="italic text-calabaza">compromiso</em>
          </h2>
          <p className="font-body text-base leading-relaxed text-rio-oscuro/70 mb-6">
            No fabricamos en serie. No aceleramos el tiempo. Cada calabaza es
            seleccionada a mano, cada pieza de alpaca es trabajada con paciencia,
            cada cuero es curtido con dedicación artesanal.
          </p>
          <p className="font-body text-base leading-relaxed text-rio-oscuro/70 mb-6">
            Creemos que un mate no es solo un objeto. Es un compañero de viaje,
            un testigo de conversaciones, de mañanas tranquilas, de encuentros
            inesperados. Por eso cuidamos cada detalle: la forma de la calabaza,
            el grosor del cuero, el brillo de la alpaca.
          </p>
          <p className="font-body text-base leading-relaxed text-rio-oscuro/70 mb-6">
            Nuestro taller en Rosario es un lugar donde el tiempo se mide de otra
            manera. No por horas, sino por piezas terminadas. No por producción,
            sino por dedicación.
          </p>
          <p className="font-body text-base leading-relaxed text-rio-oscuro/70">
            Cada RioMates lleva consigo la calma de un atardecer sobre la
            Costanera. Y eso no se fabricá. Se siente.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 lg:py-28 bg-[#f5f3f0]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <div className="deco-line mx-auto mb-8" />
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-serif text-3xl md:text-4xl text-rio-oscuro leading-[1.1] mb-4">
              Las <em className="italic text-calabaza">manos</em> detrás
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="font-body text-base text-rio-oscuro/60 mb-12 max-w-xl mx-auto">
              RioMates nació de la pasión de tres amigos rosarinos por el mate artesanal. Cada pieza lleva su dedicación.
            </p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-12">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.handle} delay={450 + i * 100}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-rio-primario/10 flex items-center justify-center mx-auto mb-3">
                    <span className="font-serif text-2xl text-rio-primario italic">
                      {f.name[0]}
                    </span>
                  </div>
                  <p className="font-body text-sm font-medium text-rio-oscuro">
                    {f.name}
                  </p>
                  <p className="font-body text-xs text-rio-oscuro/40">
                    {f.handle}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
