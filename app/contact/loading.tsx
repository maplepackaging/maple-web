export default function ContactLoading() {
  return (
    <div className="bg-beige min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading skeleton */}
        <div className="text-center mb-12">
          <div className="h-8 w-48 bg-beige-dark rounded-lg mx-auto animate-pulse" />
          <div className="h-4 w-80 max-w-full bg-beige-dark rounded mx-auto mt-4 animate-pulse" />
        </div>

        {/* Info cards skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-beige-dark rounded-xl animate-pulse" />
          ))}
        </div>

        {/* Form skeleton */}
        <div className="max-w-2xl mx-auto space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 bg-beige-dark rounded-lg animate-pulse" />
          ))}
          <div className="h-32 bg-beige-dark rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
