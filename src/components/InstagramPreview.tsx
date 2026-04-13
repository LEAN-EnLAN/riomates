"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SOCIAL } from "@/lib/config";

const instagramPosts = [
  {
    id: "ig-1",
    caption: "El ritual de la mañana",
    type: "reel",
    thumbnail: "/images/products/mate-stanley-thermos.jpeg",
  },
  {
    id: "ig-2",
    caption: "Proceso artesanal: la alpaca",
    type: "image",
    thumbnail: "/images/products/bombilla-top-view.jpeg",
  },
  {
    id: "ig-3",
    caption: "Costanera + mate",
    type: "image",
    thumbnail: "/images/products/mates-duo-silver.jpeg",
  },
  {
    id: "ig-4",
    caption: "Cómo curar tu mate",
    type: "reel",
    thumbnail: "/images/products/mate-parana-patas-doradas.jpeg",
  },
  {
    id: "ig-5",
    caption: "Nuevo diseño: Encuentro",
    type: "image",
    thumbnail: "/images/products/mate-encuentro-top.jpeg",
  },
  {
    id: "ig-6",
    caption: "Atardecer en el Paraná",
    type: "image",
    thumbnail: "/images/products/mate-atardecer-table.jpeg",
  },
];

export function InstagramPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % instagramPosts.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const currentPost = instagramPosts[currentIndex];
  const thumbnails = instagramPosts.slice(0, 6);

  return (
    <div>
      {/* Featured preview area */}
      <div className="mb-5">
        <div className="aspect-[4/3] rounded-md overflow-hidden bg-zinc-100 relative group">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPost.id}
              src={currentPost.thumbnail}
              alt={currentPost.caption}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>

          {/* Overlay info */}
          <div className="absolute inset-0 bg-gradient-to-t from-rio-oscuro/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-body text-[0.6rem] tracking-widest uppercase text-calabaza mb-1 block">
                {currentPost.type === "reel" ? "Reel" : "Post"}
              </span>
              <p className="font-body text-sm text-white/90 leading-snug">
                {currentPost.caption}
              </p>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            {instagramPosts.slice(0, 4).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-white w-5"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Ver post ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Caption display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPost.id + "-caption"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mb-5"
        >
          <span className="font-body text-[0.6rem] tracking-widest uppercase text-calabaza">
            {currentPost.type === "reel" ? "Reel" : "Post"}
          </span>
          <p className="font-body text-sm text-zinc-500 mt-1 leading-relaxed">
            {currentPost.caption}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mb-5">
        {thumbnails.map((post, i) => (
          <motion.button
            key={post.id}
            onClick={() => setCurrentIndex(i)}
            className={`relative flex-shrink-0 w-14 h-14 rounded overflow-hidden transition-all duration-300 ${
              i === currentIndex
                ? "ring-2 ring-calabaza ring-offset-2"
                : "opacity-50 hover:opacity-80"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={post.caption}
          >
            <img
              src={post.thumbnail}
              alt={post.caption}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {post.type === "reel" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-4">
        <a
          href={SOCIAL.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-[0.7rem] tracking-widest uppercase text-rio-oscuro hover:text-calabaza transition-colors duration-300 group/link"
        >
          <span className="relative">
            {SOCIAL.instagram.handle}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-calabaza transition-all duration-300 group-hover/link:w-full" />
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/link:translate-x-0.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
