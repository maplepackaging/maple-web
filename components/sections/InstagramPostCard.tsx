"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Play } from "lucide-react";

interface Props {
  id: string;
  permalink: string;
  isReel: boolean;
  imageUrl: string;
  caption: string;
  videoUrl?: string;
}

export default function InstagramPostCard({ id, permalink, isReel, imageUrl, caption, videoUrl }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current && videoUrl) {
      videoRef.current.style.opacity = "1";
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.style.opacity = "0";
    }
  };

  return (
    <Link
      href={permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative aspect-square overflow-hidden group block bg-beige"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      <Image
        src={imageUrl}
        alt={caption?.slice(0, 80) || "Instagram post"}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 33vw, 17vw"
      />

      {/* Hover video */}
      {isReel && videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Reel badge */}
      {isReel && (
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1 z-10 group-hover:opacity-0 transition-opacity duration-200">
          <Play size={10} className="text-white fill-white" />
        </div>
      )}

      {/* Subtle dark vignette on hover */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
    </Link>
  );
}
