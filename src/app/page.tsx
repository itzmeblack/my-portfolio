"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("mode") as "dev" | "editor" | null;
    router.replace(stored === "editor" ? "/editor" : "/dev");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
    </div>
  );
}
