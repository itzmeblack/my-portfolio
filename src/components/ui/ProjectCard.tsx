"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    category: string;
    tools: string[];
    year: string;
    link: string;
    image: string;
    video?: string;
  };
}

function getVideoId(url: string): string {
  // YouTube: youtu.be/VIDEO_ID or youtube.com/watch?v=VIDEO_ID
  const ytMatch = url.match(/youtu\.be\/([^?]+)/);
  if (ytMatch) return ytMatch[1];
  const ytMatch2 = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (ytMatch2) return ytMatch2[1];
  // TikTok: tiktok.com/@user/video/VIDEO_ID
  const ttMatch = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  if (ttMatch) return ttMatch[1];
  return "";
}

function isVideoLink(url: string): boolean {
  return url.includes("youtu.be") || url.includes("youtube.com") || url.includes("tiktok.com");
}

function isTikTokLink(url: string): boolean {
  return url.includes("tiktok.com");
}

function isLocalVideo(url: string): boolean {
  return url.endsWith(".mp4") || url.endsWith(".webm");
}

function getEmbedUrl(url: string): string {
  const videoId = getVideoId(url);
  if (url.includes("tiktok.com")) {
    return `https://www.tiktok.com/embed/v2/${videoId}`;
  }
  return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&controls=1`;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = isVideoLink(project.link) || isLocalVideo(project.image) || Boolean(project.video);

  return (
    <motion.a
      href={project.link || undefined}
      target={project.link ? "_blank" : undefined}
      rel={project.link ? "noopener noreferrer" : undefined}
      className="group block rounded-[var(--radius)] border border-border bg-bg-secondary overflow-hidden transition-colors hover:border-accent/30"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={!project.link ? (e) => e.preventDefault() : undefined}
    >
      {/* Media preview */}
      <div
        className={`relative bg-bg-tertiary overflow-hidden ${
          project.category === "TikTok" || project.category === "Short" || project.category === "Reel"
            ? "aspect-[9/16]"
            : "aspect-[16/10]"
        }`}
        onMouseEnter={() => setPlaying(true)}
        onMouseLeave={() => setPlaying(false)}
      >
        {playing && hasVideo && (!isTikTokLink(project.link) || project.video) ? (
          project.video ? (
            <video
              src={project.video}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              playsInline
            />
          ) : isLocalVideo(project.image) ? (
            <video
              src={project.image}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              playsInline
            />
          ) : (
            <iframe
              src={getEmbedUrl(project.link)}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )
        ) : (
          <>
            {project.image && !project.image.includes("placeholder") ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-display font-bold text-text-tertiary/30">
                  {project.title.charAt(0)}
                </div>
              </div>
            )}
            {/* Play icon overlay */}
            {hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.6)" />
                    <path d="M19 16l16 8-16 8V16z" fill="white" />
                  </svg>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-tertiary uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-xs text-text-tertiary">{project.year}</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-border px-3 py-1 text-xs text-text-tertiary"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
