import { Reveal } from "@/components/Reveal";
import { WHATSAPP } from "@/lib/config";
import Link from "next/link";

const RITUAL_IMAGE = "/n-carrousel/06-artesano-detalle.png";

export function RitualSection() {
  return (
    <section id="ritual" className="section-padding bg-rio-oscuro text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="lg:pr-8">
            <Reveal>
              <div className="deco-line mb-6" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.08] tracking-tight mb-4">
                Cómo cuidar
                <br />
                tu <span className="text-calabaza">mate</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-body text-base leading-relaxed text-white/60 mb-10">
                Un mate bien curado dura años. La cura sella la calabaza, evita
                el amargor y le da carácter. Seguís estos pasos y tu RioMates
                te acompaña siempre.
              </p>
            </Reveal>

            {/* 3 preguntas FAQ */}
            <div className="mb-10">
              {[
                { q: "¿Cuánto tarda en curarse un mate nuevo?", a: "24 horas de reposo con yerba usada + 2 a 3 días de secado al sol. En total, 3-4 días." },
                { q: "¿Se puede lavar el mate con jabón?", a: "No. El jabón penetra la calabaza porosa, contamina el sabor y destruye la cura natural." },
                { q: "¿Cómo evitar hongos en el mate?", a: "Vacialo después de cada uso, secalo boca abajo al sol 30 min diarios. La humedad es el enemigo." },
              ].map((faq, i) => (
                <Reveal key={i} delay={400 + i * 100}>
                  <div className="flex gap-5 items-start mb-5 last:mb-0">
                    <span className="font-heading text-lg text-calabaza/50 leading-none mt-0.5 flex-shrink-0">?</span>
                    <div>
                      <h4 className="font-heading text-sm font-medium tracking-wide uppercase mb-1 text-white/75">
                        {faq.q}
                      </h4>
                      <p className="font-body text-sm text-white/40">{faq.a}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={800}>
              <Link
                href="/el-ritual"
                className="btn-primary-light"
              >
                <span>Guías completas</span>
              </Link>
            </Reveal>
          </div>

          {/* Image */}
          <div className="order-first lg:order-last">
            <Reveal delay={200}>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={RITUAL_IMAGE}
                    alt="Artesano cosiendo tiento en calabaza de mate"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-full h-full border border-calabaza/20 -z-10" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
