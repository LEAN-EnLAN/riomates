import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones — RioMates",
  description: "Términos y condiciones de uso del sitio web y las compras en RioMates.",
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <section className="pt-28 lg:pt-36 pb-24 bg-arena">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        <Link href="/" className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-rio-oscuro/30 hover:text-rio-oscuro/60 transition-colors inline-block mb-8">
          ← Inicio
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl text-rio-oscuro leading-[0.95] mb-4">
          Términos y <em className="italic text-calabaza/90 font-serif">Condiciones</em>
        </h1>
        <p className="font-body text-sm text-rio-oscuro/40 mb-16">Última actualización: 13 de abril de 2026</p>

        <div className="space-y-10 font-body text-sm text-rio-oscuro/65 leading-relaxed">
          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">1. Información general</h2>
            <p>RioMates es un emprendimiento de mates artesanales con sede en Rosario, Santa Fe, Argentina. Este sitio web tiene fines informativos y de venta. Las consultas y compras se gestionan principalmente a través de WhatsApp.</p>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">2. Productos</h2>
            <p className="mb-2">Todos nuestros productos son artesanales y hechos a mano. Esto significa que:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Cada pieza es única. Puede haber variaciones de color, forma y textura entre un mate y otro.</li>
              <li>Las imágenes en el sitio son referenciales. El producto real puede tener ligeras diferencias.</li>
              <li>Los tiempos de elaboración pueden variar según la demanda y la complejidad de la pieza.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">3. Precios y pagos</h2>
            <p className="mb-2">Los precios publicados están expresados en Pesos Argentinos (ARS) e incluyen IVA.</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Los precios pueden ser actualizados sin previo aviso.</li>
              <li>Los métodos de pago se coordinan directamente por WhatsApp (transferencia, efectivo, Mercado Pago).</li>
              <li>El precio se confirma al momento de coordinar la compra, no al momento de visualizar el catálogo.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">4. Envíos</h2>
            <p className="mb-2">Realizamos envíos a todo el país:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-rio-oscuro/80">Rosario:</strong> entrega en 24 a 48 horas.</li>
              <li><strong className="text-rio-oscuro/80">Interior del país:</strong> 5 a 7 días hábiles.</li>
              <li>El costo de envío no está incluido en el precio del producto y se coordina al momento de la compra.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">5. Devoluciones</h2>
            <p>Dado el carácter artesanal y personalizado de nuestros productos, las devoluciones se evalúan caso por caso. Si recibiste un producto dañado o diferente al acordado, contactanos dentro de las 48 horas de recibido el envío.</p>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">6. Propiedad intelectual</h2>
            <p>Todo el contenido de este sitio web (textos, imágenes, logotipos, diseños) es propiedad de RioMates y está protegido por las leyes de propiedad intelectual vigentes en Argentina.</p>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">7. Legislación aplicable</h2>
            <p>Estos términos se rigen por las leyes de la República Argentina. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales de la ciudad de Rosario, Santa Fe.</p>
          </div>

          <div>
            <h2 className="font-heading text-base tracking-[0.1em] uppercase text-rio-oscuro font-medium mb-3">8. Contacto</h2>
            <p>Escribinos por <a href="https://wa.me/543410000000" className="text-calabaza underline">WhatsApp</a> o a <a href="mailto:hola@riomates.com.ar" className="text-calabaza underline">hola@riomates.com.ar</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
