import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import { Instagram } from "lucide-react";
import InstagramGrid from "./InstagramGrid";
import type { SiteSettings } from "@/lib/sanity-data";

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
    <section className="py-16 md:py-24 bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 text-primary text-xs md:text-sm font-medium tracking-wider uppercase mb-3">
            <Instagram size={14} />
            <span>Instagram</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Follow Our Journey
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-xl mx-auto">
            Behind the scenes, latest creations, and gifting inspiration
          </p>
        </div>
      </div>

      {/* Grid */}
      {gridPosts.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <InstagramGrid posts={gridPosts} />
        </div>
      )}

      {/* Follow CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-10">
          <Link
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-text-dark text-text-dark text-sm font-medium hover:bg-text-dark hover:text-white transition-all duration-200"
          >
            <Instagram size={16} />
            Follow {handle}
          </Link>
        </div>
      </div>
    </section>
  );
}
