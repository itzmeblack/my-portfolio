"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

type Mode = "dev" | "editor";

interface ModeContextType {
  mode: Mode;
  switchMode: (target: Mode) => void;
  isTransitioning: boolean;
}

const ModeContext = createContext<ModeContextType | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Derive mode from pathname - single source of truth
  const mode: Mode = pathname?.startsWith("/editor") ? "editor" : "dev";

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("mode", mode);
  }, [mode]);

  const switchMode = useCallback(
    async (target: Mode) => {
      if (target === mode || isTransitioning) return;
      setIsTransitioning(true);
      // Wait for transition animation to complete before navigating
      await new Promise(resolve => setTimeout(resolve, 850));
      router.push(`/${target}`);
      // Keep transition visible briefly after navigation
      setTimeout(() => setIsTransitioning(false), 100);
    },
    [mode, isTransitioning, router]
  );

  return (
    <ModeContext.Provider value={{ mode, switchMode, isTransitioning }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}