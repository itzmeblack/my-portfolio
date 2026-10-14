"use client";

import { motion } from "framer-motion";
import { useMode } from "@/lib/context/ModeContext";
import { ModeTransitionOverlay } from "@/components/layout/ModeTransitionOverlay";
import { Cursor } from "@/components/ui/Cursor";
import { BackToTop } from "@/components/ui/BackToTop";

export default function DevPage() {
  const { switchMode } = useMode();

  const handleViewEditor = () => {
    switchMode("editor");
  };

  return (
    <>
      <ModeTransitionOverlay />
      <Cursor />
      <main className="flex min-h-screen items-center justify-center px-6">
        <motion.div
          className="max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Developer profile — coming soon
          </h1>
          <p className="mt-4 text-text-secondary">
            This page is still being built. Check back soon for projects, skills, and experience.
          </p>
          <button
            onClick={handleViewEditor}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg-primary hover:opacity-90 transition-opacity"
          >
            View Editor Profile
          </button>
        </motion.div>
      </main>
      <BackToTop />
    </>
  );
}
