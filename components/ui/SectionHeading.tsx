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
    <div
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {label && (
        <p className="text-primary text-xs md:text-sm font-medium tracking-wider uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-muted text-base md:text-lg max-w-2xl leading-relaxed" style={align === "center" ? { marginInline: "auto" } : undefined}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
