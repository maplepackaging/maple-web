interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
}: MarqueeProps) {
  const outerClass = [
    "group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
    vertical ? "flex-col" : "flex-row",
    className,
  ].join(" ");

  const innerClass = [
    "flex shrink-0 justify-around [gap:var(--gap)]",
    vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
    pauseOnHover ? "group-hover:[animation-play-state:paused]" : "",
    reverse ? "[animation-direction:reverse]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={outerClass}>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={innerClass}>
            {children}
          </div>
        ))}
    </div>
  );
}
