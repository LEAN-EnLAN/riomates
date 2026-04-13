import { Reveal } from "@/components/Reveal";

const values = [
  { number: "100%", label: "Artesanal" },
  { number: "Rosario", label: "Santa Fe" },
  { number: "Alpaca", label: "Trabajada a Mano" },
  { number: "Cuero", label: "Curtido Natural" },
];

export function ValuesStrip() {
  return (
    <section className="py-14 lg:py-16 bg-rio-oscuro">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {values.map((v, i) => (
            <Reveal key={v.label} delay={i * 100} className="text-center">
              <p className="font-heading text-3xl md:text-4xl font-semibold text-calabaza mb-1.5 leading-none">
                {v.number}
              </p>
              <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-white/40">
                {v.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
