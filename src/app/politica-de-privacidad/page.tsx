import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — RioMates",
  description: "Política de privacidad y protección de datos personales de RioMates. Cómo manejamos tu información.",
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <section className="pt-28 lg:pt-36 pb-24 bg-arena">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        <Link href="/" className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/30 hover:text-rio-oscuro/60 transition-colors inline-block mb-8">
          ← Inicio
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl text-rio-oscuro leading-[0.95] mb-4">
          Política de <em className="italic text-calabaza/90 font-serif">Privacidad</em>
        </h1>
        <p className="font-body text-sm text-rio-oscuro/40 mb-16">Última actualización: 13 de abril de 2026</p>

        <div className="space-y-10 font-body text-sm text-rio-oscuro/65 leading-relaxed">
          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">1. Responsable del tratamiento</h2>
            <p>RioMates, con domicilio en Rosario, Santa Fe, Argentina, es responsable del tratamiento de los datos personales que nos proporciones a través de este sitio web, WhatsApp u otros canales de contacto.</p>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">2. Datos que recopilamos</h2>
            <p className="mb-2">Recopilamos únicamente los datos necesarios para brindarte nuestro servicio:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Nombre y datos de contacto (teléfono, email) cuando nos escribís por WhatsApp.</li>
              <li>Dirección de envío para coordinar la entrega de tu pedido.</li>
              <li>Datos de navegación anónimos a través de cookies técnicas.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">3. Finalidad del tratamiento</h2>
            <p>Utilizamos tus datos para:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Procesar y gestionar tu pedido de mates artesanales.</li>
              <li>Coordinar envíos y entregas.</li>
              <li>Responder consultas y brindar atención al cliente.</li>
              <li>Enviar novedades y promociones solo si nos diste tu consentimiento.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">4. Protección de datos</h2>
            <p>Implementamos medidas de seguridad adecuadas para proteger tus datos contra acceso no autorizado, alteración, divulgación o destrucción. No vendemos ni compartimos tu información con terceros.</p>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">5. Tus derechos</h2>
            <p>De acuerdo con la Ley 25.326 de Protección de Datos Personales de Argentina, tenés derecho a acceder, rectificar y cancelar tus datos personales. Podés ejercer estos derechos escribiéndonos a <strong className="text-rio-oscuro">hola@riomates.com.ar</strong>.</p>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">6. Contacto</h2>
            <p>Para cualquier consulta sobre esta política, escribinos por <a href="https://wa.me/543410000000" className="text-calabaza underline">WhatsApp</a> o a <a href="mailto:hola@riomates.com.ar" className="text-calabaza underline">hola@riomates.com.ar</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
