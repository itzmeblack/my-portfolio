import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blackyy — Full-Stack Developer",
  description:
    "I'm blackyy, a full-stack developer. I build digital things that people actually remember. Fast, functional, and built to last.",
  openGraph: {
    title: "blackyy — Full-Stack Developer",
    description:
      "I build digital things that people actually remember. Fast, functional, and built to last.",
    type: "website",
  },
};

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return children;
}
