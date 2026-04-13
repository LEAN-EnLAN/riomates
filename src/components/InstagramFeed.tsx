"use client";

import { useState, useEffect } from "react";
import { SOCIAL } from "@/lib/config";

// Instagram content IDs to showcase (curated from @riomatess)
// In production, these would come from Instagram Basic Display API
const instagramPosts = [
  { id: "ig-1", type: "image", caption: "El ritual de la mañana 🧉" },
  { id: "ig-2", type: "reel", caption: "Proceso artesanal: la alpaca" },
  { id: "ig-3", type: "image", caption: "Costanera + mate = perfección" },
  { id: "ig-4", type: "reel", caption: "Cómo curar tu mate" },
  { id: "ig-5", type: "image", caption: "Nuevo diseño: Encuentro" },
  { id: "ig-6", type: "image", caption: "Atardecer en el Paraná" },
];

export function InstagramFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % instagramPosts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentPost = instagramPosts[currentIndex];
  const nextIndex = (currentIndex + 1) % instagramPosts.length;

  return (
    <div className="relative overflow-hidden">
      {/* Main display */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-[2px]">
          <div className="w-full h-full rounded-md bg-rio-oscuro flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-calabaza"
            >
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1.2"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <p className="font-body text-sm text-white/80 mb-1">
          {currentPost.caption}
        </p>
        <span className="font-body text-[0.6rem] tracking-widest uppercase text-calabaza mb-6">
          {currentPost.type === "reel" ? "Reel" : "Post"}
        </span>

        {/* Preview strip */}
        <div className="flex gap-2 mb-6">
          {instagramPosts.slice(0, 6).map((post, i) => (
            <div
              key={post.id}
              className={`w-8 h-8 rounded overflow-hidden transition-all duration-500 cursor-pointer ${
                i === currentIndex
                  ? "ring-2 ring-calabaza scale-110"
                  : "opacity-40 hover:opacity-70"
              }`}
              onClick={() => setCurrentIndex(i)}
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <div className="w-full h-full flex items-center justify-center text-white/40 text-[0.5rem]">
                {post.type === "reel" ? "▶" : "◆"}
              </div>
            </div>
          ))}
        </div>

        <a
          href={SOCIAL.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-calabaza hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
          </svg>
          Seguinos en {SOCIAL.instagram.handle}
        </a>
      </div>
    </div>
  );
}
