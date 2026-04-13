"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface SocialCardProps {
  platform: "instagram" | "tiktok";
  handle: string;
  followUrl: string;
  children: React.ReactNode;
  featured?: boolean;
}

export function SocialCard({ platform, handle, followUrl, children, featured = false }: SocialCardProps) {
  const platformConfig = {
    instagram: {
      label: "Instagram",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      ),
      gradient: "from-purple-500 via-pink-500 to-orange-400",
      ctaText: "Ver en Instagram",
    },
    tiktok: {
      label: "TikTok",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z" />
        </svg>
      ),
      gradient: "",
      ctaText: "Ver en TikTok",
    },
  };

  const config = platformConfig[platform];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay: featured ? 0.1 : 0.2 }}
      className={`group relative bg-white rounded-lg border border-zinc-200/60 overflow-hidden transition-shadow duration-500 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06)]`}
    >
      {/* Top accent line */}
      <div className={`h-px w-full ${config.gradient ? `bg-gradient-to-r ${config.gradient}` : "bg-zinc-800"}`} />

      {/* Platform header */}
      <div className="px-6 pt-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            platform === "instagram"
              ? "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white"
              : "bg-zinc-900 text-white"
          }`}>
            {config.icon}
          </div>
          <div>
            <p className="font-body text-sm font-medium text-rio-oscuro tracking-tight">
              {config.label}
            </p>
            <p className="font-body text-xs text-zinc-400 tracking-wide">
              {handle}
            </p>
          </div>
        </div>
        <a
          href={followUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[0.65rem] tracking-widest uppercase text-zinc-400 hover:text-calabaza transition-colors duration-300"
        >
          Seguir +
        </a>
      </div>

      {/* Content area */}
      <div className="px-6 pb-6">
        {children}
      </div>
    </motion.div>
  );
}
