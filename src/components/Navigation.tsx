"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SOCIAL, WHATSAPP } from "@/lib/config";

const NAV_LINKS = [
  { href: "/#origen", label: "El Origen" },
  { href: "/coleccion", label: "Colección" },
  { href: "/#ritual", label: "El Ritual" },
  { href: "/#visitanos", label: "Visitanos" },
];

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "nav-scrolled" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-50 flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="RioMates"
                className="w-9 h-9 lg:w-10 lg:h-10 object-contain"
              />
              <div className="hidden sm:block">
                <span
                  className={`nav-logo-text font-heading text-lg lg:text-xl font-semibold tracking-tight transition-colors duration-500 block leading-none`}
                  style={{ color: scrolled ? undefined : "#ffffff" }}
                >
                  RioMates
                </span>
                <span
                  className={`nav-subtitle font-body text-[0.55rem] tracking-[0.25em] uppercase transition-colors duration-500`}
                  style={{ color: scrolled ? undefined : "rgba(255,255,255,0.55)" }}
                >
                  Rosario
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${scrolled ? "" : "text-white/85"}`}
                  style={!scrolled ? { color: "rgba(255,255,255,0.85)" } : {}}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href={SOCIAL.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-link ${scrolled ? "" : "text-white/85"}`}
                style={!scrolled ? { color: "rgba(255,255,255,0.85)" } : {}}
              >
                IG
              </a>
              <a
                href={SOCIAL.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-link ${scrolled ? "" : "text-white/85"}`}
                style={!scrolled ? { color: "rgba(255,255,255,0.85)" } : {}}
              >
                TT
              </a>
              <a
                href={WHATSAPP.catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-2.5 !px-5 !text-[0.65rem]"
              >
                <span>Consultar</span>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span
                className={`hamburger-line w-6 h-[1px] transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
                style={{ background: scrolled || menuOpen ? "#1A120B" : "#ffffff" }}
              />
              <span
                className={`hamburger-line w-4 h-[1px] transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
                style={{ background: scrolled || menuOpen ? "#1A120B" : "#ffffff" }}
              />
              <span
                className={`hamburger-line w-6 h-[1px] transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
                style={{ background: scrolled || menuOpen ? "#1A120B" : "#ffffff" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu fixed inset-0 bg-arena z-40 flex flex-col items-center justify-center`}
        style={{ transform: menuOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Mobile logo */}
        <div className="absolute top-8 left-6 flex items-center gap-3">
          <img
            src="/images/products/logo-riomates.svg"
            alt="RioMates"
            className="w-9 h-9 object-contain"
          />
          <div>
            <span className="font-heading text-lg font-semibold tracking-tight block leading-none">
              RioMates
            </span>
            <span className="font-body text-[0.55rem] tracking-[0.25em] uppercase text-calabaza">
              Rosario
            </span>
          </div>
        </div>

        {/* Mobile links */}
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-heading text-3xl tracking-tight text-rio-oscuro mobile-nav-link"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile social */}
        <div className="flex gap-8 mt-16">
          <a href={SOCIAL.instagram.url} target="_blank" rel="noopener noreferrer" className="font-body text-xs tracking-widest uppercase text-calabaza">
            Instagram
          </a>
          <a href={SOCIAL.tiktok.url} target="_blank" rel="noopener noreferrer" className="font-body text-xs tracking-widest uppercase text-calabaza">
            TikTok
          </a>
        </div>

        {/* Mobile CTA */}
        <a
          href={WHATSAPP.catalogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-12"
        >
          <span>Consultar por WhatsApp</span>
        </a>
      </div>
    </>
  );
}
