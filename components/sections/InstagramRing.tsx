"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

interface Post {
  id: string;
  permalink: string;
  isReel: boolean;
  imageUrl: string;
  caption: string;
  videoUrl?: string;
}

export default function InstagramRing({ posts }: { posts: Post[] }) {
  const n = posts.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [w, setW] = useState(1000); // measured container width
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const measure = () => setW(wrapRef.current?.clientWidth || window.innerWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (paused || n <= 1) return;
    timer.current = setInterval(() => setActive((a) => (a + 1) % n), 3800);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, n]);

  if (!n) return null;

  // responsive sizing derived from container width
  const cardW = Math.round(Math.min(260, Math.max(140, w * 0.42)));
  const cardH = Math.round((cardW * 16) / 9);
  const x1 = Math.min(w * 0.3, 240);
  const x2 = Math.min(w * 0.46, 430);
  const stageH = Math.round(cardH * 1.1 + 36);

  function cfgFor(absRel: number) {
    switch (absRel) {
      case 0: return { x: 0, rot: 0, scale: 1.06, opacity: 1, dim: 0, z: 50 };
      case 1: return { x: x1, rot: 34, scale: 0.86, opacity: 1, dim: 0.18, z: 40 };
      case 2: return { x: x2, rot: 46, scale: 0.72, opacity: 1, dim: 0.4, z: 30 };
      default: return { x: x2 + 120, rot: 54, scale: 0.6, opacity: 0, dim: 0.5, z: 10 };
    }
  }

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  return (
    <div
      ref={wrapRef}
      className="relative w-full max-w-6xl mx-auto px-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative [perspective:1500px] flex items-center justify-center overflow-hidden"
        style={{ height: stageH }}
      >
        {posts.map((post, i) => {
          let rel = i - active;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;
          const absRel = Math.abs(rel);
          const cfg = cfgFor(absRel);
          const sign = rel < 0 ? -1 : 1;
          const isCenter = rel === 0;
          return (
            <Link
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute rounded-[1.5rem] sm:rounded-[1.75rem] border-[5px] border-white overflow-hidden bg-cream-deep transition-all duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                width: cardW,
                height: cardH,
                transform: `translateX(${sign * cfg.x}px) rotateY(${sign * cfg.rot}deg) scale(${cfg.scale})`,
                zIndex: cfg.z,
                opacity: cfg.opacity,
                pointerEvents: cfg.opacity === 0 ? "none" : "auto",
              }}
            >
              <Image
                src={post.imageUrl}
                alt={post.caption ? Array.from(post.caption).slice(0, 80).join("") : "Instagram reel"}
                fill
                className="object-cover"
                sizes="260px"
              />
              {isCenter && post.isReel && post.videoUrl && (
                <video
                  src={post.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {cfg.dim > 0 && <div className="absolute inset-0 bg-ink" style={{ opacity: cfg.dim }} />}
              <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm text-ink text-[10px] font-semibold px-2 py-0.5">
                <Instagram size={11} className="text-terracotta" />
                Reel
              </span>
              {post.isReel && !isCenter && (
                <span className="absolute inset-0 grid place-items-center z-10">
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-ink/40 backdrop-blur-sm">
                    <Play size={13} className="text-white fill-white" />
                  </span>
                </span>
              )}
            </Link>
          );
        })}

        {/* Arrows */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous reel"
          className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-[60] grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-paper border border-line text-ink hover:text-terracotta hover:scale-105 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next reel"
          className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-[60] grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-paper border border-line text-ink hover:text-terracotta hover:scale-105 transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* dots */}
      <div className="flex justify-center gap-1.5 mt-3 flex-wrap px-8">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show reel ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-terracotta" : "w-1.5 bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
