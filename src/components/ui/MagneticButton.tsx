"use client";

import { type ReactNode, type MouseEvent } from "react";
import { useMagnetic } from "@/lib/hooks/useMagnetic";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
}

export function MagneticButton({ children, strength = 0.3 }: MagneticButtonProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(strength);
  const reduced = useReducedMotion();

  if (reduced) {
    return <div>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </div>
  );
}
