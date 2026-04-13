import { Reveal } from "@/components/Reveal";

export function TestimonialSection() {
  return (
    <section className="py-20 lg:py-28 bg-arena">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <Reveal>
          <div className="deco-line mx-auto mb-10" />
        </Reveal>
        <Reveal delay={100}>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-rio-oscuro leading-relaxed italic mb-8">
            "No es solo un mate. Es el compañero de mis mañanas, el que me
            recuerda que hay cosas que no necesitan prisa."
          </blockquote>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-heading text-sm tracking-widest uppercase text-calabaza font-medium">
            — Martina L., Rosario
          </p>
        </Reveal>
      </div>
    </section>
  );
}
