"use client";

import React, { useRef, useState, useEffect } from "react";
import { InstagramLogo, TiktokLogo, ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import { SOCIAL } from "@/lib/config";

// ============================================================
// DATA
// ============================================================

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
    id: "ig-atardecer", type: "image",
    thumbnail: "/images/products/mate-atardecer-table.jpeg",
    caption: "Tarde de mates y río. El complemento perfecto.",
    url: SOCIAL.instagram.url, likes: "1.247", comments: "63", platform: "instagram",
  },
  {
    id: "ig-cuero", type: "image",
    thumbnail: "/images/products/mate-cuero-bombilla.jpeg",
    caption: "Detalle de costura y cuero natural. Artesanía pura.",
    url: SOCIAL.instagram.url, likes: "894", comments: "41", platform: "instagram",
  },
  {
    id: "ig-cuero-oscuro", type: "image",
    thumbnail: "/images/products/mate-cuero-oscuro-solo.jpeg",
    caption: "Cuero oscuro, virola cincelada.",
    url: SOCIAL.instagram.url, likes: "1.563", comments: "87", platform: "instagram",
  },
  {
    id: "ig-encuentro-bombilla", type: "image",
    thumbnail: "/images/products/mate-encuentro-bombilla.jpeg",
    caption: "Mate Encuentro con bombilla de alpaca trenzada.",
    url: SOCIAL.instagram.url, likes: "2.018", comments: "95", platform: "instagram",
  },
  {
    id: "ig-encuentro-top", type: "image",
    thumbnail: "/images/products/mate-encuentro-top.jpeg",
    caption: "La boca perfecta. Cebada tras cebada.",
    url: SOCIAL.instagram.url, likes: "756", comments: "34", platform: "instagram",
  },
  {
    id: "ig-encuentro-angle", type: "image",
    thumbnail: "/images/products/mate-encuentro-top-angle.jpeg",
    caption: "Textura y forma natural de la calabaza.",
    url: SOCIAL.instagram.url, likes: "982", comments: "51", platform: "instagram",
  },
  {
    id: "ig-laptop", type: "image",
    thumbnail: "/images/products/mate-laptop-breakfast.jpeg",
    caption: "El compañero en la rutina de cada mañana.",
    url: SOCIAL.instagram.url, likes: "1.104", comments: "66", platform: "instagram",
  },
  {
    id: "ig-madera-silver", type: "image",
    thumbnail: "/images/products/mate-madera-silver.jpeg",
    caption: "Madera y terminación plateada, equilibrio natural.",
    url: SOCIAL.instagram.url, likes: "820", comments: "28", platform: "instagram",
  },
  {
    id: "ig-parana", type: "image",
    thumbnail: "/images/products/mate-parana-patas-doradas.jpeg",
    caption: "Mate Paraná con patas doradas. Elegancia rústica.",
    url: SOCIAL.instagram.url, likes: "1.345", comments: "72", platform: "instagram",
  },
  {
    id: "ig-duo-bombilla", type: "image",
    thumbnail: "/images/products/mates-duo-bombilla.jpeg",
    caption: "Preparando el ritual para dos.",
    url: SOCIAL.instagram.url, likes: "2.100", comments: "115", platform: "instagram",
  },
  {
    id: "ig-duo-silver", type: "image",
    thumbnail: "/images/products/mates-duo-silver.jpeg",
    caption: "Dúo con virolas de plata. Un clásico.",
    url: SOCIAL.instagram.url, likes: "1.780", comments: "89", platform: "instagram",
  },
  {
    id: "ig-madera-duo", type: "image",
    thumbnail: "/images/products/mates-madera-duo.jpeg",
    caption: "La calidez de la madera en cada mate.",
    url: SOCIAL.instagram.url, likes: "1.240", comments: "44", platform: "instagram",
  },
  {
    id: "ig-stanley", type: "image",
    thumbnail: "/images/products/mate-stanley-thermos.jpeg",
    caption: "Tu termo, tu mate RioMates, tu momento.",
    url: SOCIAL.instagram.url, likes: "3.450", comments: "201", platform: "instagram",
  },
];

export function SocialShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const tiktokVideo = SOCIAL.tiktok.videos.find((v) => v.id === "7617902235422543125") || SOCIAL.tiktok.videos[0];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const scrollByAmount = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-rio-oscuro border-y border-rio-oscuro relative overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-arena/50" />
              <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-arena/70 font-medium">
                Comunidad en línea
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-arena leading-none">
              El <em className="italic text-calabaza font-serif">ritual</em> compartido.
            </h2>
          </div>

          <div className="flex items-center gap-2 hidden lg:flex">
            <button
              onClick={() => scrollByAmount(-400)}
              disabled={!canScrollLeft}
              className="w-12 h-12 flex items-center justify-center border border-arena/20 rounded-full text-arena disabled:opacity-30 disabled:cursor-not-allowed hover:bg-calabaza hover:text-rio-oscuro hover:border-calabaza transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scrollByAmount(400)}
              disabled={!canScrollRight}
              className="w-12 h-12 flex items-center justify-center border border-arena/20 rounded-full text-arena disabled:opacity-30 disabled:cursor-not-allowed hover:bg-calabaza hover:text-rio-oscuro hover:border-calabaza transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* TikTok Main Block */}
          <div className="relative w-full lg:w-[400px] shrink-0 border border-arena/10 bg-arena/5 backdrop-blur-sm p-4 flex flex-col group h-[600px] lg:h-[650px]">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <TiktokLogo size={20} className="text-arena" />
                <span className="font-body text-[0.7rem] uppercase tracking-widest text-arena">Destacado</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>

            <div className="relative flex-1 bg-black overflow-hidden isolate">
              <iframe
                src={`https://www.tiktok.com/player/v1/${tiktokVideo.id}?autoplay=1&muted=1&controls=0&loop=1&webkit-playsinline=1&playsinline=1`}
                className="absolute inset-0 w-full h-full border-0 scale-[1.02] pointer-events-none"
                allow="autoplay; encrypted-media"
                title={tiktokVideo.title}
              />
              {/* Overlay gradient to make text readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <p className="text-white font-serif text-xl leading-tight mb-4">{tiktokVideo.title}</p>
                <a
                  href={tiktokVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/80 font-body text-[0.65rem] tracking-[0.2em] uppercase hover:text-calabaza transition-colors pointer-events-auto"
                >
                  Ver en TikTok <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Carousel Track */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 -mt-4 scrollbar-hide flex-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Instagram items */}
            {REAL_MEDIA.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative shrink-0 w-[280px] lg:w-[320px] h-[600px] lg:h-[650px] snap-start group border border-arena/10 bg-arena/5 backdrop-blur-sm p-3"
              >
                <div className="absolute top-6 left-6 z-10 bg-arena/10 backdrop-blur-md px-3 py-1.5 flex items-center gap-2 shadow-sm">
                  <InstagramLogo size={16} className="text-arena" />
                </div>
                
                <div className="w-full h-[65%] relative overflow-hidden bg-rio-oscuro mb-4">
                  <img
                    src={item.thumbnail}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-between h-[calc(35%-1rem)]">
                  <p className="font-serif text-arena text-lg leading-snug line-clamp-3">
                    {item.caption}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-arena/10 pt-4 mt-auto">
                    <div className="flex gap-4">
                      <span className="font-mono text-xs text-arena/60">{item.likes} likes</span>
                    </div>
                    <ArrowRight size={16} className="text-arena/40 group-hover:text-calabaza transition-colors group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            ))}

            {/* Final CTA */}
            <div className="relative shrink-0 w-[280px] lg:w-[320px] h-[600px] lg:h-[650px] snap-start flex flex-col items-center justify-center p-8 bg-calabaza border border-calabaza text-center group">
              <InstagramLogo size={48} className="text-rio-oscuro mb-6" weight="light" />
              <h3 className="font-serif text-3xl text-rio-oscuro mb-4">Unite al<br/>ritual</h3>
              <p className="font-body text-rio-oscuro/80 text-sm mb-8">Nuevas piezas, procesos y comunidad.</p>
              
              <a
                href={SOCIAL.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-light !border-rio-oscuro/20 !text-rio-oscuro w-full justify-center group-hover:!bg-rio-oscuro group-hover:!text-calabaza group-hover:!border-rio-oscuro"
              >
                <span>@{SOCIAL.instagram.handle.replace("@", "")}</span>
              </a>
            </div>

            {/* Spacer for right edge so last item isn't flush against screen edge on mobile/tablet if needed */}
            <div className="shrink-0 w-2 lg:w-6 h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
