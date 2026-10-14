"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/lib/context/ModeContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function ModeTransitionOverlay() {
  const { isTransitioning, mode } = useMode();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className="absolute inset-0 bg-accent"
            initial={{
              clipPath: "circle(0% at 90% 24px)",
            }}
            animate={{
              clipPath: "circle(150% at 90% 24px)",
            }}
            exit={{
              clipPath: "circle(0% at 90% 24px)",
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
