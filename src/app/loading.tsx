export default function Loading() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/50"
            >
              <div className="aspect-[4/3] bg-neutral-800 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-neutral-800 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-neutral-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
