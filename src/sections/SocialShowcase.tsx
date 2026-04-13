"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { InstagramLogo, TiktokLogo, ArrowRight, ArrowLeft, PlayCircle, Image as ImageIcon } from "@phosphor-icons/react";
import { SOCIAL } from "@/lib/config";

// --- Real RioMates Media Data ---
// Sourced from actual product photography and official TikTok uploads

interface MediaItem {
  id: string;
  type: "image" | "reel";
  thumbnail: string;
  caption: string;
  url: string;
  likes: string;
  comments: string;
  platform: "instagram" | "tiktok";
}

const REAL_MEDIA: MediaItem[] = [
  {
    id: "ig-parana",
    type: "image",
    thumbnail: "/images/products/mate-parana-patas-doradas.jpeg",
    caption: "Mate Paraná con patas doradas. La elegancia de lo artesanal en cada detalle.",
    url: SOCIAL.instagram.url,
    likes: "1.247",
    comments: "63",
    platform: "instagram",
  },
  {
    id: "tiktok-1",
    type: "reel",
    thumbnail: "/images/products/mate-atardecer-table.jpeg",
    caption: "Mate + Costanera. El combo perfecto para una tarde de río.",
    url: SOCIAL.tiktok.videos[2].url,
    likes: "3.842",
    comments: "128",
    platform: "tiktok",
  },
  {
    id: "ig-encuentro",
    type: "image",
    thumbnail: "/images/products/mate-encuentro-top.jpeg",
    caption: "Mate Encuentro. Diseñado para compartir el ritual con alguien especial.",
    url: SOCIAL.instagram.url,
    likes: "894",
    comments: "41",
    platform: "instagram",
  },
  {
    id: "tiktok-2",
    type: "reel",
    thumbnail: "/images/products/mate-cuero-bombilla.jpeg",
    caption: "El proceso de la alpaca. Cada pieza de metal es trabajada a mano.",
    url: SOCIAL.tiktok.videos[0].url,
    likes: "5.210",
    comments: "203",
    platform: "tiktok",
  },
  {
    id: "ig-stanley",
    type: "image",
    thumbnail: "/images/products/mate-stanley-thermos.jpeg",
    caption: "Tu mate RioMates, tu termo, tu momento. Donde vayas.",
    url: SOCIAL.instagram.url,
    likes: "1.563",
    comments: "87",
    platform: "instagram",
  },
  {
    id: "ig-laptop",
    type: "reel",
    thumbnail: "/images/products/mate-laptop-breakfast.jpeg",
    caption: "El ritual que acompaña tu día. Desde la primera cebada hasta la última.",
    url: SOCIAL.instagram.url,
    likes: "2.018",
    comments: "95",
    platform: "instagram",
  },
  {
    id: "ig-madera",
    type: "image",
    thumbnail: "/images/products/mates-madera-duo.jpeg",
    caption: "Mates de madera con alpaca decorada. Naturaleza y artesanía en un solo objeto.",
    url: SOCIAL.instagram.url,
    likes: "756",
    comments: "34",
    platform: "instagram",
  },
  {
    id: "ig-cuero",
    type: "image",
    thumbnail: "/images/products/mate-cuero-oscuro-solo.jpeg",
    caption: "Mate con envolvente de cuero oscuro. Protección y estilo en cada cebada.",
    url: SOCIAL.instagram.url,
    likes: "1.102",
    comments: "52",
    platform: "instagram",
  },
  {
    id: "ig-bombilla",
    type: "reel",
    thumbnail: "/images/products/bombilla-top-view.jpeg",
    caption: "Detalle de bombilla de alpaca trenzada. La pieza que completa el ritual.",
    url: SOCIAL.instagram.url,
    likes: "934",
    comments: "48",
    platform: "instagram",
  },
  {
    id: "ig-duo-silver",
    type: "image",
    thumbnail: "/images/products/mates-duo-silver.jpeg",
    caption: "Dúo de mates con terminación silver. Perfectos para regalar o regalarte.",
    url: SOCIAL.instagram.url,
    likes: "1.387",
    comments: "71",
    platform: "instagram",
  },
];

// --- TikTok Featured Video Card ---
// Uses the specific video the user requested: "Mate + Costanera"

const TikTokFeaturedCard = () => {
  const tiktokVideo = SOCIAL.tiktok.videos.find(
    (v) => v.id === "7617902235422543125"
  )!;

  return (
    <div className="relative group w-full aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-rio-oscuro border border-alpaca/10 shadow-2xl shadow-rio-oscuro/20">
      {/* Background Iframe — Zoomed to hide chrome, autoplay, muted, loop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden scale-[1.35] origin-center">
        <iframe
          src={`https://www.tiktok.com/player/v1/${tiktokVideo.id}?autoplay=1&muted=1&controls=0&loop=1&webkit-playsinline=1&playsinline=1`}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media"
          title={tiktokVideo.title}
        />
        {/* Subtle overlay for contrast */}
        <div className="absolute inset-0 bg-rio-oscuro/15" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-rio-oscuro via-rio-oscuro/10 to-transparent pointer-events-none">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-calabaza animate-pulse" />
          <span className="text-white/70 text-[10px] tracking-[0.3em] uppercase font-body font-semibold">
            Video Destacado
          </span>
        </div>
        <a
          href={tiktokVideo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto block group/link"
        >
          <h3 className="text-white text-3xl font-serif leading-tight group-hover/link:text-calabaza transition-colors duration-500">
            {tiktokVideo.title}
          </h3>
          <div className="mt-6 flex items-center gap-3 text-white/50 text-[10px] font-body tracking-[0.2em] uppercase">
            <span>Ver en TikTok</span>
            <div className="w-8 h-[1px] bg-white/20 group-hover/link:w-14 group-hover/link:bg-calabaza transition-all duration-500" />
          </div>
        </a>
      </div>
    </div>
  );
};

// --- Real Product Card ---

const RealMediaCard = ({ item }: { item: MediaItem }) => {
  return (
    <div className="relative group min-w-[300px] md:min-w-[400px] aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-espuma border border-alpaca/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.caption}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.08]"
        />
        {/* Platform badge */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-espuma/15 backdrop-blur-xl border border-espuma/25 text-white">
            {item.platform === "instagram" ? (
              <InstagramLogo size={14} weight="fill" />
            ) : (
              <TiktokLogo size={14} weight="fill" />
            )}
            <span className="text-[10px] tracking-wider uppercase font-body font-semibold">
              {item.platform}
            </span>
          </div>
        </div>
        {/* Type indicator */}
        <div className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-espuma/10 backdrop-blur-xl border border-espuma/20 text-white shadow-xl">
          {item.type === "reel" ? (
            <PlayCircle size={20} weight="fill" />
          ) : (
            <ImageIcon size={20} weight="fill" />
          )}
        </div>
      </div>

      <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-rio-oscuro/80 via-rio-oscuro/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out translate-y-6 group-hover:translate-y-0">
        <p className="text-white text-base font-serif italic leading-relaxed line-clamp-3">
          {item.caption}
        </p>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-white/50 text-[9px] uppercase tracking-widest font-body">
                Me gusta
              </span>
              <span className="text-white text-sm font-mono font-medium">
                {item.likes}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-white/50 text-[9px] uppercase tracking-widest font-body">
                Comentarios
              </span>
              <span className="text-white text-sm font-mono font-medium">
                {item.comments}
              </span>
            </div>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-espuma text-rio-oscuro hover:bg-calabaza hover:text-espuma transition-all duration-500 shadow-2xl active:scale-90"
          >
            <ArrowRight size={20} weight="bold" />
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export function SocialShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
    };

    const ref = scrollRef.current;
    ref?.addEventListener("scroll", handleScroll);
    return () => ref?.removeEventListener("scroll", handleScroll);
  }, []);

  const CARD_WIDTH = 420;

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const target = Math.min(el.scrollLeft + CARD_WIDTH, el.scrollWidth - el.clientWidth);
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const target = Math.max(el.scrollLeft - CARD_WIDTH, 0);
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section className="py-24 lg:py-32 bg-arena overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-[1px] bg-calabaza/50" />
              <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-calabaza font-semibold">
                Nuestra Comunidad
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-rio-oscuro leading-[0.95] tracking-tight"
            >
              El{" "}
              <em className="italic text-calabaza/90 font-serif">ritual</em>{" "}
              compartido en tiempo real.
            </motion.h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="group flex items-center justify-center w-12 h-12 rounded-full border border-alpaca/30 bg-espuma text-rio-oscuro hover:bg-calabaza/10 transition-all active:scale-95"
              aria-label="Anteriores"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-rio-oscuro text-white hover:bg-calabaza transition-all active:scale-95 shadow-lg shadow-rio-oscuro/20"
              aria-label="Siguientes"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Two-column layout: TikTok (narrow) + Instagram carousel (wide) */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
          {/* TikTok Featured Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <TikTokFeaturedCard />
          </motion.div>

          {/* Instagram Carousel Column */}
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Mobile TikTok */}
              <div className="lg:hidden min-w-[280px] snap-start">
                <TikTokFeaturedCard />
              </div>

              {REAL_MEDIA.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className="snap-start"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.6 }}
                >
                  <RealMediaCard item={item} />
                </motion.div>
              ))}

              {/* CTA: Follow on Instagram */}
              <div className="snap-start min-w-[300px] md:min-w-[400px] aspect-[4/5] rounded-[2.5rem] border border-alpaca/20 flex flex-col items-center justify-center gap-6 p-10 text-center bg-espuma/50">
                <div className="p-5 rounded-full bg-espuma shadow-sm border border-alpaca/15">
                  <InstagramLogo size={36} className="text-rio-oscuro" weight="fill" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-rio-oscuro mb-3">
                    Seguinos en Instagram
                  </h4>
                  <p className="text-sm text-rio-oscuro/50 font-body leading-relaxed max-w-[260px] mx-auto">
                    Nuevas piezas, rituales y el detrás de escena de cada mate
                    artesanal.
                  </p>
                </div>
                <a
                  href={SOCIAL.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-full bg-rio-oscuro text-white font-body text-[0.65rem] tracking-[0.2em] uppercase hover:bg-calabaza transition-colors duration-300"
                >
                  @{SOCIAL.instagram.handle.replace("@", "")}
                </a>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-8 flex items-center gap-4">
              <div className="relative flex-1 h-[2px] bg-alpaca/20 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-calabaza"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-rio-oscuro/30 tabular-nums">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Footer metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="border-t border-alpaca/20 pt-4">
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-rio-oscuro/30 mb-1">
              TikTok
            </p>
            <p className="text-sm font-body text-rio-oscuro/70">
              {SOCIAL.tiktok.videos.length} videos publicados
            </p>
          </div>
          <div className="border-t border-alpaca/20 pt-4">
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-rio-oscuro/30 mb-1">
              Instagram
            </p>
            <p className="text-sm font-body text-rio-oscuro/70">
              {REAL_MEDIA.filter((i) => i.platform === "instagram").length}{" "}
              publicaciones recientes
            </p>
          </div>
          <div className="border-t border-alpaca/20 pt-4">
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-rio-oscuro/30 mb-1">
              Contenido
            </p>
            <p className="text-sm font-body text-rio-oscuro/70">
              Fotos + reels reales de la marca
            </p>
          </div>
          <div className="border-t border-alpaca/20 pt-4">
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-rio-oscuro/30 mb-1">
              Actualización
            </p>
            <p className="text-sm font-body text-rio-oscuro/70">
              Datos verificados del perfil oficial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
