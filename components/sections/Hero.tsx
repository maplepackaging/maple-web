import Image from "next/image";
import Link from "next/link";
import { Sparkles, Leaf, Truck } from "lucide-react";

// Positions tuned to match the approved hero mockup (overlapping framed collage)
const collage = [
  { src: "/hero-box-1.png", alt: "Cream wedding gift box with ribbon",
    style: { top: "1%", left: "0%", width: "54%", zIndex: 30, rotate: "-3deg" }, delay: "0s" },
  { src: "/hero-box-2.png", alt: "Curated gift hamper",
    style: { top: "9%", left: "56%", width: "43%", zIndex: 20, rotate: "3deg" }, delay: "1.1s" },
  { src: "/hero-box-3.png", alt: "Green monogrammed invitation box",
    style: { top: "53%", left: "5%", width: "45%", zIndex: 20, rotate: "2deg" }, delay: "0.6s" },
  { src: "/hero-box-4.png", alt: "Kraft thank-you gift box with ribbon",
    style: { top: "49%", left: "49%", width: "51%", zIndex: 30, rotate: "-2deg" }, delay: "1.7s" },
];

export default function Hero() {
  return (
    <section className="relative gradient-hero overflow-hidden">
      {/* one large flowing curly string */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute -top-10 left-0 w-[140%] sm:w-[110%] lg:w-full h-auto text-terracotta/20"
          viewBox="0 0 1440 520"
          fill="none"
          preserveAspectRatio="xMidYMin slice"
        >
          <path
            d="M-40 150 C 180 40, 360 60, 470 180 C 560 280, 460 380, 380 330 C 320 293, 360 220, 440 250 C 560 295, 600 150, 760 150 C 940 150, 980 360, 1130 320 C 1230 293, 1210 170, 1130 200 C 1075 221, 1100 300, 1180 300 C 1360 300, 1420 120, 1520 230"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-14 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-10 items-center">
          {/* Left — copy */}
          <div className="order-2 lg:order-1 max-w-xl">
            <h1 className="animate-fade-in-up-1 font-heading text-[2.9rem] leading-[0.95] sm:text-6xl lg:text-7xl text-ink">
              Packaging that makes the gift
            </h1>

            <p className="animate-fade-in-up-2 mt-6 text-lg md:text-xl text-ink-soft leading-relaxed max-w-md">
              Luxury packaging and gifting solutions for life&apos;s most
              meaningful moments.
            </p>

            <div className="animate-fade-in-up-3 mt-8 flex flex-wrap gap-3.5">
              <Link href="/categories" className="btn btn-pill-brand btn-lg">
                Explore Collections
              </Link>
              <Link href="/customize" className="btn btn-pill-light btn-lg">
                Customize Yours
              </Link>
            </div>

            <div className="animate-fade-in-up-4 mt-9 flex flex-wrap gap-3">
              <span className="badge-pill">
                <Sparkles size={16} className="text-gold" />
                1000+ weddings
              </span>
              <span className="badge-pill">
                <Leaf size={16} className="text-sage" />
                Handcrafted
              </span>
              <span className="badge-pill">
                <Truck size={16} className="text-terracotta" />
                Pan-India delivery
              </span>
            </div>
          </div>

          {/* Right — overlapping framed collage */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative w-full max-w-[36rem] mx-auto aspect-square">
              {collage.map((img, i) => (
                <div
                  key={img.src}
                  className="absolute animate-float-slow"
                  style={{
                    top: img.style.top,
                    left: img.style.left,
                    width: img.style.width,
                    zIndex: img.style.zIndex,
                    rotate: img.style.rotate,
                    animationDelay: img.delay,
                  }}
                >
                  <div className="overflow-hidden rounded-2xl border-[5px] sm:border-[6px] border-white bg-cream-deep shadow-[0_22px_48px_-18px_rgba(46,30,19,0.5)] aspect-square">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={560}
                      height={560}
                      className="w-full h-full object-cover"
                      priority={i < 2}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
              ))}
              {/* soft glow behind collage */}
              <div className="absolute -z-10 inset-4 blur-3xl opacity-70 bg-[radial-gradient(circle_at_55%_45%,rgba(194,96,61,0.22),transparent_62%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
