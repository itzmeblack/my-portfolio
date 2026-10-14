"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/lib/context/ModeContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function ModeSwitch() {
  const { mode, switchMode, isTransitioning } = useMode();
  const reduced = useReducedMotion();

  const handleSwitch = () => {
    switchMode(mode === "dev" ? "editor" : "dev");
  };

  return (
    <button
      onClick={handleSwitch}
      disabled={isTransitioning}
      className="relative flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors hover:border-accent/40 disabled:opacity-50"
      aria-label={`Switch to ${mode === "dev" ? "Editor" : "Developer"} mode`}
    >
      <span className={`transition-opacity duration-200 ${mode === "dev" ? "opacity-100" : "opacity-40"}`}>
        Dev
      </span>
      <span className="relative flex h-4 w-8 items-center rounded-full bg-bg-tertiary">
        <motion.span
          className="absolute h-3 w-3 rounded-full bg-accent"
          animate={{ x: mode === "dev" ? 2 : 14 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </span>
      <span className={`transition-opacity duration-200 ${mode === "editor" ? "opacity-100" : "opacity-40"}`}>
        Edit
      </span>
    </button>
  );
}
