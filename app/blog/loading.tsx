export default function BlogLoading() {
  return (
    <div className="bg-beige min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading skeleton */}
        <div className="text-center mb-12">
          <div className="h-8 w-40 bg-beige-dark rounded-lg mx-auto animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-beige-dark rounded mx-auto mt-4 animate-pulse" />
        </div>

        {/* Blog cards skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-beige-dark" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-beige-dark rounded" />
                <div className="h-5 w-full bg-beige-dark rounded" />
                <div className="h-4 w-5/6 bg-beige-dark rounded" />
                <div className="h-4 w-3/4 bg-beige-dark rounded" />
                <div className="h-3 w-24 bg-beige-dark rounded mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
