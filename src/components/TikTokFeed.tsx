"use client";

import { useState, useEffect } from "react";
import { SOCIAL } from "@/lib/config";

export function TikTokFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videos = SOCIAL.tiktok.videos;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [videos.length]);

  const currentVideo = videos[currentIndex];

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col items-center">
        {/* Phone mockup */}
        <a
          href={currentVideo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-48 h-72 rounded-2xl overflow-hidden mb-4 relative transition-transform duration-500 hover:scale-[1.02]"
          style={{ background: "#00171f" }}
        >
          {/* TikTok UI mockup */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            {/* Play button */}
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                className="ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="font-body text-xs text-white/80 text-center mb-1 leading-snug">
              {currentVideo.title}
            </p>
            <span className="font-body text-[0.55rem] tracking-wider uppercase text-calabaza/70 mb-1">
              {currentVideo.type === "photo" ? "Foto" : "Video"}
            </span>
            <div className="flex items-center gap-1 text-white/30 text-[0.55rem]">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              Click para ver en TikTok
            </div>
          </div>

          {/* Side actions mockup */}
          <div className="absolute right-2 bottom-20 flex flex-col gap-4 items-center">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
                <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
              </svg>
            </div>
          </div>
        </a>

        {/* Video strip */}
        <div className="flex gap-2 mb-6">
          {videos.map((video, i) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-14 rounded overflow-hidden transition-all duration-500 cursor-pointer flex flex-col items-center justify-center text-center px-1 ${
                i === currentIndex
                  ? "ring-2 ring-calabaza scale-110"
                  : "opacity-40 hover:opacity-70"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(i);
              }}
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <span className="text-white/30 text-[0.4rem] mb-0.5">
                {video.type === "photo" ? "◆" : "▶"}
              </span>
              <span className="text-white/20 text-[0.3rem] leading-tight truncate w-full text-center">
                {video.title}
              </span>
            </a>
          ))}
        </div>

        <a
          href={SOCIAL.tiktok.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-calabaza hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z" />
          </svg>
          Seguinos en @rio.mates
        </a>
      </div>
    </div>
  );
}
