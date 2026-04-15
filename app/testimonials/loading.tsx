export default function TestimonialsLoading() {
  return (
    <div className="bg-beige min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading skeleton */}
        <div className="text-center mb-12">
          <div className="h-8 w-56 bg-beige-dark rounded-lg mx-auto animate-pulse" />
          <div className="h-4 w-80 max-w-full bg-beige-dark rounded mx-auto mt-4 animate-pulse" />
        </div>

        {/* Testimonial cards skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface rounded-xl p-6 space-y-4 animate-pulse">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="w-4 h-4 bg-beige-dark rounded" />
                ))}
              </div>
              <div className="h-4 w-full bg-beige-dark rounded" />
              <div className="h-4 w-5/6 bg-beige-dark rounded" />
              <div className="h-4 w-3/4 bg-beige-dark rounded" />
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 bg-beige-dark rounded-full" />
                <div className="space-y-1">
                  <div className="h-3 w-24 bg-beige-dark rounded" />
                  <div className="h-3 w-16 bg-beige-dark rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
