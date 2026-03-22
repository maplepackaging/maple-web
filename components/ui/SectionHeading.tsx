interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-text-dark tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-px w-16 bg-primary ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
