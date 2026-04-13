"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SOCIAL, WHATSAPP, SITE } from "@/lib/config";

const NAV_LINKS = [
  { href: "/#origen", label: "El Origen" },
  { href: "/#coleccion", label: "Colección" },
  { href: "/#ritual", label: "El Ritual" },
  { href: "/#visitanos", label: "Visitanos" },
];

const LEGAL_LINKS = [
  { href: "#", label: "Política de Privacidad" },
  { href: "#", label: "Términos y Condiciones" },
  { href: "#", label: "Envíos y Devoluciones" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="py-16 lg:py-20 bg-arena border-t border-rio-oscuro/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <img
                src="/logo.svg"
                alt="RioMates"
                className="w-9 h-9 object-contain"
              />
              <div>
                <span className="font-heading text-lg font-semibold tracking-tight block leading-none text-rio-oscuro">
                  {SITE.name}
                </span>
                <span className="font-body text-[0.55rem] tracking-[0.25em] uppercase text-calabaza mt-1 block">
                  Rosario, Santa Fe
                </span>
              </div>
            </Link>
            <p className="font-body text-sm text-rio-oscuro/50 leading-relaxed max-w-xs">
              {SITE.tagline}
            </p>
          </div>

          {/* Explorar */}
          <div>
            <h4 className="font-heading text-[0.65rem] tracking-widest uppercase text-rio-oscuro/70 font-medium mb-4">
              Explorar
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-rio-oscuro/50 hover:text-calabaza transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-heading text-[0.65rem] tracking-widest uppercase text-rio-oscuro/70 font-medium mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a href={WHATSAPP.catalogUrl} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-rio-oscuro/50 hover:text-calabaza transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:hola@riomates.com.ar" className="font-body text-sm text-rio-oscuro/50 hover:text-calabaza transition-colors">
                  hola@riomates.com.ar
                </a>
              </li>
              <li>
                <a href={SOCIAL.instagram.url} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-rio-oscuro/50 hover:text-calabaza transition-colors">
                  {SOCIAL.instagram.handle}
                </a>
              </li>
              <li>
                <a href={SOCIAL.tiktok.url} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-rio-oscuro/50 hover:text-calabaza transition-colors">
                  {SOCIAL.tiktok.handle}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-[0.65rem] tracking-widest uppercase text-rio-oscuro/70 font-medium mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-sm text-rio-oscuro/50 hover:text-calabaza transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-rio-oscuro/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-rio-oscuro/35">
            {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
          </p>
          <p className="font-serif text-sm italic text-rio-oscuro/30">
            "{SITE.hook}"
          </p>
        </div>
      </div>
    </footer>
  );
}
