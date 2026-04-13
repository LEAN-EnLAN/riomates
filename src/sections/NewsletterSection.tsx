"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-20 lg:py-28 bg-rio-oscuro text-white">
      <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
        <Reveal>
          <div className="deco-line mx-auto mb-8" />
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight mb-5">
            Unite a la <span className="text-calabaza">orilla</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-body text-base text-white/50 leading-relaxed mb-10">
            Novedades de la colección, guías del ritual y acceso
            anticipado a ediciones limitadas.
          </p>
        </Reveal>

        {!submitted ? (
          <Reveal delay={300}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-0 max-w-md mx-auto"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}
            >
              <input
                type="email"
                placeholder="Tu email"
                className="newsletter-input flex-1 text-center sm:text-left"
                required
                style={{ borderBottom: "none" }}
              />
              <button type="submit" className="newsletter-btn !font-heading !text-[0.6rem] !tracking-wider">
                Suscribirse
              </button>
            </form>
          </Reveal>
        ) : (
          <Reveal delay={150}>
            <div className="mt-8">
              <p className="font-heading text-xl text-calabaza font-medium">
                Bienvenido/a a la orilla
              </p>
              <p className="font-body text-sm text-white/40 mt-2">
                Pronto recibirás nuestras novedades.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={400}>
          <p className="font-body text-xs text-white/30 mt-4">
            Sin spam. Podés darte de baja cuando quieras.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
