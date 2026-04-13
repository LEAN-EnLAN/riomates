"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 3;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
          }, 400);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.6, 0, 0.4, 1] }}
          className="fixed inset-0 z-[9999] bg-rio-oscuro flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.img
              src="/logo.svg"
              alt="RioMates"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-20 h-20 md:w-24 md:h-24"
            />

            {/* Progress Bar */}
            <div className="w-48 md:w-56 h-[1px] bg-arena/10 overflow-hidden">
              <motion.div
                className="h-full bg-calabaza/70"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "tween", ease: "linear" }}
              />
            </div>

            {/* Subtle Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-body text-[0.55rem] tracking-[0.3em] uppercase text-arena"
            >
              Rosario, Santa Fe
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
