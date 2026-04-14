"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";
import { Play } from "lucide-react";

interface Post {
  id: string;
  permalink: string;
  isReel: boolean;
  imageUrl: string;
  caption: string;
  videoUrl?: string;
}

interface Props {
  posts: Post[];
}

export default function InstagramGrid({ posts }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const playVideo = useCallback((index: number) => {
    // Pause all others
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index) {
        v.pause();
        v.currentTime = 0;
        v.style.opacity = "0";
      }
    });
    // Play active
    const active = videoRefs.current[index];
    if (active) {
      active.style.opacity = "1";
      active.play().catch(() => {});
    }
  }, []);

  // Play whenever activeIndex changes
  useEffect(() => {
    playVideo(activeIndex);
  }, [activeIndex, playVideo]);

  const handleEnded = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const handleMouseEnter = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2">
      {posts.map((post, index) => (
        <Link
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-square overflow-hidden group block bg-beige"
          onMouseEnter={() => handleMouseEnter(index)}
        >
          {/* Thumbnail */}
          <Image
            src={post.imageUrl}
            alt={post.caption ? Array.from(post.caption).slice(0, 80).join("") : "Instagram post"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 33vw, 20vw"
          />

          {/* Video — overlaid, opacity controlled */}
          {post.isReel && post.videoUrl && (
            <video
              ref={(el) => { videoRefs.current[index] = el; }}
              src={post.videoUrl}
              muted
              loop={false}
              playsInline
              onEnded={index === activeIndex ? handleEnded : undefined}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
              style={{ pointerEvents: "none" }}
            />
          )}

          {/* Active indicator — subtle glow border */}
          {index === activeIndex && (
            <div className="absolute inset-0 ring-2 ring-primary ring-inset z-20 pointer-events-none" />
          )}

          {/* Reel badge — hides when video playing */}
          {post.isReel && index !== activeIndex && (
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1 z-10">
              <Play size={10} className="text-white fill-white" />
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
