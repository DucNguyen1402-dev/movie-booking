export default function HighestRevenueMovieCardSkeleton() {
  return (
    <div className="relative animate-pulse overflow-hidden rounded-2xl border border-amber-500/10 bg-linear-to-br from-[#141414] to-[#1a1515] p-8">
      <div className="absolute -top-12 -right-12 h-52 w-52 rounded-full bg-linear-to-br from-amber-500/5 to-red-500/0 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-36 rounded-full bg-gray-800" />
            <span className="hidden h-1 w-1 rounded-full bg-gray-800 sm:inline-block" />

            <div className="hidden h-4 w-36 rounded-md bg-gray-800/60 sm:inline-block" />
          </div>

          <div className="h-12 w-12 rounded-xl bg-gray-800/50" />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1 space-y-4">
            <div className="min-h-12 space-y-2">
              <div className="h-7 w-5/6 rounded-md bg-gray-800" />
              <div className="h-7 w-1/2 rounded-md bg-gray-800" />
            </div>

            <div className="h-44 w-full max-w-80 rounded-xl bg-gray-800/40" />
          </div>

          <div className="inline-block shrink-0 space-y-3 self-start rounded-lg border border-gray-900 bg-gray-950/60 px-8 py-6 lg:self-center">
            <div className="h-3 w-36 rounded bg-gray-800/60" />

            <div className="h-8 w-48 rounded-md bg-gray-800" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-gray-900 pt-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <div className="h-4 w-4 rounded bg-gray-800" />
              <div className="h-3.5 w-28 rounded bg-gray-800/60" />
            </div>
            <div className="h-5 w-24 rounded bg-gray-800" />
          </div>

          <div className="space-y-3 border-l border-gray-900 pl-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gray-800" />
              <div className="h-3 w-16 rounded bg-gray-800/60" />
            </div>

            <div className="h-7 w-28 rounded bg-gray-800/40" />
          </div>
        </div>

        <div className="border-t border-gray-900 pt-4">
          <div className="h-3 w-56 rounded bg-gray-800/40" />
        </div>
      </div>
    </div>
  );
}
