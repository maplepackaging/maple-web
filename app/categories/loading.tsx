export default function CategoriesLoading() {
  return (
    <div className="py-16 md:py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-8 w-60 bg-beige-dark rounded-lg mx-auto animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-beige-dark rounded mx-auto mt-4 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-4/3 rounded-xl bg-beige-dark animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
