"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/lib/context/ModeContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function ModeTransition({ children }: { children: React.ReactNode }) {
  const { mode, isTransitioning } = useMode();
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
