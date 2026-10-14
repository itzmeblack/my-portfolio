"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/lib/context/ModeContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const { mode, isTransitioning } = useMode();
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
