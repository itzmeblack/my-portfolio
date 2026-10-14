import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blackyy — Video Editor",
  description:
    "I'm blackyy, a video editor. I edit videos that make people feel something. Every frame has a reason.",
  openGraph: {
    title: "blackyy — Video Editor",
    description:
      "I edit videos that make people feel something. Every frame has a reason.",
    type: "website",
  },
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
