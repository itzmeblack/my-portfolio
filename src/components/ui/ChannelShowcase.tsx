"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

interface Channel {
  name: string;
  milestone: string;
  description: string;
  image: string;
  link?: string;
  popularLabel?: string;
  videos: { title: string; link: string; thumbnail: string; views: string }[];
  reels?: { title: string; link: string; thumbnail: string; views: string }[];
  isInstagram?: boolean;
}

interface ChannelShowcaseProps {
  channels: Channel[];
}

function getVideoId(url: string): string {
  const match = url.match(/youtu\.be\/([^?]+)/);
  return match ? match[1] : "";
}

function isLocalVideoFile(url: string): boolean {
  return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov");
}

function VideoCard({
  video,
  index,
  isActive,
  onHover,
  onLeave,
  onSelect,
}: {
  video: { title: string; link: string; thumbnail: string; views: string };
  index: number;
  isActive: boolean;
  onHover: (index: number) => void;
  onLeave: () => void;
  onSelect: (index: number) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const videoId = getVideoId(video.link);

  const handleMouseEnter = () => {
    setPlaying(true);
    onHover(index);
  };

  const handleMouseLeave = () => {
    setPlaying(false);
    onLeave();
  };

  return (
    <motion.button
      onClick={() => onSelect(index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative aspect-video rounded-[var(--radius)] border bg-bg-tertiary overflow-hidden group ${
        isActive ? "border-2 border-accent/50" : "border-border"
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {playing && videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&loop=1&playlist=${videoId}`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <>
          {video.thumbnail ? (
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-text-tertiary">Video</span>
            </div>
          )}
          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.6)" />
                <path d="M19 16l16 8-16 8V16z" fill="white" />
              </svg>
            </div>
          </div>
        </>
      )}
      {video.views && (
        <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
          {video.views} views
        </div>
      )}
    </motion.button>
  );
}

function ReelCard({
  reel,
  index,
}: {
  reel: { title: string; link: string; thumbnail: string; views: string };
  index: number;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.button
      onClick={() => reel.link && window.open(reel.link, "_blank")}
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      className="group relative aspect-[9/16] rounded-[var(--radius)] border border-border bg-bg-tertiary overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {playing && isLocalVideoFile(reel.link) ? (
        <video
          src={reel.link}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          playsInline
        />
      ) : reel.thumbnail ? (
        <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-text-tertiary">Reel {index + 1}</span>
        </div>
      )}
      {playing && isLocalVideoFile(reel.link) && (
        <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
          {reel.views || "Play"}
        </div>
      )}
    </motion.button>
  );
}

export function ChannelShowcase({ channels }: ChannelShowcaseProps) {
  const [activeChannel, setActiveChannel] = useState(0);
  const [activeVideo, setActiveVideo] = useState(1);

  const channel = channels[activeChannel];
  const videos = channel.videos;

  return (
    <div>
      {/* Channel selector */}
      <div className="flex flex-wrap gap-4 mb-8">
        {channels.map((ch, i) => (
          <button
            key={ch.name}
            onClick={() => { setActiveChannel(i); setActiveVideo(1); }}
            className={`flex items-center gap-4 rounded-[var(--radius)] border px-6 py-4 text-left transition-colors ${
              i === activeChannel
                ? "border-accent/50 bg-accent-dim"
                : "border-border hover:border-accent/30"
            }`}
          >
            <div className="relative">
              <img
                src={ch.image}
                alt={ch.name}
                className={`h-12 w-12 object-cover ${
                  ch.isInstagram ? "rounded-full ring-2 ring-pink-500" : "rounded-full ring-2 ring-red-500"
                }`}
              />
              {ch.isInstagram && (
                <span className="absolute -bottom-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  IG
                </span>
              )}
              {!ch.isInstagram && (
                <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  YT
                </span>
              )}
            </div>
            <div>
              <div className="font-display font-semibold">{ch.name}</div>
              <div className="text-sm text-accent">{ch.milestone}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Channel info */}
      <Reveal key={activeChannel}>
        <p className="text-text-secondary mb-8 max-w-2xl">{channel.description}</p>
      </Reveal>

      {/* Popular videos label */}
      {channel.popularLabel && (
        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            {channel.popularLabel}
          </span>
          <span className="text-xs text-text-tertiary">— most viewed videos on the channel</span>
        </div>
      )}

      {/* Video layout: left, center, right */}
      <div className="grid grid-cols-3 gap-4 items-center">
        {videos.map((video, i) => (
          <VideoCard
            key={video.link}
            video={video}
            index={i}
            isActive={activeVideo === i}
            onHover={(index) => setActiveVideo(index)}
            onLeave={() => {}}
            onSelect={(index) => setActiveVideo(index)}
          />
        ))}
      </div>

      {!channel.isInstagram && (
        <div className="mt-4 text-center">
          <div className="text-sm font-medium text-text">
            {videos[activeVideo]?.title || "Video title"}
          </div>
          {videos[activeVideo]?.views && (
            <div className="text-xs text-text-tertiary mt-1">
              {videos[activeVideo].views} views
            </div>
          )}
        </div>
      )}

      {/* Instagram Reels */}
      {channel.reels && channel.reels.length > 0 && (
        <div className="mt-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Instagram Reels
            </span>
            <span className="text-xs text-text-tertiary">— short format content</span>
          </div>
          <div className="flex justify-center gap-4">
              <div className="grid grid-cols-4 gap-4">
                {channel.reels.map((reel, i) => (
                  <ReelCard key={i} reel={reel} index={i} />
                ))}
              </div>
            </div>
        </div>
      )}
    </div>
  );
}
