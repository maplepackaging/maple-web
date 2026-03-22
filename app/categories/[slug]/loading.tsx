export default function CategoryLoading() {
  return (
    <div className="bg-beige min-h-screen">
      <div className="h-64 md:h-80 bg-beige-dark animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-4 gap-10">
          <aside className="lg:col-span-1 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 bg-beige-dark rounded-lg animate-pulse" />
            ))}
          </aside>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square rounded-xl bg-beige-dark animate-pulse" />
                  <div className="h-4 w-3/4 bg-beige-dark rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-beige-dark rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
