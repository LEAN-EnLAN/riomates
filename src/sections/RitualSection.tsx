import { Reveal } from "@/components/Reveal";
import { WHATSAPP } from "@/lib/config";

const RITUAL_IMAGE = "/n-carrousel/06-artesano-detalle.png";

const curaSteps = [
  {
    num: "01",
    title: "Lavá la calabaza",
    desc: "Enjuagá con agua tibia (no hirviendo). Sin jabón, sin químicos. Solo agua.",
  },
  {
    num: "02",
    title: "Llená con yerba usada",
    desc: "Completá ⅔ con yerba ya usada. Agregá agua caliente. Dejá reposar 24 horas.",
  },
  {
    num: "03",
    title: "Vaciar y secar",
    desc: "Sacá la yerba, raspá suavemente las paredes interiores. Dejá secar al sol, boca abajo, 2-3 días.",
  },
  {
    num: "04",
    title: "Repetí si es necesario",
    desc: "Si sentís sabor amargo, repetí el proceso. Un buen mate curado dura años.",
  },
];

const limpiezaSteps = [
  {
    num: "✦",
    title: "Después de cada uso",
    desc: "Vaciar la yerba. Enjuagar con agua tibia. Dejar secar al aire, boca abajo, en lugar ventilado.",
  },
  {
    num: "✦",
    title: "Nunca uses jabón",
    desc: "El jabón altera el sabor y daña la cura natural. Solo agua tibia es suficiente.",
  },
  {
    num: "✦",
    title: "Sol y aire",
    desc: "El sol es el mejor aliado. Secá tu mate al sol para evitar hongos y mantener la madera sana.",
  },
];

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

            {/* Cura steps */}
            <div className="mb-10">
              <Reveal delay={300}>
                <p className="font-heading text-[0.65rem] tracking-[0.3em] uppercase text-calabaza/60 mb-5">
                  Cura inicial
                </p>
              </Reveal>
              {curaSteps.map((s, i) => (
                <Reveal key={s.num} delay={400 + i * 100}>
                  <div className="flex gap-5 items-start mb-5 last:mb-0">
                    <span className="font-heading text-xl font-semibold text-calabaza leading-none mt-0.5">
                      {s.num}
                    </span>
                    <div>
                      <h4 className="font-heading text-sm font-medium tracking-wide uppercase mb-1 text-white/85">
                        {s.title}
                      </h4>
                      <p className="font-body text-sm text-white/45">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Limpieza tips */}
            <div className="mb-10">
              <Reveal delay={700}>
                <p className="font-heading text-[0.65rem] tracking-[0.3em] uppercase text-calabaza/60 mb-5">
                  Limpieza diaria
                </p>
              </Reveal>
              {limpiezaSteps.map((s, i) => (
                <Reveal key={s.num} delay={800 + i * 100}>
                  <div className="flex gap-5 items-start mb-4 last:mb-0">
                    <span className="font-heading text-lg text-calabaza/70 leading-none mt-0.5">
                      {s.num}
                    </span>
                    <div>
                      <h4 className="font-heading text-sm font-medium tracking-wide uppercase mb-1 text-white/75">
                        {s.title}
                      </h4>
                      <p className="font-body text-sm text-white/40">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={1000}>
              <a
                href={WHATSAPP.catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-light"
              >
                <span>Consultá por tu mate</span>
              </a>
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
