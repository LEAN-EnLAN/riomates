import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Envíos y Devoluciones — RioMates",
  description: "Información sobre envíos, tiempos de entrega y política de devoluciones de RioMates. Rosario y todo el país.",
  robots: { index: true, follow: true },
};

export default function EnviosPage() {
  return (
    <section className="pt-28 lg:pt-36 pb-24 bg-arena">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        <Link href="/" className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/30 hover:text-rio-oscuro/60 transition-colors inline-block mb-8">
          ← Inicio
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl text-rio-oscuro leading-[0.95] mb-4">
          Envíos y <em className="italic text-calabaza/90 font-serif">Devoluciones</em>
        </h1>
        <p className="font-body text-sm text-rio-oscuro/40 mb-16">Última actualización: 13 de abril de 2026</p>

        <div className="space-y-12 font-body text-sm text-rio-oscuro/65 leading-relaxed">
          {/* Envíos */}
          <div>
            <h2 className="font-heading text-lg tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-6 pb-3 border-b border-alpaca/20">
              Envíos
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-espuma border border-alpaca/10 rounded-xl p-6">
                <p className="font-heading text-[0.6rem] tracking-[0.2em] uppercase text-calabaza mb-2">Rosario y alrededores</p>
                <p className="text-2xl font-serif text-rio-oscuro mb-1">24 – 48 hs</p>
                <p className="text-xs text-rio-oscuro/40">Entrega personalizada</p>
              </div>
              <div className="bg-espuma border border-alpaca/10 rounded-xl p-6">
                <p className="font-heading text-[0.6rem] tracking-[0.2em] uppercase text-calabaza mb-2">Interior del país</p>
                <p className="text-2xl font-serif text-rio-oscuro mb-1">5 – 7 días</p>
                <p className="text-xs text-rio-oscuro/40">Vía correo o transporte</p>
              </div>
            </div>

            <div className="space-y-4">
              <p><strong className="text-rio-oscuro/80">¿Cómo se envía?</strong> Coordinamos el envío por WhatsApp. Podés retirar en persona en Rosario o te lo enviamos a tu domicilio por correo o transporte de confianza.</p>
              <p><strong className="text-rio-oscuro/80">¿Cuánto cuesta el envío?</strong> El costo varía según destino y peso del paquete. Te lo confirmamos antes de confirmar tu compra. No se cobra ningún cargo sorpresa.</p>
              <p><strong className="text-rio-oscuro/80">¿Empaque?</strong> Cada mate se envía protegido con materiales adecuados para que llegue en perfectas condiciones. El packaging es sobrio y cuidamos cada detalle.</p>
            </div>
          </div>

          {/* Devoluciones */}
          <div>
            <h2 className="font-heading text-lg tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-6 pb-3 border-b border-alpaca/20">
              Devoluciones
            </h2>

            <div className="space-y-4">
              <p>Nuestros productos son artesanales y cada pieza es única. Por esta razón, <strong className="text-rio-oscuro/80">no aceptamos devoluciones por cambio de opinión</strong>. Sin embargo:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Si recibiste un producto <strong className="text-rio-oscuro/80">dañado durante el envío</strong>, contactanos dentro de las 48 horas con fotos del producto y el paquete. Lo reemplazamos sin cargo.</li>
                <li>Si el producto <strong className="text-rio-oscuro/80">no corresponde</strong> al que acordaste por WhatsApp, lo cambiamos o te devolvemos el dinero.</li>
                <li>Para cualquier otra situación, escribinos y lo resolvemos de la mejor manera posible.</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-12 border-t border-alpaca/20">
            <h3 className="font-serif text-2xl text-rio-oscuro mb-4">¿Tenés dudas?</h3>
            <p className="font-body text-sm text-rio-oscuro/50 mb-8 max-w-md mx-auto">
              Escribinos por WhatsApp y te respondemos al toque.
            </p>
            <a
              href="https://wa.me/543410000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Hablar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
