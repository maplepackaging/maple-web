export default function CustomizeLoading() {
  return (
    <div className="bg-beige min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero skeleton */}
        <div className="text-center mb-16">
          <div className="h-4 w-32 bg-beige-dark rounded mx-auto animate-pulse" />
          <div className="h-10 w-96 max-w-full bg-beige-dark rounded-lg mx-auto mt-4 animate-pulse" />
          <div className="h-4 w-2/3 bg-beige-dark rounded mx-auto mt-4 animate-pulse" />
        </div>

        {/* Steps skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-44 bg-beige-dark rounded-xl animate-pulse" />
          ))}
        </div>

        {/* Form skeleton */}
        <div className="max-w-2xl mx-auto space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-beige-dark rounded-lg animate-pulse" />
          ))}
          <div className="h-32 bg-beige-dark rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
