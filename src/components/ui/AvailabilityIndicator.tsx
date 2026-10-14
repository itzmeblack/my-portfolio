"use client";

import { motion } from "framer-motion";

interface AvailabilityIndicatorProps {
  text: string;
}

export function AvailabilityIndicator({ text }: AvailabilityIndicatorProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="text-sm text-text-secondary">{text}</span>
    </div>
  );
}
