interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  label,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-14 ${align === "center" ? "text-center" : "text-left"}`}>
      {label && <p className="eyebrow mb-3">{label}</p>}
      <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.4rem] text-ink leading-[1.02]">
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-ink-soft text-base md:text-lg max-w-2xl leading-relaxed"
          style={align === "center" ? { marginInline: "auto" } : undefined}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
