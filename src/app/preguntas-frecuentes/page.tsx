import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes — Guías del Mate Artesanal | RioMates",
  description:
    "Guía completa: cómo curar un mate de calabaza, limpieza, evitar hongos, temperatura del agua, tipos de mate. Consejos y cultura matera desde Rosario.",
  alternates: {
    canonical: "https://riomates.com.ar/el-ritual",
  },
};

export default function FaqPage() {
  redirect("/el-ritual");
}
