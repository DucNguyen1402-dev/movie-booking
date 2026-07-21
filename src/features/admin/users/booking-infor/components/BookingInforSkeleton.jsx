export default function BookingInforSkeleton() {
  return (
    <div
  
      className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 p-6"
    >
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Poster */}
        <div className="h-80 w-full animate-pulse rounded-xl bg-slate-700" />

        {/* Content */}
        <div>
          {/* Title */}
          <div className="mb-3 h-9 w-72 animate-pulse rounded bg-slate-700" />

          {/* Date */}
          <div className="mb-8 flex gap-4">
            <div className="h-5 w-44 animate-pulse rounded bg-slate-700" />
            <div className="h-5 w-28 animate-pulse rounded bg-slate-700" />
          </div>

          {/* Info Grid */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="rounded-xl bg-slate-700/40 p-4">
                <div className="mb-3 h-3 w-15 animate-pulse rounded bg-slate-700" />
                <div className="h-6 w-25 animate-pulse rounded bg-slate-700" />
              </div>
            ))}
          </div>

          {/* Seats */}
          <div className="mt-8">
            <div className="mb-4 h-5 w-32 animate-pulse rounded bg-slate-700" />

            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-14 animate-pulse rounded-lg bg-slate-700"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
