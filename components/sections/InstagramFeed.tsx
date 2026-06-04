import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import { Instagram } from "lucide-react";
import InstagramRing from "./InstagramRing";
import type { SiteSettings } from "@/lib/content";

interface BeholdPost {
  id: string;
  permalink: string;
  mediaType: string;
  isReel: boolean;
  mediaUrl: string;
  sizes: {
    large: { mediaUrl: string; width: number; height: number };
  };
  prunedCaption: string;
}

const DEFAULT_FEED_URL = "https://feeds.behold.so/2xJXFQqgEerbVGpDVYYP";
const DEFAULT_HANDLE = "@maplepackaging_";
const DEFAULT_IG_URL = "https://instagram.com/maplepackaging_";

async function getInstagramPosts(feedUrl: string): Promise<BeholdPost[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("instagram");

  try {
    const res = await fetch(feedUrl);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.posts ?? []).slice(0, 6);
  } catch {
    return [];
  }
}

interface InstagramFeedProps {
  settings?: SiteSettings;
}

export default async function InstagramFeed({ settings }: InstagramFeedProps) {
  const feedUrl = settings?.instagramFeedUrl || DEFAULT_FEED_URL;
  const handle = settings?.instagramHandle || DEFAULT_HANDLE;
  const igUrl = settings?.instagramUrl || DEFAULT_IG_URL;
  const posts = await getInstagramPosts(feedUrl);

  const gridPosts = posts.map((p) => ({
    id: p.id,
    permalink: p.permalink,
    isReel: p.isReel,
    imageUrl: p.sizes?.large?.mediaUrl ?? "",
    caption: p.prunedCaption ?? "",
    videoUrl: p.mediaUrl,
  }));

  return (
    <section className="py-16 md:py-24 bg-cream">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <span className="badge-pill mb-5">
            <Instagram size={15} className="text-terracotta" />
            Instagram
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.4rem] text-ink leading-[1.02]">
            Follow our journey
          </h2>
          <p className="mt-4 text-base md:text-lg text-ink-soft max-w-xl mx-auto">
            Behind the scenes, latest creations, and gifting inspiration
          </p>
        </div>
      </div>

      {/* Rotating 3D reel ring — full width */}
      {gridPosts.length > 0 && (
        <div className="w-full">
          <InstagramRing posts={gridPosts} />
        </div>
      )}

      {/* Follow CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-12">
          <Link
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-pill-dark btn-lg"
          >
            <Instagram size={18} />
            Follow {handle}
          </Link>
        </div>
      </div>
    </section>
  );
}
