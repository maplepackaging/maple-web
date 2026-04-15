export default function AboutLoading() {
  return (
    <div className="bg-beige min-h-screen">
      {/* Hero skeleton */}
      <div className="h-64 md:h-80 bg-beige-dark animate-pulse" />

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="h-4 w-24 bg-beige-dark rounded animate-pulse" />
            <div className="h-8 w-80 bg-beige-dark rounded-lg animate-pulse" />
            <div className="h-4 w-full bg-beige-dark rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-beige-dark rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-beige-dark rounded animate-pulse" />
          </div>
          <div className="aspect-4/3 bg-beige-dark rounded-xl animate-pulse" />
        </div>

        {/* Values skeleton */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 bg-beige-dark rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
