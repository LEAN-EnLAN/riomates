"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SOCIAL } from "@/lib/config";

const videos = SOCIAL.tiktok.videos;

export function TikTokPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const currentVideo = videos[currentIndex];

  return (
    <div>
      {/* Phone mockup */}
      <div className="flex justify-center mb-5">
        <motion.a
          href={currentVideo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Phone frame */}
              <div
                className="w-40 h-64 rounded-2xl overflow-hidden relative"
                style={{ background: "#0a0a0a" }}
              >
                {/* Screen content */}
                <div className="absolute inset-[3px] rounded-[14px] overflow-hidden">
                  {/* Dark gradient background simulating video */}
                  <div className="w-full h-full bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-4">
                    {/* Play button */}
                    <motion.div
                      className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center mb-3"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>

                    {/* Video title */}
                    <p className="font-body text-[0.55rem] text-white/80 text-center mb-1.5 leading-snug max-w-[80%]">
                      {currentVideo.title}
                    </p>

                    {/* Type badge */}
                    <span className="font-body text-[0.45rem] tracking-wider uppercase text-calabaza/80 mb-3">
                      {currentVideo.type === "photo" ? "Foto" : "Video"}
                    </span>

                    {/* Hint text */}
                    <p className="font-body text-[0.4rem] text-white/25 text-center">
                      Click para ver
                    </p>
                  </div>
                </div>

                {/* Side action buttons */}
                <div className="absolute right-1.5 bottom-16 flex flex-col gap-2.5 items-center z-10">
                  {[
                    <svg key="heart" width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
                    <svg key="comment" width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/></svg>,
                    <svg key="share" width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>,
                  ].map((icon, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                      {icon}
                    </div>
                  ))}
                </div>

                {/* Bottom TikTok bar */}
                <div className="absolute bottom-[3px] left-[3px] right-[3px] h-6 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.a>
      </div>

      {/* Video info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideo.id + "-info"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-5"
        >
          <span className="font-body text-[0.6rem] tracking-widest uppercase text-calabaza">
            {currentVideo.type === "photo" ? "Foto" : "Video"}
          </span>
          <p className="font-body text-sm text-zinc-500 mt-1 leading-relaxed">
            {currentVideo.title}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Video strip */}
      <div className="flex justify-center gap-2 mb-5">
        {videos.map((video, i) => (
          <motion.button
            key={video.id}
            onClick={() => setCurrentIndex(i)}
            className={`relative flex-shrink-0 w-10 h-14 rounded overflow-hidden transition-all duration-300 flex flex-col items-center justify-center ${
              i === currentIndex
                ? "ring-2 ring-calabaza ring-offset-2"
                : "opacity-40 hover:opacity-70"
            }`}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label={video.title}
          >
            <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center gap-0.5">
              <svg
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill={video.type === "photo" ? "none" : "rgba(255,255,255,0.4)"}
                stroke={video.type === "photo" ? "rgba(255,255,255,0.3)" : "none"}
                strokeWidth="2"
              >
                {video.type === "photo" ? (
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-center">
        <a
          href={SOCIAL.tiktok.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-[0.7rem] tracking-widest uppercase text-rio-oscuro hover:text-calabaza transition-colors duration-300 group/link"
        >
          <span className="relative">
            {SOCIAL.tiktok.handle}
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
