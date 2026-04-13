import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cómo curar un mate de calabaza: guía paso a paso | RioMates",
  description: "Aprendé a curar tu mate de calabaza con el método tradicional argentino. Pasos simples para que tu calabaza dure años sin rajarse ni amargar.",
  keywords: [
    "cómo curar un mate de calabaza",
    "curar mate nuevo",
    "cura del mate",
    "mate de calabaza cura",
    "preparar mate nuevo",
    "cuánto tiempo curar un mate",
    "cura con yerba usada",
  ],
};

export default function CuralMateArticle() {
  return (
    <>
      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Cómo curar un mate de calabaza: la guía definitiva",
            description: "Guía paso a paso para curar un mate de calabaza con el método tradicional argentino.",
            author: { "@type": "Organization", name: "RioMates", url: "https://riomates.com.ar" },
            publisher: { "@type": "Organization", name: "RioMates", url: "https://riomates.com.ar" },
            datePublished: "2026-04-13",
            dateModified: "2026-04-13",
            mainEntityOfPage: "https://riomates.com.ar/blog/como-curar-mate-calabaza",
          }),
        }}
      />

      {/* Header */}
      <section className="pt-28 lg:pt-36 bg-arena">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/30 hover:text-rio-oscuro/60 transition-colors">Inicio</Link>
            <span className="text-rio-oscuro/20">/</span>
            <Link href="/blog" className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/30 hover:text-rio-oscuro/60 transition-colors">Blog</Link>
            <span className="text-rio-oscuro/20">/</span>
            <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/60">Cómo curar un mate</span>
          </div>

          <div className="mb-12">
            <span className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-calabaza font-semibold mb-4 block">Guía</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rio-oscuro leading-[0.95] mb-6">
              Cómo curar un <em className="italic text-calabaza/90 font-serif">mate de calabaza</em>
            </h1>
            <p className="font-body text-sm text-rio-oscuro/50 leading-relaxed">
              El paso más importante antes de cebar tu primer mate. Si no curás bien tu calabaza, se raja, se amarga o directamente no sirve. Acá te contamos el método que usamos en RioMates.
            </p>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 lg:py-24 bg-arena">
        <div className="max-w-[720px] mx-auto px-6 lg:px-12">

          {/* Step 1 */}
          <div className="mb-12">
            <span className="font-mono text-xs text-calabaza/70 block mb-2">Paso 01</span>
            <h2 className="font-serif text-2xl text-rio-oscuro mb-4">Lavá la calabaza por dentro</h2>
            <p className="font-body text-base text-rio-oscuro/60 leading-relaxed mb-4">
              Antes de empezar la cura, enjuagá el interior de tu mate con agua tibia (no hirviendo). Retirá los restos de pepas y hollejos sueltos que puedan quedar. <strong className="text-rio-oscuro/80">No uses jabón ni detergentes</strong> — la calabaza es porosa y los absorbe.
            </p>
            <p className="font-body text-base text-rio-oscuro/60 leading-relaxed">
              Secalo boca abajo sobre un paño limpio, en un lugar con buena ventilación.
            </p>
          </div>

          {/* Step 2 */}
          <div className="mb-12">
            <span className="font-mono text-xs text-calabaza/70 block mb-2">Paso 02</span>
            <h2 className="font-serif text-2xl text-rio-oscuro mb-4">Llená con yerba usada</h2>
            <p className="font-body text-base text-rio-oscuro/60 leading-relaxed mb-4">
              Colocá yerba mate ya usada (la que ya cebaste) dentro de la calabaza, llenándola aproximadamente tres cuartas partes. La yerba usada funciona como una barrera natural que protege la calabaza y le quita el sabor amargo.
            </p>
            <p className="font-body text-base text-rio-oscuro/60 leading-relaxed">
              Si no tenés yerba usada, podés usar yerba nueva. El resultado es similar, aunque la yerba usada tiene un poder curativo ligeramente mayor porque ya está hidratada.
            </p>
          </div>

          {/* Step 3 */}
          <div className="mb-12">
            <span className="font-mono text-xs text-calabaza/70 block mb-2">Paso 03</span>
            <h2 className="font-serif text-2xl text-rio-oscuro mb-4">Agregá agua caliente</h2>
            <p className="font-body text-base text-rio-oscuro/60 leading-relaxed mb-4">
              Verté agua caliente (no hirviendo, unos 80°C) sobre la yerba hasta llenar la calabaza. El agua no debe estar hirviendo porque el choque térmico puede rajar la calabaza.
            </p>
            <p className="font-body text-base text-rio-oscuro/60 leading-relaxed">
              Dejalo reposar entre <strong className="text-rio-oscuro/80">12 y 24 horas</strong>. Cuanto más tiempo, mejor. Algunos materos lo dejan hasta 48 horas para mates muy grandes.
            </p>
          </div>

          {/* Step 4 */}
          <div className="mb-12">
            <span className="font-mono text-xs text-calabaza/70 block mb-2">Paso 04</span>
            <h2 className="font-serif text-2xl text-rio-oscuro mb-4">Raspá el interior</h2>
            <p className="font-body text-base text-rio-oscuro/60 leading-relaxed mb-4">
              Después del reposo, vaciá la calabaza y raspá suavemente el interior con una cuchara. Vas a notar que la pared interior se ablandó y se oscureció — eso es buena señal, significa que la cura está funcionando.
            </p>
            <p className="font-body text-base text-rio-oscuro/60 leading-relaxed">
              Retirá todos los restos de yerba y enjuagá con agua tibia. Si todavía sentís sabor muy amargo o la calabaza se ve muy clara, repetí el proceso desde el paso 2.
            </p>
          </div>

          {/* Step 5 */}
          <div className="mb-12">
            <span className="font-mono text-xs text-calabaza/70 block mb-2">Paso 05</span>
            <h2 className="font-serif text-2xl text-rio-oscuro mb-4">Secá al aire libre</h2>
            <p className="font-body text-base text-rio-oscuro/60 leading-relaxed mb-4">
              Colocá tu mate curado boca abajo sobre un paño limpio o una rejilla, en un lugar ventilado y preferiblemente al sol. La calabaza necesita secarse completamente para evitar hongos.
            </p>
            <p className="font-body text-base text-rio-oscuro/60 leading-relaxed">
              <strong className="text-rio-oscuro/80">Nunca guardes un mate húmedo.</strong> La humedad genera moho y arruina la calabaza. Si no lo vas a usar por unos días, asegurate de que esté bien seco.
            </p>
          </div>

          {/* Tips box */}
          <div className="bg-calabaza/5 border border-calabaza/20 rounded-xl p-8 mb-12">
            <h3 className="font-serif text-xl text-rio-oscuro mb-4">Consejos de RioMates</h3>
            <ul className="space-y-3 font-body text-sm text-rio-oscuro/60 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-calabaza font-bold shrink-0">✦</span>
                <span>Curá tu mate <strong className="text-rio-oscuro/80">antes</strong> de usarlo por primera vez. Sin cura, la calabaza se raja y el sabor es horrible.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-calabaza font-bold shrink-0">✦</span>
                <span>La primera semana, curalo de nuevo cada vez que lo uses. Después, solo enjuagá con agua tibia.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-calabaza font-bold shrink-0">✦</span>
                <span>Si tu mate tiene virola de metal o cosido al tiento, no lo sumerjas en agua. Solo el interior de la calabaza.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-calabaza font-bold shrink-0">✦</span>
                <span>Un mate bien curado puede durar <strong className="text-rio-oscuro/80">años</strong>. Los mates de RioMates están diseñados para ser compañeros de toda la vida.</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center py-12 border-t border-alpaca/20">
            <h3 className="font-serif text-2xl text-rio-oscuro mb-4">¿Necesitás un mate nuevo?</h3>
            <p className="font-body text-sm text-rio-oscuro/50 mb-8 max-w-md mx-auto">
              Todos nuestros mates vienen con instrucciones de cura incluidas. Elegí el tuyo.
            </p>
            <Link href="/coleccion" className="btn-primary">
              <span>Ver colección</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
