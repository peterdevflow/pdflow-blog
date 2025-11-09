export function BlogSkeleton() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-12">
        <div className="h-8 bg-muted rounded-lg w-48 mb-4 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-96 mb-8 animate-pulse"></div>

        {/* Search bar skeleton */}
        <div className="h-10 bg-muted rounded-lg mb-6 animate-pulse"></div>

        {/* Tag buttons skeleton */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 bg-muted rounded-full w-16 animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Post cards skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <article key={i} className="border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-5 bg-muted rounded-full w-12 animate-pulse"></div>
              <div className="h-5 bg-muted rounded-full w-16 animate-pulse"></div>
            </div>
            <div className="h-4 bg-muted rounded w-24 mb-3 animate-pulse"></div>
            <div className="h-6 bg-muted rounded w-3/4 mb-3 animate-pulse"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
            </div>
            <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
          </article>
        ))}
      </div>
    </section>
  );
}
