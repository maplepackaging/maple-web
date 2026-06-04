export default function Loading() {
  return (
    <div className="min-h-[70vh] grid place-items-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="w-11 h-11 border-[3px] border-terracotta/25 border-t-terracotta rounded-full animate-spin" />
        <p className="text-sm text-ink-soft">Loading…</p>
      </div>
    </div>
  );
}
