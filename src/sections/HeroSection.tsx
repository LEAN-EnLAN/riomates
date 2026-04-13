"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";

const HERO_IMAGE = "/images/products/hero.png";
const HERO_VIDEO = "/assets/hero-loop.webm";
const HERO_VIDEO_FALLBACK = "/assets/hero-loop.mp4";

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Parallax on scroll
    const handleScroll = () => {
      if (bgRef.current) {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
          bgRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden flex items-end"
    >
      {/* Background — Video with image fallback */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_IMAGE}
        >
          <source src={HERO_VIDEO} type="video/webm" />
          <source src={HERO_VIDEO_FALLBACK} type="video/mp4" />
        </video>
        {/* Fallback image shown when video is not available */}
        <img
          src={HERO_IMAGE}
          alt="Mate artesanal RioMates Paraná"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-rio-oscuro/80 via-rio-oscuro/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-rio-oscuro/70 via-transparent to-rio-oscuro/20" />
        {/* Ambient texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pb-20 lg:pb-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Headline */}
          <Reveal delay={100}>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-[0.95] tracking-tight mb-6">
              Nacidos donde el
              <br />
              <span className="text-calabaza">Paraná</span> encuentra
              <br />
              la tierra
            </h1>
          </Reveal>

          {/* Location tagline */}
          <Reveal delay={150}>
            <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-calabaza/80 mb-8">
              Rosario, Santa Fe — Argentina
            </p>
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={200}>
            <p className="font-body text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-lg font-light">
              Mates artesanales de calabaza curada, cosidos al tiento
              con la paciencia de quien sabe que lo bueno lleva tiempo.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="#coleccion" className="btn-primary-light">
                <span>Descubrir la Colección</span>
              </a>
              <a href="#origen" className="btn-ghost text-white/70">
                Nuestra historia <span className="ml-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 lg:right-12 flex flex-col items-center gap-3">
        <Reveal delay={400}>
          <p className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-white/40 rotate-90 origin-center translate-y-6">
            Scroll
          </p>
        </Reveal>
      </div>
    </section>
  );
}
