"use client";

import { useEffect } from "react";

export function LoadingScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById("loadingOverlay");
      if (el) el.classList.add("hidden");
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
