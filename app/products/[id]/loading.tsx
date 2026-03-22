export default function ProductLoading() {
  return (
    <div className="bg-beige min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="h-4 w-64 bg-beige-dark rounded animate-pulse" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="aspect-square rounded-xl bg-beige-dark animate-pulse" />
          <div className="space-y-4 py-4">
            <div className="h-4 w-24 bg-beige-dark rounded animate-pulse" />
            <div className="h-8 w-3/4 bg-beige-dark rounded animate-pulse" />
            <div className="h-8 w-1/3 bg-beige-dark rounded animate-pulse" />
            <div className="h-px bg-border my-6" />
            <div className="h-4 w-full bg-beige-dark rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-beige-dark rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-beige-dark rounded animate-pulse" />
            <div className="h-12 w-48 bg-beige-dark rounded-lg animate-pulse mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
